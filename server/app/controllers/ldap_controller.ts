import type { HttpContext } from '@adonisjs/core/http'
import { authenticate } from 'ldap-authentication'

export default class LdapController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const options = {
      ldapOpts: {
        url: 'ldap://10.60.12.44:389',
        connectTimeout: 10000,
        // tlsOptions: {
        //   rejectUnauthorized: false, // Nonaktifkan verifikasi sertifikat, gunakan jika diperlukan
        // },
        // referral: true,
        // bindDN: 'DC=smig,DC=corp',
        // bindCredentials: '#Arinamuntazah.165',
      },
      // userDn:
      searchOptions: {
        filter: '(objectClass=user)',
        scope: 'sub',
      },
      //   'CN=Husni Mubarok,OU=External,OU=USERS,OU=HEADOFFICE,OU=Solusi Bangun Indonesia,DC=smig,DC=corp',
      userDn: 'DC=smig,DC=corp',
      baseDN: 'DC=smig,DC=corp',

      userSearchBase: 'dc=smig,dc=corp',
      // userSearchFilter: '(objectClass=user)',
      // usernameAttribute: 'samaccountname',
      // userDn: 'null',
      username: 'husni.mubarok', // atau 'rimbun.marpaung'
      userPassword: '#Arinamuntazah.165',
    }

    // userPassword: 'Sbi@2020',

    try {
      const user = await authenticate(options)

      response.json(user)
      console.log('Authentication successful:', user)
    } catch (err) {
      response.json(err)
      console.error('Authentication failed:', err)
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
