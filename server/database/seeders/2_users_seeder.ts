import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Insert sample users
    await this.client.table('users').multiInsert([
      {
        id: 1,
        full_name: 'Super Administrator',
        email: 'admin@sbi.co.id',
        password: await hash.make('password123'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        full_name: 'Safety Manager',
        email: 'safety.manager@sbi.co.id',
        password: await hash.make('password123'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        full_name: 'HSE Coordinator',
        email: 'hse.coordinator@sbi.co.id',
        password: await hash.make('password123'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        full_name: 'Plant Manager',
        email: 'plant.manager@sbi.co.id',
        password: await hash.make('password123'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        full_name: 'Operations Supervisor',
        email: 'ops.supervisor@sbi.co.id',
        password: await hash.make('password123'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}
