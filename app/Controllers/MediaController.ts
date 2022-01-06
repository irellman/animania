import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Anime from 'App/Models/Anime'

export default class MediaController {
  public async get({ request }: HttpContextContract) {
    let filters = request.all()

    let sort: string
    let search: string = filters.search || ''
    let status: boolean
    let genres: [string] = filters.genres || []

    switch (filters.status) {
      case 'Выходит':
        status = false
        break
      case 'Завершен':
        status = true
        break
    }

    switch (filters.sort) {
      case 'По популярности':
        sort = 'popularity'
        break
      case 'По алфавиту':
        sort = 'title'
        break
      case 'По кол-ву серий':
        sort = 'episodes'
        break
      default:
        sort = 'popularity'
        break
    }

    let anime = await Anime.query()
      .where('title', 'like', `%${search}%`)
      .if(genres.length, builder => {
        builder.whereHas('genres', query => {
          query.where('name', genres[0])
        })
        if (genres.length > 1) {
          for (let genre of genres.slice(1)) {
            builder.andWhereHas('genres', query => {
              query.where('name', genre)
            })
          }
        }
      })
      .if(status!, builder => {
        builder.where('status', status)
      })
      .orderBy(sort, 'desc')
      .select('title', 'slug', 'poster')

    return anime
  }
}
