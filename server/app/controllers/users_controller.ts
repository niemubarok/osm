import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  // This controller is for backward compatibility only
  // Most LDAP functionality has been removed since we migrated to database auth

  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    // Update to use new users table instead of LDAP tables
    const users = await db
      .from('users')
      .select('id', 'email', 'full_name as fullName', 'created_at', 'updated_at')
    
    return response.status(200).json(users)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { email, fullName, password } = request.body()
    
    try {
      const [user] = await db.table('users').returning('id').insert({
        email,
        full_name: fullName,
        password, // Should be hashed in production
      })
      
      return response.status(200).json({ user })
    } catch (error) {
      console.error('Error inserting user', error)
      return response.status(500).json({ error: 'Error inserting user' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async updateUser({ request, response }: HttpContext) {
    const { id, column, value } = request.body()
    
    try {
      const update = await db
        .from('users')
        .update({ [column]: value })
        .where('id', id)
      
      return response.status(200).json({ update })
    } catch (error) {
      console.error('Error updating user', error)
      return response.status(500).json({ error: 'Error updating user' })
    }
  }

  /**
   * Update user role - simplified since we don't have role system yet
   */
  async updateRole({ response }: HttpContext) {
    // Role system not implemented in database auth yet
    return response.status(200).json({ message: 'Role system not implemented in database auth' })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await db.from('users').where('id', params.id).first()
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    try {
      await db.from('users').where('id', params.id).del()
      return response.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting user', error)
      return response.status(500).json({ error: 'Error deleting user' })
    }
  }
}
