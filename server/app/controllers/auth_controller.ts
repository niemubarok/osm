import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  /**
   * Handle user login with database authentication
   */
  async login({ request, response }: HttpContext) {
    const loginValidator = vine.compile(
      vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(6),
      })
    )

    try {
      const { email, password } = await request.validateUsing(loginValidator)
      console.log('🔄 Login attempt for email:', email)

      // Try to find user first
      const user = await User.findBy('email', email)
      console.log('👤 User found:', user ? 'Yes' : 'No')
      
      if (!user) {
        console.log('❌ User not found')
        return response.status(401).json({ error: 'Invalid credentials' })
      }

      // Manually verify password
      const isValidPassword = await hash.verify(user.password, password)
      console.log('🔑 Password valid:', isValidPassword)
      
      if (!isValidPassword) {
        console.log('❌ Invalid password')
        return response.status(401).json({ error: 'Invalid credentials' })
      }

      // Create access token for the user
      const token = await User.accessTokens.create(user)
      console.log('✅ Token generated')

      return response.status(200).json({
        message: 'Login successful',
        token: token.value!.release(),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      })
    } catch (error) {
      return response.status(401).json({
        error: 'Invalid credentials',
      })
    }
  }

  /**
   * Simple login test without validator
   */
  async testLogin({ request, response }: HttpContext) {
    try {
      const { email, password } = request.body()
      console.log('🔄 Test login attempt for email:', email)
      console.log('🔄 Password length:', password?.length)

      // Try to find user first
      const user = await User.findBy('email', email)
      console.log('👤 User found:', user ? 'Yes' : 'No')
      
      if (!user) {
        console.log('❌ User not found')
        return response.status(401).json({ error: 'User not found' })
      }

      console.log('🔑 Stored password hash:', user.password)

      // Manually verify password
      const isValidPassword = await hash.verify(user.password, password)
      console.log('🔑 Password valid:', isValidPassword)
      
      if (!isValidPassword) {
        console.log('❌ Invalid password')
        return response.status(401).json({ error: 'Invalid password' })
      }

      // Create access token for the user
      const token = await User.accessTokens.create(user)
      console.log('✅ Token generated:', token.value)

      return response.status(200).json({
        message: 'Login successful',
        token: token.value!.release(),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        }
      })
    } catch (error) {
      console.error('❌ Login error:', error)
      return response.status(500).json({ error: 'Internal server error', details: error.message })
    }
  }

  /**
   * Handle user logout
   */
  async logout({ response, auth }: HttpContext) {
    try {
      await auth.use('api').authenticate()
      await auth.use('api').revoke()
      return response.status(200).json({
        message: 'Logout successful',
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Error during logout',
      })
    }
  }

  /**
   * Get current authenticated user
   */
  async me({ auth, response }: HttpContext) {
    try {
      // Get current authenticated user
      const user = auth.user
      
      if (!user) {
        return response.status(401).json({ error: 'Not authenticated' })
      }

      return response.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        }
      })
    } catch (error) {
      console.error('❌ Me endpoint error:', error)
      return response.status(401).json({ error: 'Not authenticated' })
    }
  }

  /**
   * Register new user (for admin use)
   */
  async register({ request, response }: HttpContext) {
    const registerValidator = vine.compile(
      vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(6),
        fullName: vine.string().optional(),
      })
    )

    try {
      const { email, password, fullName } = await request.validateUsing(registerValidator)

      // Check if user already exists
      const existingUser = await User.findBy('email', email)
      if (existingUser) {
        return response.status(409).json({
          error: 'User with this email already exists',
        })
      }

      // Create new user
      const user = await User.create({
        email,
        password,
        fullName: fullName || null,
      })

      return response.status(201).json({
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      })
    } catch (error) {
      return response.status(422).json({
        error: 'Validation failed',
        details: error.messages || error.message,
      })
    }
  }

  /**
   * Change user password
   */
  async changePassword({ request, response, auth }: HttpContext) {
    const changePasswordValidator = vine.compile(
      vine.object({
        currentPassword: vine.string(),
        newPassword: vine.string().minLength(6),
      })
    )

    try {
      const user = auth.use('web').user
      if (!user) {
        return response.status(401).json({
          error: 'Not authenticated',
        })
      }

      const { currentPassword, newPassword } = await request.validateUsing(changePasswordValidator)

      // Verify current password
      await User.verifyCredentials(user.email, currentPassword)

      // Update password
      user.password = newPassword
      await user.save()

      return response.status(200).json({
        message: 'Password changed successfully',
      })
    } catch (error) {
      return response.status(401).json({
        error: 'Invalid current password or validation failed',
      })
    }
  }
}
