import axios from 'axios'

export const getAuthUser = async () => {
  let user = await axios.post('http://127.0.0.1:3333/auth')
  return user
}

