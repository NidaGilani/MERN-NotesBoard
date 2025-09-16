import axios from 'axios'

// in production there is no localhost tp make the base_url dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
})

export default axiosInstance;