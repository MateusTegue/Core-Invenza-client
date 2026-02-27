import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

type RetryableRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean
}

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

let refreshPromise: Promise<void> | null = null

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig | undefined
        const status = error.response?.status

        if (!originalRequest || status !== 401 || originalRequest._retry) {
            return Promise.reject(error)
        }

        const requestUrl = originalRequest.url ?? ""
        const isAuthRequest =
            requestUrl.includes("/auth/login/") ||
            requestUrl.includes("/auth/refresh/") ||
            requestUrl.includes("/auth/me/")

        if (isAuthRequest) {
            return Promise.reject(error)
        }

        const refreshToken = localStorage.getItem("refresh")
        if (!refreshToken) {
            return Promise.reject(error)
        }

        originalRequest._retry = true

        try {
            if (!refreshPromise) {
                refreshPromise = api
                    .post(
                        "/auth/refresh/",
                        { refresh: refreshToken },
                        { skipAuth: true }
                    )
                    .then((response) => {
                        const nextAccess = response.data?.access
                        const nextRefresh = response.data?.refresh
                        if (nextAccess) localStorage.setItem("access", nextAccess)
                        if (nextRefresh) localStorage.setItem("refresh", nextRefresh)
                    })
                    .finally(() => {
                        refreshPromise = null
                    })
            }

            await refreshPromise
            return api(originalRequest)
        } catch (refreshError) {
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            return Promise.reject(refreshError)
        }
    }
)

export default api
