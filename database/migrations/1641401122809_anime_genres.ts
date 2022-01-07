import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AnimeGenres extends BaseSchema {
  protected tableName = 'anime_genre'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('anime_id').unsigned().references('anime.id')
      table.integer('genre_id').unsigned().references('genres.id')
      table.unique(['anime_id', 'genre_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
