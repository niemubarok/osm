import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = '_Setting'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.date('Day1').nullable() // Meeting Day 1
      table.date('Day2').nullable() // Meeting Day 2
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // Insert default settings record
    this.defer(async (db) => {
      await db.table('_Setting').insert({
        id: 1,
        Day1: null,
        Day2: null
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
