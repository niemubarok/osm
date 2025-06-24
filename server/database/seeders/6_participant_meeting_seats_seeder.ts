import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Assign meeting seats to participants
    await this.client.table('ParticipantMeetingSeat').multiInsert([
      // Front row - VIP and senior management
      {
        Id: 1,
        ParticipantId: 1, // Dr. Ahmad Wijaya (CEO)
        MeetingSeatId: 3, // A03 (center front)
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 2,
        ParticipantId: 6, // Drs. Rudi Hartono (Regional Director)
        MeetingSeatId: 2, // A02
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 3,
        ParticipantId: 2, // Ir. Siti Nurhaliza (HSE Manager)
        MeetingSeatId: 4, // A04
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 4,
        ParticipantId: 3, // Bambang Sutrisno (Production Manager)
        MeetingSeatId: 1, // A01
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 5,
        ParticipantId: 8, // Indra Gunawan (Project Manager)
        MeetingSeatId: 5, // A05
        created_at: new Date(),
        updated_at: new Date()
      },

      // Second row - Middle management and supervisors
      {
        Id: 6,
        ParticipantId: 4, // Maya Sari (QC Supervisor)
        MeetingSeatId: 6, // B01
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 7,
        ParticipantId: 5, // Agus Setiawan (Maintenance Supervisor)
        MeetingSeatId: 7, // B02
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 8,
        ParticipantId: 7, // Rina Kusumawati (Safety Auditor)
        MeetingSeatId: 8, // B03
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 9,
        ParticipantId: 11, // Yudi Prasetya (Operations Manager)
        MeetingSeatId: 9, // B04
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 10,
        ParticipantId: 13, // Tono Wijaksono (Account Manager)
        MeetingSeatId: 10, // B05
        created_at: new Date(),
        updated_at: new Date()
      },

      // Third row - Coordinators and officers
      {
        Id: 11,
        ParticipantId: 9, // Dewi Maharani (Safety Officer)
        MeetingSeatId: 11, // C01
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 12,
        ParticipantId: 12, // Lina Wulandari (HSE Coordinator)
        MeetingSeatId: 12, // C02
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 13,
        ParticipantId: 14, // Sri Handayani (Technical Support)
        MeetingSeatId: 13, // C03
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 14,
        ParticipantId: 10, // Hari Susanto (Site Supervisor)
        MeetingSeatId: 14, // C04
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 15,
        ParticipantId: 15, // Fajar Nugroho (Field Engineer)
        MeetingSeatId: 15, // C05
        created_at: new Date(),
        updated_at: new Date()
      }
      
      // Note: Seats D01-D05 (seats 16-20) are left available for additional participants
    ])
  }
}
