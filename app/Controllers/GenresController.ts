// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class GenresController {
  public async get() {
    return Database.from('genres').select('image', 'name', 'slug')
  }
}
