
import axios from "axios"

const api = axios.create({
  baseURL: "https://products-challenge-backend.vercel.app/",
})

export { api }