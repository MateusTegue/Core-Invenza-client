
export interface AuthUser {
    name: string
    last_name: string
    email: string
    phone: string
}

export type LoginResponse = {
    access: string
    refresh: string
} & Record<string, unknown>

export type ApiError = {
    response?: {
        data?: {
            detail?: string
            error?: string
        }
    }
}

export const isAuthUser = (value: unknown): value is AuthUser => {
    if (!value || typeof value !== "object") return false

    const candidate = value as Record<string, unknown>
    return (
        typeof candidate.name === "string" &&
        typeof candidate.last_name === "string" &&
        typeof candidate.email === "string" &&
        typeof candidate.phone === "string"
    )
}
