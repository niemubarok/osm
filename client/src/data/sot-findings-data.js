// SOT Participant Findings data dummy dari seeder
// Dummy base64 image (1x1 pixel) untuk demo
const dummyImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

export const sotParticipantFindingsData = [
  // SOT 1 - Main Office Building findings
  {
    Id: 1,
    SotParticipantId: 1, // Ir. Siti Nurhaliza in SOT 1
    CreatedBy: 2, // Ir. Siti Nurhaliza
    CreatedDate: '2024-06-26T09:15:00.000Z',
    IsSafe: false,
    ImageFileName: 'finding_1_exit_sign.jpg',
    ImageData: dummyImageBase64,
    Description: 'Emergency exit sign partially obscured by plant. Visibility compromised in case of emergency.',
    ZRef_ClsrId: 6, // Communication
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 2,
    SotParticipantId: 2, // Rina Kusumawati in SOT 1
    CreatedBy: 7, // Rina Kusumawati
    CreatedDate: '2024-06-26T09:20:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_2_fire_extinguisher.jpg',
    ImageData: dummyImageBase64,
    Description: 'Fire extinguisher properly mounted and accessible. Inspection tag current.',
    ZRef_ClsrId: 8, // Emergency Preparedness
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 3,
    SotParticipantId: 3, // Dr. Ahmad Wijaya in SOT 1
    CreatedBy: 1, // Dr. Ahmad Wijaya
    CreatedDate: '2024-06-26T09:25:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_3_general_safety.jpg',
    ImageData: dummyImageBase64,
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
    CreatedDate: '2024-06-26T10:10:00.000Z',
    IsSafe: false,
    ImageFileName: 'finding_4_ppe_violation.jpg',
    ImageData: dummyImageBase64,
    Description: 'Worker observed without safety helmet in designated hard hat area.',
    ZRef_ClsrId: 1, // Personal Protective Equipment
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 5,
    SotParticipantId: 5, // Dewi Maharani in SOT 2
    CreatedBy: 9, // Dewi Maharani
    CreatedDate: '2024-06-26T10:15:00.000Z',
    IsSafe: false,
    ImageFileName: 'finding_5_housekeeping.jpg',
    ImageData: dummyImageBase64,
    Description: 'Tools left scattered on floor creating trip hazard. Work area needs better organization.',
    ZRef_ClsrId: 2, // Housekeeping
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 6,
    SotParticipantId: 6, // Indra Gunawan in SOT 2
    CreatedBy: 8, // Indra Gunawan
    CreatedDate: '2024-06-26T10:25:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_6_machine_guard.jpg',
    ImageData: dummyImageBase64,
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
    CreatedDate: '2024-06-26T11:10:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_7_maintenance_log.jpg',
    ImageData: dummyImageBase64,
    Description: 'Equipment maintenance log properly updated and maintenance schedule being followed.',
    ZRef_ClsrId: 4, // Procedures
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 8,
    SotParticipantId: 8, // Lina Wulandari in SOT 3
    CreatedBy: 12, // Lina Wulandari
    CreatedDate: '2024-06-26T11:15:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_8_environmental.jpg',
    ImageData: dummyImageBase64,
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
    CreatedDate: '2024-06-26T14:10:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_9_storage_compliance.jpg',
    ImageData: dummyImageBase64,
    Description: 'Material storage arrangements comply with safety standards. Clear labeling and proper stacking observed.',
    ZRef_ClsrId: 4, // Procedures
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 10,
    SotParticipantId: 10, // Hari Susanto in SOT 4
    CreatedBy: 10, // Hari Susanto
    CreatedDate: '2024-06-26T14:15:00.000Z',
    IsSafe: false,
    ImageFileName: 'finding_10_forklift_safety.jpg',
    ImageData: dummyImageBase64,
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
    CreatedDate: '2024-06-26T15:10:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_11_lab_safety.jpg',
    ImageData: dummyImageBase64,
    Description: 'Laboratory safety protocols properly followed. Chemical handling procedures compliant.',
    ZRef_ClsrId: 4, // Procedures
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 12,
    SotParticipantId: 12, // Sri Handayani in SOT 5
    CreatedBy: 14, // Sri Handayani
    CreatedDate: '2024-06-26T15:15:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_12_fume_hood.jpg',
    ImageData: dummyImageBase64,
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
    CreatedDate: '2024-06-27T09:10:00.000Z',
    IsSafe: false,
    ImageFileName: 'finding_13_parking_markings.jpg',
    ImageData: dummyImageBase64,
    Description: 'Parking line markings faded and unclear. Could cause confusion and parking violations.',
    ZRef_ClsrId: 6, // Communication
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 14,
    SotParticipantId: 14, // Fajar Nugroho in SOT 6
    CreatedBy: 15, // Fajar Nugroho
    CreatedDate: '2024-06-27T09:15:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_14_traffic_flow.jpg',
    ImageData: dummyImageBase64,
    Description: 'Vehicle traffic flow well managed. Speed limit signs clearly visible.',
    ZRef_ClsrId: 6, // Communication
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 15,
    SotParticipantId: 15, // Dr. Ahmad Wijaya in SOT 7
    CreatedBy: 1, // Dr. Ahmad Wijaya
    CreatedDate: '2024-06-27T10:10:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_15_cafeteria_hygiene.jpg',
    ImageData: dummyImageBase64,
    Description: 'Cafeteria maintains excellent hygiene standards. Food safety procedures properly implemented.',
    ZRef_ClsrId: 4, // Procedures
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 16,
    SotParticipantId: 16, // Bambang Sutrisno in SOT 7
    CreatedBy: 3, // Bambang Sutrisno
    CreatedDate: '2024-06-27T10:15:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_16_waste_separation.jpg',
    ImageData: dummyImageBase64,
    Description: 'Waste separation system properly implemented. Recycling bins correctly labeled.',
    ZRef_ClsrId: 5, // Environmental Conditions
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 17,
    SotParticipantId: 17, // Dewi Maharani in SOT 8
    CreatedBy: 9, // Dewi Maharani
    CreatedDate: '2024-06-27T11:10:00.000Z',
    IsSafe: true,
    ImageFileName: 'finding_17_training_records.jpg',
    ImageData: dummyImageBase64,
    Description: 'Training room safety procedures documentation complete. Emergency evacuation plans posted.',
    ZRef_ClsrId: 8, // Emergency Preparedness
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    Id: 18,
    SotParticipantId: 18, // Lina Wulandari in SOT 8
    CreatedBy: 12, // Lina Wulandari
    CreatedDate: '2024-06-27T11:15:00.000Z',
    IsSafe: false,
    ImageFileName: 'finding_18_projector_cables.jpg',
    ImageData: dummyImageBase64,
    Description: 'Projector cables across walkway creating trip hazard. Need proper cable management.',
    ZRef_ClsrId: 3, // Tools and Equipment
    created_at: new Date(),
    updated_at: new Date()
  }
];
