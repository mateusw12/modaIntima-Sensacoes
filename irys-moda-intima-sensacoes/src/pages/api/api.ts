import  Axios  from "axios";

export const API = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})