import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Insert test user
    await this.client.table('users').insert({
      full_name: 'Test User',
      email: 'test@test.com',
      password: await hash.make('password123'),
      created_at: new Date(),
      updated_at: new Date()
    })
  }
}
