import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Insert sample meeting seats (typical conference room layout)
    await this.client.table('MeetingSeat').multiInsert([
      // Front row seats
      {
        Id: 1,
        SeatCode: 'A01',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 2,
        SeatCode: 'A02',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 3,
        SeatCode: 'A03',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 4,
        SeatCode: 'A04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 5,
        SeatCode: 'A05',
        created_at: new Date(),
        updated_at: new Date()
      },
      // Second row seats
      {
        Id: 6,
        SeatCode: 'B01',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 7,
        SeatCode: 'B02',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 8,
        SeatCode: 'B03',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 9,
        SeatCode: 'B04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 10,
        SeatCode: 'B05',
        created_at: new Date(),
        updated_at: new Date()
      },
      // Third row seats
      {
        Id: 11,
        SeatCode: 'C01',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 12,
        SeatCode: 'C02',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 13,
        SeatCode: 'C03',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 14,
        SeatCode: 'C04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 15,
        SeatCode: 'C05',
        created_at: new Date(),
        updated_at: new Date()
      },
      // Fourth row seats
      {
        Id: 16,
        SeatCode: 'D01',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 17,
        SeatCode: 'D02',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 18,
        SeatCode: 'D03',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 19,
        SeatCode: 'D04',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 20,
        SeatCode: 'D05',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}
