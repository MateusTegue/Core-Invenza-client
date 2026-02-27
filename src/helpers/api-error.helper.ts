import { DEFAULT_LOGIN_ERROR } from "@/constants/auth"
import { ApiError } from "@/constants/models"

const ERROR_MESSAGE_MAP: Record<string, string> = {
  "invalid credentials": "Credenciales invalidas.",
  "no active account found with the given credentials": "Credenciales invalidas.",
}

export const getApiErrorMessage = (error: unknown) => {
  const apiError = error as ApiError
  const rawMessage = apiError.response?.data?.detail || apiError.response?.data?.error
  if (!rawMessage) return DEFAULT_LOGIN_ERROR

  const mappedMessage = ERROR_MESSAGE_MAP[rawMessage.toLowerCase()]
  return mappedMessage || rawMessage
}
