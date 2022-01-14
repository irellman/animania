import axios from 'axios'

export const getGenres = async () => {
  return await axios.post('http://127.0.0.1:3333/genres')
}
