import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'Sot'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id').primary()
      table.integer('ZRef_LocationId').unsigned().notNullable()
      
      // Attendant 1 Information
      table.string('Attendant1_EmployeeName', 255).nullable()
      table.string('Attendant1_PhoneNumber', 50).nullable()
      table.string('Attendant1_Picture', 255).nullable() // Image filename
      
      // Attendant 2 Information
      table.string('Attendant2_EmployeeName', 255).nullable()
      table.string('Attendant2_PhoneNumber', 50).nullable()
      table.string('Attendant2_Picture', 255).nullable() // Image filename
      
      table.text('Notes').nullable()
      table.text('CLSR_Observation').nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())

      // Foreign key
      table.foreign('ZRef_LocationId').references('Id').inTable('Zref_Location').onDelete('RESTRICT')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
