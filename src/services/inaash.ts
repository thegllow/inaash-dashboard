import i18n from "@/lib/i18n"
import { getSession } from "@/utils/get-session"
import axios from "axios"

const baseURL = "https://api.inaash.edu.sa"

// Create an Axios instance
const InaashApi = axios.create({
  baseURL: baseURL,
})
// Create an Axios instance
export const InaashApiGuest = axios.create({
  baseURL: baseURL + "/guest",
})

// Add a request interceptor to include the authentication token
InaashApi.interceptors.request.use(
  async (config) => {
    const session = getSession()
    const locale = i18n.language
    // if (!config.data.headers["Accept-language"]) {
    config.headers["Accept-language"] = locale
    // }
    console.log("🚀 ~ locale:", locale)

    if (session && session.token) {
      config.headers["Authorization"] = `Bearer ${session.token}`
    }

    return config
  },
  async (error) => {
    return Promise.reject(error)
  },
)

// Add a request interceptor to include the authentication token
InaashApiGuest.interceptors.request.use(
  async (config) => {
    console.log("🚀 ~ config:", config.baseURL, config.url, config.data)
    const locale = i18n.language
    config.headers["Accept-language"] = locale

    return config
  },
  async (error) => {
    // Do something with request error

    return Promise.reject(error)
  },
)

export default InaashApi
