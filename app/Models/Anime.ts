import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Genre from 'App/Models/Genre'
import Video from 'App/Models/Video'
import Stat from 'App/Models/Stat'

export default class Anime extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title:string

  @column()
  public slug:string

  @column()
  public poster:string

  @column()
  public banner:string

  @column()
  public description:string

  @column()
  public format:string

  @column()
  public episodes:number

  @column()
  public popularity:number

  @column()
  public score:number

  @manyToMany(() => Genre)
  public genres: ManyToMany<typeof Genre>

  @hasMany(() => Video, {
    foreignKey: 'anime_id'
  })
  public videos: HasMany<typeof Video>

  @hasOne(() => Stat, {
    foreignKey: 'anime_id'
  })
  public stats: HasOne<typeof Stat>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
