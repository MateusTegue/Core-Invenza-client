import api from "@/lib/api.axios"
import { AuthUser, LoginResponse } from "@/constants/models"
import { resolveUserFromLogin } from "@/lib/auth-user"
import { clearAuthStorage, getStoredUserFromStorage, saveAuthStorage,} from "@/lib/auth-storage"
import { getApiErrorMessage } from "@/helpers/api-error.helper"

export const login = async (email: string, password: string) => {
  try {
    clearAuthStorage()
    const response = await api.post<LoginResponse>(
      "/auth/login/",
      { email, password },
      { skipAuth: true }
    )

    const { access, refresh } = response.data
    saveAuthStorage(access, refresh, resolveUserFromLogin(response.data))
    return response.data
  } catch (error: unknown) {
    throw getApiErrorMessage(error)
  }
}

export const logout = () => {
  clearAuthStorage()
}

export const getCurrentSession = async () => {
  const response = await api.get("/auth/me/")
  return response.data
}

export const getStoredUser = (): AuthUser | null => {
  return getStoredUserFromStorage()
}
