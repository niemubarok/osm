import type { HttpContext } from '@adonisjs/core/http'
import ldap from 'ldapjs'

const ldapOptions = {
  url: 'ldap://10.60.12.44:389',
  baseDN: 'dc=smig,dc=corp',
  scope: 'subtree',
  filter: '(dc={{domain}})',
  referrals: true,
  usernameAttribute: 'samAccountName',
  passwordAttribute: 'userPassword',
}

const ldapClient = ldap.createClient(ldapOptions)
export default class LdapjsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const domain = 'SMIG.CORP'
    const filter = ldapOptions.filter.replace('{{domain}}', domain)
    const opts = {
      filter: filter,
      scope: 'sub' as 'sub',
      attributes: ['dn', 'samAccountName'],
    }

    ldapClient.search(
      ldapOptions.baseDN,
      opts,
      (
        err: any,
        res: {
          on: (arg0: string, arg1: { (entry: any): void; (err: any): void; (): void }) => void
        }
      ) => {
        if (err) {
          console.log(err)
          return
        }

        res.on('searchEntry', (entry: any) => {
          const dn = entry.object.dn
          const mail = entry.object.mail
          const userPassword = entry.object.userPassword

          console.log(`Pengguna dengan domain ${domain} ditemukan:`)
          console.log(`DN: ${dn}`)
          console.log(`Mail: ${mail}`)
          console.log(`User Password: ${userPassword}`)
        })

        res.on('error', (err) => {
          console.log(err)
        })

        res.on('end', () => {
          ldapClient.unbind()
        })
      }
    )
  }
}
