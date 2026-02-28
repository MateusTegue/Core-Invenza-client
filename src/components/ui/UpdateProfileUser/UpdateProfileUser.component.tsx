"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCurrentSession } from "@/api/login.api"
import { updateUser } from "@/api/users.api"
import { ApiError, AuthUser } from "@/constants/models"
import { saveStoredUserToStorage } from "@/lib/auth-storage"
import { resolveUserFromLogin, resolveUserIdFromPayload } from "@/lib/auth-user"
import { toast } from "@/helpers/toast.helper"
import { toastCrudMessages } from "@/helpers/toast-messages.helpers"
import { Card, CardContent } from "../card"

type ProfileFormState = {
  name: string
  last_name: string
  email: string
  phone: string
  company_name: string
}

type UpdateProfileUserProps = {
  user: AuthUser | null
  onSaved: (user: AuthUser) => void
  onCancel: () => void
}

const getFormStateFromUser = (user: AuthUser | null): ProfileFormState => ({
  name: user?.name ?? "",
  last_name: user?.last_name ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  company_name: user?.company_name ?? user?.name_company ?? "",
})

const UpdateProfileUser = ({ user, onSaved, onCancel }: UpdateProfileUserProps) => {
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<ProfileFormState>(getFormStateFromUser(user))

  useEffect(() => {
    setFormData(getFormStateFromUser(user))
  }, [user])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resolveUserIdForUpdate = async (): Promise<string | null> => {
    if (user?.id) return user.id

    try {
      const sessionPayload = await getCurrentSession()
      const sessionUser = resolveUserFromLogin(sessionPayload)
      const sessionId = resolveUserIdFromPayload(sessionPayload)

      if (sessionUser?.id) return sessionUser.id
      if (sessionId) return sessionId
      return null
    } catch {
      return null
    }
  }

  const handleSaveProfile = async () => {
    const resolvedId = await resolveUserIdForUpdate()

    if (!resolvedId) {
      toast.error("No se pudo obtener el id del usuario. Cierra sesion e inicia sesion nuevamente.")
      return
    }

    if (!formData.name.trim() || !formData.last_name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Completa los campos obligatorios para guardar el perfil.")
      return
    }

    const payload = {
      name: formData.name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company_name: formData.company_name.trim(),
    }

    try {
      setIsSaving(true)
      const response = await updateUser(resolvedId, payload)
      const responseData = typeof response === "object" && response !== null ? (response as Record<string, unknown>) : {}
      const responseUser = typeof responseData.user === "object" && responseData.user !== null
        ? (responseData.user as Record<string, unknown>)
        : responseData

      const updatedUser: AuthUser = {
        ...(user ?? {}),
        ...payload,
        id: typeof responseUser.id === "string" ? responseUser.id : resolvedId,
        company_name:
          typeof responseUser.company_name === "string"
            ? responseUser.company_name
            : typeof responseUser.name_company === "string"
              ? responseUser.name_company
              : payload.company_name,
        name_company:
          typeof responseUser.name_company === "string"
            ? responseUser.name_company
            : typeof responseUser.company_name === "string"
              ? responseUser.company_name
              : payload.company_name,
        role: typeof responseUser.role === "string" ? responseUser.role : user?.role,
      }

      saveStoredUserToStorage(updatedUser)
      onSaved(updatedUser)
      toast.success(toastCrudMessages.success.update("perfil"))
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message = apiError.response?.data?.detail || apiError.response?.data?.error || toastCrudMessages.error.update("perfil")
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="space-y-4 shadow-none border-none">
      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">Nombre</p>
        <Input name="name" value={formData.name} onChange={handleInputChange} />
      </CardContent>

      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">Apellido</p>
        <Input name="last_name" value={formData.last_name} onChange={handleInputChange} />
      </CardContent>

      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">Email</p>
        <Input name="email" type="email" value={formData.email} onChange={handleInputChange} />
      </CardContent>

      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">Telefono</p>
        <Input name="phone" value={formData.phone} onChange={handleInputChange} />
      </CardContent>

      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">Nombre de la empresa</p>
        <Input name="company_name" value={formData.company_name} onChange={handleInputChange} />
      </CardContent>

      <div className="flex gap-2 pt-2">
        <Button type="button" className="w-full" onClick={handleSaveProfile} disabled={isSaving}>
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
        <Button type="button" variant="outline" className="w-full" onClick={onCancel} disabled={isSaving}>
          Cancelar
        </Button>
      </div>
    </Card>
  )
}

export default UpdateProfileUser
