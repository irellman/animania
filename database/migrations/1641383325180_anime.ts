import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Anime extends BaseSchema {
  protected tableName = 'anime'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('slug')
      table.string('poster')
      table.string('banner')
      table.text('description')
      table.string('format')
      table.integer('episodes')
      table.integer('popularity')
      table.float('score')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
