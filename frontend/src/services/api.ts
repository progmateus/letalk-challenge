
import axios from "axios"

const api = axios.create({
  baseURL: "https://letalk-challenge-backend.vercel.app",
})

export { api }