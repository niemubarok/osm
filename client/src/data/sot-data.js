// SOT data dummy dari seeder
export const sotData = [
  // SOT 1 - Main Office Building inspection
  {
    Id: 1,
    ZRef_LocationId: 1, // Main Office Building
    Attendant1_EmployeeName: 'Ir. Siti Nurhaliza',
    Attendant1_PhoneNumber: '081234567802',
    Attendant1_Picture: 'attendant1_sot1.jpg',
    Attendant2_EmployeeName: 'Rina Kusumawati',
    Attendant2_PhoneNumber: '081234567807',
    Attendant2_Picture: 'attendant2_sot1.jpg',
    Notes: 'Routine safety inspection of main office building. Focus on emergency exits, fire safety equipment, and general workplace safety.',
    CLSR_Observation: 'Overall good condition. Minor issues identified with some emergency exit signage.',
    created_at: new Date('2024-06-26 09:00:00'),
    updated_at: new Date('2024-06-26 09:00:00')
  },

  // SOT 2 - Production Area A inspection
  {
    Id: 2,
    ZRef_LocationId: 2, // Production Area A
    Attendant1_EmployeeName: 'Bambang Sutrisno',
    Attendant1_PhoneNumber: '081234567803',
    Attendant1_Picture: 'attendant1_sot2.jpg',
    Attendant2_EmployeeName: 'Dewi Maharani',
    Attendant2_PhoneNumber: '081234567809',
    Attendant2_Picture: 'attendant2_sot2.jpg',
    Notes: 'Production area safety walkthrough. Checking machinery safety guards, PPE compliance, and housekeeping standards.',
    CLSR_Observation: 'Good safety compliance observed. Some areas need improvement in housekeeping and tool organization.',
    created_at: new Date('2024-06-26 10:00:00'),
    updated_at: new Date('2024-06-26 10:00:00')
  },

  // SOT 3 - Production Area B inspection
  {
    Id: 3,
    ZRef_LocationId: 3, // Production Area B
    Attendant1_EmployeeName: 'Agus Setiawan',
    Attendant1_PhoneNumber: '081234567805',
    Attendant1_Picture: 'attendant1_sot3.jpg',
    Attendant2_EmployeeName: 'Lina Wulandari',
    Attendant2_PhoneNumber: '081234567812',
    Attendant2_Picture: 'attendant2_sot3.jpg',
    Notes: 'Maintenance and production safety review in Area B. Focus on equipment maintenance and environmental conditions.',
    CLSR_Observation: 'Equipment maintenance procedures being followed well. Environmental conditions within acceptable limits.',
    created_at: new Date('2024-06-26 11:00:00'),
    updated_at: new Date('2024-06-26 11:00:00')
  },

  // SOT 4 - Warehouse inspection
  {
    Id: 4,
    ZRef_LocationId: 4, // Warehouse
    Attendant1_EmployeeName: 'Maya Sari',
    Attendant1_PhoneNumber: '081234567804',
    Attendant1_Picture: 'attendant1_sot4.jpg',
    Attendant2_EmployeeName: 'Hari Susanto',
    Attendant2_PhoneNumber: '081234567810',
    Attendant2_Picture: 'attendant2_sot4.jpg',
    Notes: 'Warehouse safety and storage compliance check. Reviewing material handling procedures and storage arrangements.',
    CLSR_Observation: 'Storage arrangements meet safety standards. Material handling equipment in good condition.',
    created_at: new Date('2024-06-26 14:00:00'),
    updated_at: new Date('2024-06-26 14:00:00')
  },

  // SOT 5 - Laboratory inspection
  {
    Id: 5,
    ZRef_LocationId: 7, // Laboratory
    Attendant1_EmployeeName: 'Maya Sari',
    Attendant1_PhoneNumber: '081234567804',
    Attendant1_Picture: 'attendant1_sot5.jpg',
    Attendant2_EmployeeName: 'Sri Handayani',
    Attendant2_PhoneNumber: '081234567814',
    Attendant2_Picture: 'attendant2_sot5.jpg',
    Notes: 'Laboratory safety protocols and chemical handling procedures review. Checking fume hoods and safety equipment.',
    CLSR_Observation: 'Laboratory safety protocols well maintained. All safety equipment functioning properly.',
    created_at: new Date('2024-06-26 15:00:00'),
    updated_at: new Date('2024-06-26 15:00:00')
  },

  // SOT 6 - Parking Area inspection (Day 2)
  {
    Id: 6,
    ZRef_LocationId: 5, // Parking Area
    Attendant1_EmployeeName: 'Indra Gunawan',
    Attendant1_PhoneNumber: '081234567808',
    Attendant1_Picture: 'attendant1_sot6.jpg',
    Attendant2_EmployeeName: 'Fajar Nugroho',
    Attendant2_PhoneNumber: '081234567815',
    Attendant2_Picture: 'attendant2_sot6.jpg',
    Notes: 'Parking area safety and traffic management review. Checking vehicle movement patterns and safety signage.',
    CLSR_Observation: 'Traffic flow well managed. Some improvement needed in parking line markings.',
    created_at: new Date('2024-06-27 09:00:00'),
    updated_at: new Date('2024-06-27 09:00:00')
  },

  // SOT 7 - Cafeteria inspection (Day 2)
  {
    Id: 7,
    ZRef_LocationId: 6, // Cafeteria
    Attendant1_EmployeeName: 'Dr. Ahmad Wijaya',
    Attendant1_PhoneNumber: '081234567801',
    Attendant1_Picture: 'attendant1_sot7.jpg',
    Attendant2_EmployeeName: 'Yudi Prasetya',
    Attendant2_PhoneNumber: '081234567811',
    Attendant2_Picture: 'attendant2_sot7.jpg',
    Notes: 'Cafeteria hygiene and safety standards review. Checking food safety procedures and emergency preparedness.',
    CLSR_Observation: 'Hygiene standards well maintained. Emergency procedures clearly posted and accessible.',
    created_at: new Date('2024-06-27 10:00:00'),
    updated_at: new Date('2024-06-27 10:00:00')
  },

  // SOT 8 - Meeting Room Complex inspection (Day 2)
  {
    Id: 8,
    ZRef_LocationId: 8, // Meeting Room Complex
    Attendant1_EmployeeName: 'Drs. Rudi Hartono',
    Attendant1_PhoneNumber: '081234567806',
    Attendant1_Picture: 'attendant1_sot8.jpg',
    Attendant2_EmployeeName: 'Tono Wijaksono',
    Attendant2_PhoneNumber: '081234567813',
    Attendant2_Picture: 'attendant2_sot8.jpg',
    Notes: 'Meeting room safety and emergency preparedness review. Checking AV equipment safety and emergency exits.',
    CLSR_Observation: 'Meeting facilities well maintained. All safety equipment accessible and functional.',
    created_at: new Date('2024-06-27 11:00:00'),
    updated_at: new Date('2024-06-27 11:00:00')
  }
];
