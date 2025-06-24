import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ParticipantAttendance'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id').primary()
      table.integer('ParticipantId').unsigned().notNullable()
      table.timestamp('Day1').nullable() // Check-in datetime for Day 1
      table.timestamp('Day2').nullable() // Check-in datetime for Day 2
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      // Foreign key
      table.foreign('ParticipantId').references('Id').inTable('Participant').onDelete('CASCADE')
      
      // Unique constraint to ensure one attendance record per participant
      table.unique(['ParticipantId'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
