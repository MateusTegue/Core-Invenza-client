import "axios"

declare module "axios" {
    interface AxiosRequestConfig<D = any> {
        skipAuth?: boolean
    }

    interface InternalAxiosRequestConfig<D = any> {
        skipAuth?: boolean
    }
}
