import axios from 'axios'

export const getGenres = async () => {
  let genres = await axios.post('http://127.0.0.1:3333/genres')
  return genres
}
