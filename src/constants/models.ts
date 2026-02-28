export interface AuthUser {
    id?: string
    name: string
    last_name: string
    email: string
    phone: string
    company_name?: string
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
    const hasRequiredFields = (
        typeof candidate.name === "string" &&
        typeof candidate.last_name === "string" &&
        typeof candidate.email === "string" &&
        typeof candidate.phone === "string"
    )

    if (!hasRequiredFields) return false

    const hasValidId = candidate.id === undefined || typeof candidate.id === "string"
    const hasValidCompanyName = candidate.company_name === undefined || typeof candidate.company_name === "string"

    return hasValidId && hasValidCompanyName
}
