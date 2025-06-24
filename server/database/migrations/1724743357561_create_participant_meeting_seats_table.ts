import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ParticipantMeetingSeat'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id').primary()
      table.integer('ParticipantId').unsigned().notNullable()
      table.integer('MeetingSeatId').unsigned().notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      // Foreign keys
      table.foreign('ParticipantId').references('Id').inTable('Participant').onDelete('CASCADE')
      table.foreign('MeetingSeatId').references('Id').inTable('MeetingSeat').onDelete('CASCADE')
      
      // Unique constraint to ensure one participant per seat
      table.unique(['ParticipantId'])
      table.unique(['MeetingSeatId'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
