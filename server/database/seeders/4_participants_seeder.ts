import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Insert sample participants from various companies
    await this.client.table('Participant').multiInsert([
      // SBI Employees
      {
        Id: 1,
        FullName: 'Dr. Ahmad Wijaya',
        PositionName: 'CEO',
        PhoneNumber: '081234567801',
        Email: 'ahmad.wijaya@sbi.co.id',
        UserName: 'ahmad.wijaya',
        Unit: 'Executive Management',
        CompanyId: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 2,
        FullName: 'Ir. Siti Nurhaliza',
        PositionName: 'HSE Manager',
        PhoneNumber: '081234567802',
        Email: 'siti.nurhaliza@sbi.co.id',
        UserName: 'siti.nurhaliza',
        Unit: 'Health Safety Environment',
        CompanyId: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 3,
        FullName: 'Bambang Sutrisno',
        PositionName: 'Production Manager',
        PhoneNumber: '081234567803',
        Email: 'bambang.sutrisno@sbi.co.id',
        UserName: 'bambang.sutrisno',
        Unit: 'Production',
        CompanyId: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 4,
        FullName: 'Maya Sari',
        PositionName: 'Quality Control Supervisor',
        PhoneNumber: '081234567804',
        Email: 'maya.sari@sbi.co.id',
        UserName: 'maya.sari',
        Unit: 'Quality Control',
        CompanyId: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 5,
        FullName: 'Agus Setiawan',
        PositionName: 'Maintenance Supervisor',
        PhoneNumber: '081234567805',
        Email: 'agus.setiawan@sbi.co.id',
        UserName: 'agus.setiawan',
        Unit: 'Maintenance',
        CompanyId: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      
      // SMIG Representatives
      {
        Id: 6,
        FullName: 'Drs. Rudi Hartono',
        PositionName: 'Regional Director',
        PhoneNumber: '081234567806',
        Email: 'rudi.hartono@smig.co.id',
        UserName: 'rudi.hartono',
        Unit: 'Regional Management',
        CompanyId: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 7,
        FullName: 'Rina Kusumawati',
        PositionName: 'Safety Auditor',
        PhoneNumber: '081234567807',
        Email: 'rina.kusumawati@smig.co.id',
        UserName: 'rina.kusumawati',
        Unit: 'Safety Audit',
        CompanyId: 2,
        created_at: new Date(),
        updated_at: new Date()
      },

      // Contractor 1 Representatives
      {
        Id: 8,
        FullName: 'Indra Gunawan',
        PositionName: 'Project Manager',
        PhoneNumber: '081234567808',
        Email: 'indra.gunawan@contractor1.co.id',
        UserName: 'indra.gunawan',
        Unit: 'Project Management',
        CompanyId: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 9,
        FullName: 'Dewi Maharani',
        PositionName: 'Safety Officer',
        PhoneNumber: '081234567809',
        Email: 'dewi.maharani@contractor1.co.id',
        UserName: 'dewi.maharani',
        Unit: 'Safety',
        CompanyId: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 10,
        FullName: 'Hari Susanto',
        PositionName: 'Site Supervisor',
        PhoneNumber: '081234567810',
        Email: 'hari.susanto@contractor1.co.id',
        UserName: 'hari.susanto',
        Unit: 'Field Operations',
        CompanyId: 3,
        created_at: new Date(),
        updated_at: new Date()
      },

      // Contractor 2 Representatives
      {
        Id: 11,
        FullName: 'Yudi Prasetya',
        PositionName: 'Operations Manager',
        PhoneNumber: '081234567811',
        Email: 'yudi.prasetya@mitrakerja.co.id',
        UserName: 'yudi.prasetya',
        Unit: 'Operations',
        CompanyId: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 12,
        FullName: 'Lina Wulandari',
        PositionName: 'HSE Coordinator',
        PhoneNumber: '081234567812',
        Email: 'lina.wulandari@mitrakerja.co.id',
        UserName: 'lina.wulandari',
        Unit: 'HSE',
        CompanyId: 4,
        created_at: new Date(),
        updated_at: new Date()
      },

      // Vendor Representatives
      {
        Id: 13,
        FullName: 'Tono Wijaksono',
        PositionName: 'Account Manager',
        PhoneNumber: '081234567813',
        Email: 'tono.wijaksono@vendorterpercaya.co.id',
        UserName: 'tono.wijaksono',
        Unit: 'Sales & Account Management',
        CompanyId: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 14,
        FullName: 'Sri Handayani',
        PositionName: 'Technical Support',
        PhoneNumber: '081234567814',
        Email: 'sri.handayani@vendorterpercaya.co.id',
        UserName: 'sri.handayani',
        Unit: 'Technical Support',
        CompanyId: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        Id: 15,
        FullName: 'Fajar Nugroho',
        PositionName: 'Field Engineer',
        PhoneNumber: '081234567815',
        Email: 'fajar.nugroho@vendorterpercaya.co.id',
        UserName: 'fajar.nugroho',
        Unit: 'Field Engineering',
        CompanyId: 5,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}
