import axios from 'axios'

const api = process.env.REACT_APP_RECORDS_API_URL || "https://5d51189981cbae00149a0f8d.mockapi.io"

export const getAll = () =>
  axios.get(`${api}/api/v1/records`)

export const create = (body) =>
  axios.post(`${api}/api/v1/records`, body)