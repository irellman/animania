import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

import Genre from 'App/Models/Genre'

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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
