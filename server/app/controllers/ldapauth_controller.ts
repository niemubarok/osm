import type { HttpContext } from '@adonisjs/core/http'
import LdapAuth from 'ldapauth-fork'

export default class LdapauthController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    // eslint-disable-next-line unicorn/prefer-module
    const username = 'husni.mubarok'
    const password = '#Arinamuntazah.165'

    const options = {
      url: 'ldap://10.60.12.44:389',
      bindDN: 'dc=smig,dc=corp',
      bindCredentials: '#Arinamuntazah.165',
      searchBase: 'dc=smig,dc=corp',
      searchFilter: `(objectClass=user)`,
      // searchScope: 'sub',
      reconnect: false,
    }

    const auth = new LdapAuth(options)
    auth.on('error', function (err: any) {
      console.error('LdapAuth: ', err)
    })
    auth.authenticate(username, password, function (err: any, user: any) {
      if (err) {
        console.error('LdapAuth: ', err)
      } else {
        console.log('LdapAuth: ', user)
      }
    })

    auth.close(function (err: any) {
      if (err) {
        console.error('LdapAuth: ', err)
      }
    })
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
