import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'SotParticipantFinding'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id').primary()
      table.integer('SotParticipantId').unsigned().notNullable()
      table.integer('CreatedBy').unsigned().notNullable() // Participant ID who created the finding
      table.timestamp('CreatedDate').notNullable()
      table.boolean('IsSafe').notNullable() // true = Safe, false = Unsafe
      table.string('ImageFileName', 255).nullable()
      table.text('Description').nullable()
      table.integer('ZRef_ClsrId').unsigned().nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      // Foreign keys
      table.foreign('SotParticipantId').references('Id').inTable('SotParticipant').onDelete('CASCADE')
      table.foreign('CreatedBy').references('Id').inTable('Participant').onDelete('RESTRICT')
      table.foreign('ZRef_ClsrId').references('Id').inTable('ZRef_Clsr').onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
