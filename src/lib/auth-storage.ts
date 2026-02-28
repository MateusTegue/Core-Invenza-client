import { AuthUser } from "@/constants/models"
import { ACCESS_STORAGE_KEY, REFRESH_STORAGE_KEY, USER_STORAGE_KEY,} from "@/constants/auth"
import { resolveUserFromLogin } from "@/lib/auth-user"

export const clearAuthStorage = () => {
  localStorage.removeItem(ACCESS_STORAGE_KEY)
  localStorage.removeItem(REFRESH_STORAGE_KEY)
  localStorage.removeItem(USER_STORAGE_KEY)
}

export const saveAuthStorage = (
  access: string,
  refresh: string,
  user: AuthUser | null
) => {
  localStorage.setItem(ACCESS_STORAGE_KEY, access)
  localStorage.setItem(REFRESH_STORAGE_KEY, refresh)
  if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export const saveStoredUserToStorage = (user: AuthUser | null) => {
  if (!user) {
    localStorage.removeItem(USER_STORAGE_KEY)
    return
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export const getStoredUserFromStorage = (): AuthUser | null => {
  const rawUser = localStorage.getItem(USER_STORAGE_KEY)
  if (!rawUser) return null

  try {
    return resolveUserFromLogin(JSON.parse(rawUser) as unknown)
  } catch {
    return null
  }
}
