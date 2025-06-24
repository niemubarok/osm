import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'SotParticipant'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id').primary()
      table.integer('SotId').unsigned().notNullable()
      table.integer('ParticipantId').unsigned().notNullable()
      table.string('VehicleCode', 50).nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      // Foreign keys
      table.foreign('SotId').references('Id').inTable('Sot').onDelete('CASCADE')
      table.foreign('ParticipantId').references('Id').inTable('Participant').onDelete('CASCADE')
      
      // Unique constraint to ensure one participant per SOT (combination of SotId and ParticipantId should be unique)
      table.unique(['SotId', 'ParticipantId'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
