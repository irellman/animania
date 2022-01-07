import axios from 'axios'

export const getMediaPage = async (filters) => {
  return await axios.post(`http://127.0.0.1:3333/media`, filters)
}

export const getOneMedia = async (slug) => {
  return await axios.post(`http://127.0.0.1:3333/media/${slug}`)
}