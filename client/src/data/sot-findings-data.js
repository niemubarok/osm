// SOT Participant Findings data dummy dari seeder
export const sotParticipantFindingsData = [
  // SOT 1 - Main Office Building findings
  {
    Id: 1,
    SotParticipantId: 1, // Ir. Siti Nurhaliza in SOT 1
    CreatedBy: 2, // Ir. Siti Nurhaliza
    CreatedDate: new Date('2024-06-26 09:15:00'),
    IsSafe: false,
    ImageFileName: 'finding_1_exit_sign.jpg',
    Description: 'Emergency exit sign partially obscured by plant. Visibility compromised in case of emergency.',
    ZRef_ClsrId: 6, // Communication
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 2,
    SotParticipantId: 2, // Rina Kusumawati in SOT 1
    CreatedBy: 7, // Rina Kusumawati
    CreatedDate: new Date('2024-06-26 09:20:00'),
    IsSafe: true,
    ImageFileName: 'finding_2_fire_extinguisher.jpg',
    Description: 'Fire extinguisher properly mounted and accessible. Inspection tag current.',
    ZRef_ClsrId: 8, // Emergency Preparedness
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 3,
    SotParticipantId: 3, // Dr. Ahmad Wijaya in SOT 1
    CreatedBy: 1, // Dr. Ahmad Wijaya
    CreatedDate: new Date('2024-06-26 09:25:00'),
    IsSafe: true,
    ImageFileName: 'finding_3_general_safety.jpg',
    Description: 'Overall office safety standards well maintained. Good housekeeping observed.',
    ZRef_ClsrId: 2, // Housekeeping
    created_at: new Date(),
    updated_at: new Date()
  },

  // SOT 2 - Production Area A findings
  {
    Id: 4,
    SotParticipantId: 4, // Bambang Sutrisno in SOT 2
    CreatedBy: 3, // Bambang Sutrisno
    CreatedDate: new Date('2024-06-26 10:10:00'),
    IsSafe: false,
    ImageFileName: 'finding_4_ppe_violation.jpg',
    Description: 'Worker observed without safety helmet in designated hard hat area.',
    ZRef_ClsrId: 1, // Personal Protective Equipment
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 5,
    SotParticipantId: 5, // Dewi Maharani in SOT 2
    CreatedBy: 9, // Dewi Maharani
    CreatedDate: new Date('2024-06-26 10:15:00'),
    IsSafe: false,
    ImageFileName: 'finding_5_housekeeping.jpg',
    Description: 'Tools left scattered on floor creating trip hazard. Work area needs better organization.',
    ZRef_ClsrId: 2, // Housekeeping
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 6,
    SotParticipantId: 6, // Indra Gunawan in SOT 2
    CreatedBy: 8, // Indra Gunawan
    CreatedDate: new Date('2024-06-26 10:25:00'),
    IsSafe: true,
    ImageFileName: 'finding_6_machine_guard.jpg',
    Description: 'Machinery safety guards properly installed and functioning correctly.',
    ZRef_ClsrId: 3, // Tools and Equipment
    created_at: new Date(),
    updated_at: new Date()
  },

  // SOT 3 - Production Area B findings
  {
    Id: 7,
    SotParticipantId: 7, // Agus Setiawan in SOT 3
    CreatedBy: 5, // Agus Setiawan
    CreatedDate: new Date('2024-06-26 11:10:00'),
    IsSafe: true,
    ImageFileName: 'finding_7_maintenance_log.jpg',
    Description: 'Equipment maintenance log properly updated and maintenance schedule being followed.',
    ZRef_ClsrId: 4, // Procedures
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 8,
    SotParticipantId: 8, // Lina Wulandari in SOT 3
    CreatedBy: 12, // Lina Wulandari
    CreatedDate: new Date('2024-06-26 11:15:00'),
    IsSafe: true,
    ImageFileName: 'finding_8_environmental.jpg',
    Description: 'Environmental conditions within safe operating parameters. Air quality monitoring systems functioning.',
    ZRef_ClsrId: 5, // Environmental Conditions
    created_at: new Date(),
    updated_at: new Date()
  },

  // SOT 4 - Warehouse findings
  {
    Id: 9,
    SotParticipantId: 9, // Maya Sari in SOT 4
    CreatedBy: 4, // Maya Sari
    CreatedDate: new Date('2024-06-26 14:10:00'),
    IsSafe: true,
    ImageFileName: 'finding_9_storage_compliance.jpg',
    Description: 'Material storage arrangements comply with safety standards. Clear labeling and proper stacking observed.',
    ZRef_ClsrId: 4, // Procedures
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 10,
    SotParticipantId: 10, // Hari Susanto in SOT 4
    CreatedBy: 10, // Hari Susanto
    CreatedDate: new Date('2024-06-26 14:15:00'),
    IsSafe: false,
    ImageFileName: 'finding_10_forklift_safety.jpg',
    Description: 'Forklift operator not wearing hi-vis vest. Safety protocol violation observed.',
    ZRef_ClsrId: 1, // Personal Protective Equipment
    created_at: new Date(),
    updated_at: new Date()
  },

  // SOT 5 - Laboratory findings
  {
    Id: 11,
    SotParticipantId: 11, // Maya Sari in SOT 5
    CreatedBy: 4, // Maya Sari
    CreatedDate: new Date('2024-06-26 15:10:00'),
    IsSafe: true,
    ImageFileName: 'finding_11_lab_safety.jpg',
    Description: 'Laboratory safety protocols properly followed. Chemical handling procedures compliant.',
    ZRef_ClsrId: 4, // Procedures
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 12,
    SotParticipantId: 12, // Sri Handayani in SOT 5
    CreatedBy: 14, // Sri Handayani
    CreatedDate: new Date('2024-06-26 15:15:00'),
    IsSafe: true,
    ImageFileName: 'finding_12_fume_hood.jpg',
    Description: 'Fume hood systems operating correctly. Safety equipment accessible and functional.',
    ZRef_ClsrId: 3, // Tools and Equipment
    created_at: new Date(),
    updated_at: new Date()
  },

  // Additional findings for SOT 6, 7, 8
  {
    Id: 13,
    SotParticipantId: 13, // Indra Gunawan in SOT 6
    CreatedBy: 8, // Indra Gunawan
    CreatedDate: new Date('2024-06-27 09:10:00'),
    IsSafe: false,
    ImageFileName: 'finding_13_parking_markings.jpg',
    Description: 'Parking line markings faded and unclear. Could cause confusion and parking violations.',
    ZRef_ClsrId: 6, // Communication
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 14,
    SotParticipantId: 14, // Fajar Nugroho in SOT 6
    CreatedBy: 15, // Fajar Nugroho
    CreatedDate: new Date('2024-06-27 09:15:00'),
    IsSafe: true,
    ImageFileName: 'finding_14_traffic_flow.jpg',
    Description: 'Vehicle traffic flow well managed. Speed limit signs clearly visible.',
    ZRef_ClsrId: 6, // Communication
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 15,
    SotParticipantId: 15, // Dr. Ahmad Wijaya in SOT 7
    CreatedBy: 1, // Dr. Ahmad Wijaya
    CreatedDate: new Date('2024-06-27 10:10:00'),
    IsSafe: true,
    ImageFileName: 'finding_15_cafeteria_hygiene.jpg',
    Description: 'Cafeteria maintains excellent hygiene standards. Food safety procedures properly implemented.',
    ZRef_ClsrId: 4, // Procedures
    created_at: new Date(),
    updated_at: new Date()
  }
];
