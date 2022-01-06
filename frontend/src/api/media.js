import axios from 'axios'

export const getMediaPage = async (filters) => {
  let media = await axios.post(`http://127.0.0.1:3333/media`, filters)
  return media
}