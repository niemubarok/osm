import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ParticipantAccomodation'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id').primary()
      table.integer('ParticipantId').unsigned().notNullable()
      table.integer('VehicleId').unsigned().nullable()
      
      // Flight Arrival Information
      table.string('Arrival_FlightName', 255).nullable()
      table.date('Arrival_FlightDate').nullable()
      table.time('Arrival_PickupTime').nullable()
      
      // Hotel Information
      table.string('Hotel_Name', 255).nullable()
      table.string('Hotel_RoomNumber', 100).nullable()
      table.time('Hotel_CheckInTime').nullable()
      table.time('Hotel_CheckOutTime').nullable()
      
      // Flight Departure Information
      table.string('Departure_FlightName', 255).nullable()
      table.date('Departure_FlightDate').nullable()
      table.time('Departure_PickupTime').nullable()
      
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      // Foreign keys
      table.foreign('ParticipantId').references('Id').inTable('Participant').onDelete('CASCADE')
      table.foreign('VehicleId').references('Id').inTable('Vehicle').onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
