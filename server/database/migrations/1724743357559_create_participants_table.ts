import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'Participant'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id').primary()
      table.string('FullName', 255).notNullable()
      table.string('PositionName', 255).nullable()
      table.string('PhoneNumber', 50).nullable()
      table.string('Email', 255).nullable()
      table.string('UserName', 100).nullable().unique()
      table.string('Unit', 255).nullable()
      table.integer('CompanyId').unsigned().nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      // Foreign key
      table.foreign('CompanyId').references('id').inTable('Company').onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
