import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { encrypt } from '../utils.js'
import { Client } from 'ldapts'
import jwt from 'jsonwebtoken'

export default class UsersController {
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
        .where('AuthUser.UserName', username)
        .select('AuthUserRole.RoleId')

      const roles = getUserRoles.map(({ RoleId }) => RoleId)
      console.log('🚀 ~ UsersController ~ login ~ roles:', roles)
      if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined')
      }
      const token = jwt.sign(
        {
          username: username,
          roles: roles,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '2 days',
        }
      )

      const [userData] = await db.from('Participant').where('UserName', username).select('*')
      if (userData === undefined) {
        if (roles.length > 0) {
          console.log('🚀 ~ UsersController ~ login ~ userData:', userData)

          // const userId = getUserRoles[0].UserId
          response.cookie('user', searchEntries[0].samAccountName)
          return response.status(200).json({ ...searchEntries[0], roles, userData, token })
        }
        return response.status(401).json({ error: 'User not found' })
      }

      response.cookie('user', searchEntries[0].samAccountName)
      response.cookie('token', token)
      response.status(200).json({ ...searchEntries[0], roles, userData, token })
    } catch (ex) {
      response.status(401).json(ex)
      console.log(ex)
    } finally {
      await client.unbind()
    }
  }

  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const users = await db
      .from('AuthUser')
      .leftJoin('AuthUserRole', 'AuthUser.Id', 'AuthUserRole.UserId')
      .leftJoin('AuthRole', 'AuthUserRole.RoleId', 'AuthRole.Id')
      .groupBy('AuthUser.Id')
      .groupBy('AuthUser.UserName')
      .select(
        'AuthUser.Id',
        'AuthUser.UserName',
        db.raw("string_agg(AuthRole.Name, ', ') as RoleName")
      )
    // .select('*')
    return response.status(200).json(users)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { roles, UserName, Password } = request.body().data
    const encryptedPassword = encrypt(Password)
    console.log('🚀 ~ UsersController ~ store ~ encryptedPassword:', encryptedPassword)

    try {
      const [user] = await db.table('AuthUser').returning('id').insert({
        UserName,
        Password: encryptedPassword,
      })
      const userRoles = await Promise.all(
        roles.map(async (role: any) =>
          db.table('AuthUserRole').insert({ UserId: user.id, RoleId: role })
        )
      )
      console.log('🚀 ~ UsersController ~ store ~ userRoles:', userRoles)
      console.log('🚀 ~ UsersController ~ store ~ user:', user)

      return response.status(200).json({ user })
    } catch (error) {
      console.error('Error inserting user', error)
      return response.status(500).json({ error: 'Error inserting user' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async updateUser({ request, response }: HttpContext) {
    const { Id, column, value } = request.body()
    console.log('🚀 ~ UsersController ~ updateUser ~ Id, column, value:', Id, column, value)
    const update = await db
      .from('AuthUser')
      .update({ [column]: value })
      .where('Id', Id)
    console.log('🚀 ~ UsersController ~ updateUser ~ update:', update)
    return response.status(200).json({ update })
    // const encryptedPassword = encrypt(Password)
    // console.log('🚀 ~ UsersController ~ store ~ encryptedPassword:', encryptedPassword)
  }
  async updateRole({ request, response }: HttpContext) {
    const { UserId, RoleId } = request.body()
    console.log('🚀 ~ UsersController ~ updateUser ~ Id, column, value:', UserId, RoleId)
    const existing = await db.from('AuthUserRole').where('UserId', UserId)
    console.log('🚀 ~ UsersController ~ updateRole ~ existing:', existing)

    if (existing.length > 1 && RoleId.length === 1) {
      const roleIdsToDelete = existing
        .filter((row) => !RoleId.includes(row.RoleId))
        .map((row) => row.RoleId)
      console.log('🚀 ~ UsersController ~ updateRole ~ roleIdsToDelete:', roleIdsToDelete)

      if (roleIdsToDelete.length) {
        await db
          .from('AuthUserRole')
          .where('UserId', UserId)
          .whereIn('RoleId', roleIdsToDelete)
          .del()
      }
    }

    const rolesToInsert = RoleId.filter((id: any) => !existing.some((row) => row.RoleId === id))

    if (rolesToInsert.length) {
      await db
        .table('AuthUserRole')
        .insert(rolesToInsert.map((roleId: any) => ({ UserId, RoleId: roleId })))
    }

    return response.status(200).json({ message: 'User role updated successfully' })
    // const encryptedPassword = encrypt(Password)
    // console.log('🚀 ~ UsersController ~ store ~ encryptedPassword:', encryptedPassword)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await db.from('AuthUser').where('Id', params.id).first()
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    try {
      await db.from('AuthUserRole').where('UserId', params.id).del()
      await db.from('AuthUser').where('Id', params.id).del()
      return response.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting user', error)
      return response.status(500).json({ error: 'Error deleting user' })
    }
  }
}
