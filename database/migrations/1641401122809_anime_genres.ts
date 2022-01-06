import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AnimeGenres extends BaseSchema {
  protected tableName = 'anime_genres'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('anime_id').unsigned().references('anime.id')
      table.integer('genres_id').unsigned().references('genres.id')
      table.unique(['anime_id', 'genres_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
