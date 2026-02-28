export interface AuthUser {
    id?: string
    name: string
    last_name: string
    email: string
    phone: string
    picture?: string
    company_name?: string
    name_company?: string
    company_id?: string
    role?: string
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
    const hasValidNameCompany = candidate.name_company === undefined || typeof candidate.name_company === "string"
    const hasValidCompanyId = candidate.company_id === undefined || typeof candidate.company_id === "string"
    const hasValidRole = candidate.role === undefined || typeof candidate.role === "string"

    return hasValidId && hasValidCompanyName && hasValidNameCompany && hasValidCompanyId && hasValidRole
}

export interface User {
  name: string
  last_name: string
  document_number: string
  email: string
  phone: string
  address: string
  company_name?: string
  company_id?: string
  role?: string
}

export interface CreateUserProps {
  initialData?: Partial<User>
  onCreated?: (createdUser: Record<string, unknown>) => void
  onCancel?: () => void
  submitLabel?: string
}


export const defaultUser: User = {
  name: "",
  last_name: "",
  document_number: "",
  email: "",
  phone: "",
  address: "",
  company_name: "",
  company_id: "",
}

export interface WeatherResponse {
  weather?: Array<{
    main?: string
    description?: string
    icon?: string
  }>
  main?: {
    temp?: number
    feels_like?: number
    humidity?: number
  }
  wind?: {
    speed?: number
  }
  name?: string
}
