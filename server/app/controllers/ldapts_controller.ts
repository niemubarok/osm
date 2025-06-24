import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { Client } from 'ldapts'

export default class LdaptsController {
  /**
   * Display a list of resource
   */
  async login({ request, response }: HttpContext) {
    const url = `ldap://${process.env.LDAP_HOST}:${process.env.LDAP_PORT}`
    const username = request.body()?.username
    const password = request.body()?.password
    const searchDN = 'DC=smig,DC=corp'
    const client = new Client({ url })

    try {
      const userDn = `smig\\${username}`
      await client.bind(userDn, password)

      const { searchEntries } = await client.search(searchDN, {
        scope: 'sub',
        filter: `(samAccountName=${username})`,
        attributes: ['samAccountName', 'displayName'],
      })

      const getUserRoles = await db
        .from('AuthUser')
        .innerJoin('AuthUserRole', 'AuthUser.Id', 'AuthUserRole.UserId')
        .where('UserName', username)
        .select('AuthUserRole.RoleId')

      const roles = getUserRoles.map(({ RoleId }) => RoleId)
      response.cookie('user', searchEntries[0].samAccountName)
      response.status(200).json({ ...searchEntries[0], roles })
    } catch (ex) {
      response.status(401).json(ex)
      console.log(ex)
    } finally {
      await client.unbind()
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
