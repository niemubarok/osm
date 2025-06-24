import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ClsrController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    console.log('🚀 ~ ClsrController ~ index ~ clsr:')
    const clsr = await db.from('ZRef_Clsr').select('*')
    return response.status(200).json(clsr)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
