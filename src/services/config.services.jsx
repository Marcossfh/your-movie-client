import axios from "axios";

const service = axios.create({
    baseURL : `${import.meta.env.VITE_BACKEND_URL}/api`
})

service.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("authToken") 

    if (authToken) {
        config.headers.authorization = `Bearer ${authToken}` 
    }

    return config

})

export default service

//todas las llamadas que hagamos al server seran con este objeto service
