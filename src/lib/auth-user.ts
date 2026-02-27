import { AuthUser, isAuthUser } from "@/constants/models"

export const resolveUserFromLogin = (payload: unknown): AuthUser | null => {
  if (!payload || typeof payload !== "object") return null

  const data = payload as Record<string, unknown>
  const candidate = data.user ?? data
  if (!isAuthUser(candidate)) return null

  return {
    name: candidate.name,
    last_name: candidate.last_name,
    email: candidate.email,
    phone: candidate.phone,
  }
}
