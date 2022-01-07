import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Stat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public anime_id: number

  @column()
  public score_5: number

  @column()
  public score_4: number

  @column()
  public score_3: number

  @column()
  public score_2: number

  @column()
  public score_1: number
}
