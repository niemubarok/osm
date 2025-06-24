import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ZRef_Clsr'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id').primary()
      table.string('Name', 255).notNullable()
      table.string('Description', 500).nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
