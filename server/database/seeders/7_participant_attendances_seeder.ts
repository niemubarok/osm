import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Insert participant attendance records
    await this.client.table('ParticipantAttendance').multiInsert([
      // Day 1 and Day 2 attendance for all participants
      {
        Id: 1,
        ParticipantId: 1, // Dr. Ahmad Wijaya
        Day1: new Date('2024-06-26 08:00:00'),
        Day2: new Date('2024-06-27 08:00:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 2,
        ParticipantId: 2, // Ir. Siti Nurhaliza
        Day1: new Date('2024-06-26 07:45:00'),
        Day2: new Date('2024-06-27 07:45:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 3,
        ParticipantId: 3, // Bambang Sutrisno
        Day1: new Date('2024-06-26 07:50:00'),
        Day2: new Date('2024-06-27 07:50:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 4,
        ParticipantId: 4, // Maya Sari
        Day1: new Date('2024-06-26 07:55:00'),
        Day2: new Date('2024-06-27 07:55:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 5,
        ParticipantId: 5, // Agus Setiawan
        Day1: new Date('2024-06-26 08:05:00'),
        Day2: new Date('2024-06-27 08:05:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 6,
        ParticipantId: 6, // Drs. Rudi Hartono
        Day1: new Date('2024-06-26 08:10:00'),
        Day2: new Date('2024-06-27 08:00:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 7,
        ParticipantId: 7, // Rina Kusumawati
        Day1: new Date('2024-06-26 08:15:00'),
        Day2: new Date('2024-06-27 08:05:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 8,
        ParticipantId: 8, // Indra Gunawan
        Day1: new Date('2024-06-26 08:20:00'),
        Day2: new Date('2024-06-27 08:10:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 9,
        ParticipantId: 9, // Dewi Maharani
        Day1: new Date('2024-06-26 08:25:00'),
        Day2: new Date('2024-06-27 08:15:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 10,
        ParticipantId: 10, // Hari Susanto
        Day1: new Date('2024-06-26 08:30:00'),
        Day2: new Date('2024-06-27 08:20:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 11,
        ParticipantId: 11, // Yudi Prasetya
        Day1: new Date('2024-06-26 08:35:00'),
        Day2: new Date('2024-06-27 08:25:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 12,
        ParticipantId: 12, // Lina Wulandari
        Day1: new Date('2024-06-26 08:40:00'),
        Day2: new Date('2024-06-27 08:30:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 13,
        ParticipantId: 13, // Tono Wijaksono
        Day1: new Date('2024-06-26 08:45:00'),
        Day2: new Date('2024-06-27 08:35:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 14,
        ParticipantId: 14, // Sri Handayani
        Day1: new Date('2024-06-26 08:50:00'),
        Day2: new Date('2024-06-27 08:40:00'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 15,
        ParticipantId: 15, // Fajar Nugroho
        Day1: new Date('2024-06-26 08:55:00'),
        Day2: new Date('2024-06-27 08:45:00'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}
