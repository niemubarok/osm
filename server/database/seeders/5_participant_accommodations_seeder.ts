import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Insert sample participant accommodations for external participants
    await this.client.table('ParticipantAccomodation').multiInsert([
      // SMIG Regional Director accommodation
      {
        Id: 1,
        ParticipantId: 6, // Drs. Rudi Hartono
        VehicleId: 1, // V001
        Arrival_FlightName: 'GA 183',
        Arrival_FlightDate: new Date('2024-06-25'),
        Arrival_PickupTime: '14:30:00',
        Hotel_Name: 'Hotel Aryaduta Palembang',
        Hotel_RoomNumber: '1205',
        Hotel_CheckInTime: '16:00:00',
        Hotel_CheckOutTime: '12:00:00',
        Departure_FlightName: 'GA 186',
        Departure_FlightDate: new Date('2024-06-27'),
        Departure_PickupTime: '10:30:00',
        created_at: new Date(),
        updated_at: new Date()
      },
      
      // SMIG Safety Auditor accommodation
      {
        Id: 2,
        ParticipantId: 7, // Rina Kusumawati
        VehicleId: 2, // V002
        Arrival_FlightName: 'GA 183',
        Arrival_FlightDate: new Date('2024-06-25'),
        Arrival_PickupTime: '14:30:00',
        Hotel_Name: 'Hotel Aryaduta Palembang',
        Hotel_RoomNumber: '1207',
        Hotel_CheckInTime: '16:00:00',
        Hotel_CheckOutTime: '12:00:00',
        Departure_FlightName: 'GA 186',
        Departure_FlightDate: new Date('2024-06-27'),
        Departure_PickupTime: '10:30:00',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Contractor 1 Project Manager accommodation
      {
        Id: 3,
        ParticipantId: 8, // Indra Gunawan
        VehicleId: 3, // V003
        Hotel_Name: 'Hotel Swarna Dwipa Palembang',
        Hotel_RoomNumber: '508',
        Hotel_CheckInTime: '15:00:00',
        Hotel_CheckOutTime: '11:00:00',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Contractor 1 Safety Officer accommodation
      {
        Id: 4,
        ParticipantId: 9, // Dewi Maharani
        VehicleId: 3, // V003 (shared vehicle)
        Hotel_Name: 'Hotel Swarna Dwipa Palembang',
        Hotel_RoomNumber: '510',
        Hotel_CheckInTime: '15:00:00',
        Hotel_CheckOutTime: '11:00:00',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Contractor 2 Operations Manager accommodation
      {
        Id: 5,
        ParticipantId: 11, // Yudi Prasetya
        VehicleId: 4, // V004
        Arrival_FlightName: 'SJ 539',
        Arrival_FlightDate: new Date('2024-06-25'),
        Arrival_PickupTime: '12:15:00',
        Hotel_Name: 'Hotel Santika Palembang',
        Hotel_RoomNumber: '815',
        Hotel_CheckInTime: '14:00:00',
        Hotel_CheckOutTime: '12:00:00',
        Departure_FlightName: 'SJ 542',
        Departure_FlightDate: new Date('2024-06-27'),
        Departure_PickupTime: '13:00:00',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Contractor 2 HSE Coordinator accommodation
      {
        Id: 6,
        ParticipantId: 12, // Lina Wulandari
        VehicleId: 4, // V004 (shared vehicle)
        Arrival_FlightName: 'SJ 539',
        Arrival_FlightDate: new Date('2024-06-25'),
        Arrival_PickupTime: '12:15:00',
        Hotel_Name: 'Hotel Santika Palembang',
        Hotel_RoomNumber: '817',
        Hotel_CheckInTime: '14:00:00',
        Hotel_CheckOutTime: '12:00:00',
        Departure_FlightName: 'SJ 542',
        Departure_FlightDate: new Date('2024-06-27'),
        Departure_PickupTime: '13:00:00',
        created_at: new Date(),
        updated_at: new Date()
      },

      // Vendor Account Manager accommodation
      {
        Id: 7,
        ParticipantId: 13, // Tono Wijaksono
        VehicleId: 5, // V005
        Arrival_FlightName: 'QG 642',
        Arrival_FlightDate: new Date('2024-06-25'),
        Arrival_PickupTime: '16:45:00',
        Hotel_Name: 'Hotel Zuri Palembang',
        Hotel_RoomNumber: '1012',
        Hotel_CheckInTime: '18:00:00',
        Hotel_CheckOutTime: '12:00:00',
        Departure_FlightName: 'QG 645',
        Departure_FlightDate: new Date('2024-06-27'),
        Departure_PickupTime: '11:15:00',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}
