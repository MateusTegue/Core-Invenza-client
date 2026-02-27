import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptor para agregar el token automaticamente en cada peticion.
// Permite desactivar auth por-request con `skipAuth: true`.
api.interceptors.request.use((config) => {
    if (config.skipAuth) {
        return config
    }

    const token = localStorage.getItem('access')
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api;