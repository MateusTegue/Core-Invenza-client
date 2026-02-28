import api from "@/lib/api.axios"
import { AuthUser, LoginResponse } from "@/constants/models"
import { resolveUserFromLogin } from "@/lib/auth-user"
import { clearAuthStorage, getStoredUserFromStorage, saveAuthStorage, saveStoredUserToStorage } from "@/lib/auth-storage"
import { getApiErrorMessage } from "@/helpers/api-error.helper"

const resolveUserFromSession = async (access: string): Promise<AuthUser | null> => {
  const response = await api.get("/auth/me/", {
    headers: {
      Authorization: `Bearer ${access}`,
    },
    skipAuth: true,
  })

  return resolveUserFromLogin(response.data)
}

export const login = async (email: string, password: string) => {
  try {
    clearAuthStorage()
    const response = await api.post<LoginResponse>(
      "/auth/login/",
      { email, password },
      { skipAuth: true }
    )

    const { access, refresh } = response.data
    const loginUser = resolveUserFromLogin(response.data)
    saveAuthStorage(access, refresh, loginUser)

    try {
      const sessionUser = await resolveUserFromSession(access)
      if (sessionUser) {
        saveStoredUserToStorage(sessionUser)
      }
    } catch {
      // Keep login user as fallback when /auth/me/ is unavailable.
    }

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
  const sessionUser = resolveUserFromLogin(response.data)
  if (sessionUser) {
    saveStoredUserToStorage(sessionUser)
  }

  return response.data
}

export const getStoredUser = (): AuthUser | null => {
  return getStoredUserFromStorage()
}
