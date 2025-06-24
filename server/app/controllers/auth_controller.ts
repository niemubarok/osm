import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class AuthController {
  /**
   * Handle user login with database authentication
   */
  async login({ request, response, auth }: HttpContext) {
    const loginValidator = vine.compile(
      vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(6),
      })
    )

    try {
      const { email, password } = await request.validateUsing(loginValidator)

      // Attempt to authenticate the user
      const user = await User.verifyCredentials(email, password)
      
      // Log the user in
      await auth.use('web').login(user)

      return response.status(200).json({
        message: 'Login successful',
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
   * Handle user logout
   */
  async logout({ response, auth }: HttpContext) {
    try {
      await auth.use('web').logout()
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
  async me({ response, auth }: HttpContext) {
    try {
      const user = auth.use('web').user
      
      if (!user) {
        return response.status(401).json({
          error: 'Not authenticated',
        })
      }

      return response.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Error fetching user data',
      })
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
