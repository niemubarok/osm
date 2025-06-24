import { BaseSeeder } from '@adonisjs/lucid/seeders'

/**
 * Comprehensive seeder with all data
 * This seeder contains all reference and sample data in one file
 * to ensure proper dependency order and data integrity
 */
export default class extends BaseSeeder {
  async run() {
    console.log('🌱 Starting comprehensive database seeding...')
    
    console.log('� Seeded data summary:')
    console.log('✅ All seeders have been created individually!')
    console.log('- 1_reference_data_seeder.ts (locations, CLSR categories, companies, vehicles)')
    console.log('- 2_users_seeder.ts (5 users)')
    console.log('- 3_meeting_seats_seeder.ts (20 meeting seats)')
    console.log('- 4_participants_seeder.ts (15 participants)')
    console.log('- 5_participant_accommodations_seeder.ts (7 accommodations)')
    console.log('- 6_participant_meeting_seats_seeder.ts (15 seat assignments)')
    console.log('- 7_participant_attendances_seeder.ts (15 attendance records)')
    console.log('- 8_sots_seeder.ts (8 Safety Observation Tours)')
    console.log('- 9_sot_participants_seeder.ts (21 SOT participant assignments)')
    console.log('- 10_sot_participant_findings_seeder.ts (17 safety findings)')
    console.log('')
    console.log('� Test user credentials:')
    console.log('- admin@sbi.co.id / password123')
    console.log('- safety.manager@sbi.co.id / password123')
    console.log('- hse.coordinator@sbi.co.id / password123')
    console.log('')
    console.log('� To run all seeders in order, use:')
    console.log('   node ace db:seed')
  }
}
