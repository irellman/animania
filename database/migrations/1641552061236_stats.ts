import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stats extends BaseSchema {
  protected tableName = 'stats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('anime_id').unsigned().references('anime.id').onDelete('CASCADE')
      table.integer('score_5')
      table.integer('score_4')
      table.integer('score_3')
      table.integer('score_2')
      table.integer('score_1')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
