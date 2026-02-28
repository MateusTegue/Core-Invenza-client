import { AuthUser, isAuthUser } from "@/constants/models"

const resolveStringField = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

const resolveIdFromRecord = (record: Record<string, unknown>): string | undefined => {
  return (
    resolveStringField(record.id) ??
    resolveStringField(record.user_id) ??
    resolveStringField(record.uuid) ??
    resolveStringField(record.pk)
  )
}

const resolveCompanyIdFromRecord = (record: Record<string, unknown>): string | undefined => {
  const nestedCompany = record.company
  const nestedCompanyRecord =
    nestedCompany && typeof nestedCompany === "object"
      ? (nestedCompany as Record<string, unknown>)
      : undefined

  return (
    resolveStringField(record.company_id) ??
    resolveStringField(record.companyId) ??
    resolveStringField(record.company_uuid) ??
    resolveStringField(record.company_pk) ??
    (nestedCompanyRecord ? resolveIdFromRecord(nestedCompanyRecord) : undefined)
  )
}

export const resolveUserIdFromPayload = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") return undefined

  const data = payload as Record<string, unknown>
  const nestedUser = data.user
  const nestedUserRecord =
    nestedUser && typeof nestedUser === "object"
      ? (nestedUser as Record<string, unknown>)
      : undefined

  return (
    (nestedUserRecord ? resolveIdFromRecord(nestedUserRecord) : undefined) ??
    resolveIdFromRecord(data)
  )
}

export const resolveCompanyIdFromPayload = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") return undefined

  const data = payload as Record<string, unknown>
  const nestedUser = data.user
  const nestedUserRecord =
    nestedUser && typeof nestedUser === "object"
      ? (nestedUser as Record<string, unknown>)
      : undefined

  return (
    (nestedUserRecord ? resolveCompanyIdFromRecord(nestedUserRecord) : undefined) ??
    resolveCompanyIdFromRecord(data)
  )
}

export const resolveUserFromLogin = (payload: unknown): AuthUser | null => {
  if (!payload || typeof payload !== "object") return null

  const data = payload as Record<string, unknown>
  const candidate = data.user ?? data
  if (!isAuthUser(candidate)) return null

  const resolvedCompanyName =
    typeof candidate.company_name === "string"
      ? candidate.company_name
      : typeof candidate.name_company === "string"
        ? candidate.name_company
        : undefined

  return {
    id: resolveUserIdFromPayload(payload),
    name: candidate.name,
    last_name: candidate.last_name,
    email: candidate.email,
    phone: candidate.phone,
    company_name: resolvedCompanyName,
    name_company: resolvedCompanyName,
    company_id: resolveCompanyIdFromPayload(payload),
    role: typeof candidate.role === "string" ? candidate.role : undefined,
  }
}
