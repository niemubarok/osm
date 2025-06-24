import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Insert SOT participant assignments
    await this.client.table('SotParticipant').multiInsert([
      // SOT 1 - Main Office Building participants
      {
        Id: 1,
        SotId: 1,
        ParticipantId: 2, // Ir. Siti Nurhaliza (Attendant 1)
        VehicleCode: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 2,
        SotId: 1,
        ParticipantId: 7, // Rina Kusumawati (Attendant 2)
        VehicleCode: 'V002',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 3,
        SotId: 1,
        ParticipantId: 1, // Dr. Ahmad Wijaya (Observer)
        VehicleCode: null,
        created_at: new Date(),
        updated_at: new Date()
      },

      // SOT 2 - Production Area A participants
      {
        Id: 4,
        SotId: 2,
        ParticipantId: 3, // Bambang Sutrisno (Attendant 1)
        VehicleCode: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 5,
        SotId: 2,
        ParticipantId: 9, // Dewi Maharani (Attendant 2)
        VehicleCode: 'V003',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 6,
        SotId: 2,
        ParticipantId: 8, // Indra Gunawan (Observer)
        VehicleCode: 'V003',
        created_at: new Date(),
        updated_at: new Date()
      },

      // SOT 3 - Production Area B participants
      {
        Id: 7,
        SotId: 3,
        ParticipantId: 5, // Agus Setiawan (Attendant 1)
        VehicleCode: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 8,
        SotId: 3,
        ParticipantId: 12, // Lina Wulandari (Attendant 2)
        VehicleCode: 'V004',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 9,
        SotId: 3,
        ParticipantId: 11, // Yudi Prasetya (Observer)
        VehicleCode: 'V004',
        created_at: new Date(),
        updated_at: new Date()
      },

      // SOT 4 - Warehouse participants
      {
        Id: 10,
        SotId: 4,
        ParticipantId: 4, // Maya Sari (Attendant 1)
        VehicleCode: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 11,
        SotId: 4,
        ParticipantId: 10, // Hari Susanto (Attendant 2)
        VehicleCode: 'V003',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 12,
        SotId: 4,
        ParticipantId: 6, // Drs. Rudi Hartono (Observer)
        VehicleCode: 'V001',
        created_at: new Date(),
        updated_at: new Date()
      },

      // SOT 5 - Laboratory participants (using different participants to avoid duplicates)
      {
        Id: 13,
        SotId: 5,
        ParticipantId: 14, // Sri Handayani (Attendant 1)
        VehicleCode: 'V005',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 14,
        SotId: 5,
        ParticipantId: 13, // Tono Wijaksono (Attendant 2)
        VehicleCode: 'V005',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 15,
        SotId: 5,
        ParticipantId: 15, // Fajar Nugroho (Observer)
        VehicleCode: 'V005',
        created_at: new Date(),
        updated_at: new Date()
      }

      // Note: SOT 6-8 will use different participants for Day 2 activities
    ])
  }
}
