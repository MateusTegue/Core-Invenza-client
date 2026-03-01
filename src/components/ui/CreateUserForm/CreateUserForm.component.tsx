"use client"

import { useEffect, useState } from "react"
import { createUser } from "@/api/users.api"
import { getCurrentSession, getStoredUser } from "@/api/login.api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ApiError, CreateUserProps, User, defaultUser } from "@/constants/models"
import { toast } from "@/helpers/toast.helper"
import { toastCrudMessages } from "@/helpers/toast-messages.helpers"
import { saveStoredUserToStorage } from "@/lib/auth-storage"
import { resolveCompanyIdFromPayload, resolveUserFromLogin } from "@/lib/auth-user"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const normalizeInitialData = (initialData?: Partial<User>): User => ({
  ...defaultUser,
  ...initialData,
})

const createUserSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio."),
  last_name: z.string().trim().min(1, "El apellido es obligatorio."),
  document_number: z.string().trim(),
  email: z.email("Ingresa un correo valido."),
  phone: z.string().trim().min(1, "El telefono es obligatorio."),
  address: z.string().trim(),
  password: z.string().min(8, "La contrasena debe tener minimo 8 caracteres."),
  company_name: z.string().trim().optional(),
})

type CreateUserSchema = z.infer<typeof createUserSchema>

const CreateUser = ({ initialData, onCreated, onCancel, submitLabel = "Crear usuario", }: CreateUserProps) => {
  const [isSaving, setIsSaving] = useState(false)
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      ...normalizeInitialData(initialData),
      password: "",
    },
    mode: "onSubmit",
  })

  useEffect(() => {
    form.reset({
      ...normalizeInitialData(initialData),
      password: "",
    })
  }, [form, initialData])

  const resolveCompanyId = async (): Promise<string | null> => {
    const storedUser = getStoredUser()
    if (storedUser?.company_id) return storedUser.company_id

    try {
      const sessionPayload = await getCurrentSession()
      const sessionUser = resolveUserFromLogin(sessionPayload)
      const sessionCompanyId = sessionUser?.company_id ?? resolveCompanyIdFromPayload(sessionPayload)

      if (sessionUser) {
        saveStoredUserToStorage({
          ...sessionUser,
          company_id: sessionCompanyId ?? sessionUser.company_id,
        })
      }

      return sessionCompanyId ?? null
    } catch {
      return null
    }
  }

  const handleCreateUser = async (values: CreateUserSchema) => {
    const companyId = await resolveCompanyId()

    if (!companyId) {
      toast.error("No se pudo obtener la compania del usuario logueado.")
      return
    }

    const payload: User = {
      name: values.name.trim(),
      last_name: values.last_name.trim(),
      document_number: values.document_number.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      company_name: values.company_name?.trim() ?? "",
      company_id: companyId,
    } as User

    const createPayload = {
      ...payload,
      cedula: values.document_number.trim(),
      password: values.password,
    }

    try {
      setIsSaving(true)
      const response = await createUser(createPayload)
      const createdUser = (typeof response === "object" && response !== null ? response : {}) as Record<string, unknown>

      toast.success(toastCrudMessages.success.create("usuario"))
      onCreated?.(createdUser)
      form.reset(defaultUser)
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message = apiError.response?.data?.detail || apiError.response?.data?.error || toastCrudMessages.error.create("usuario")
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="space-y-4 flex flex-col" noValidate onSubmit={form.handleSubmit(handleCreateUser)}>
      <div>
        <p className="text-sm text-muted-foreground inline-flex items-baseline gap-1"><span className="text-destructive leading-none">*</span>Nombre</p>
        <Input {...form.register("name")} aria-invalid={!!form.formState.errors.name} />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground inline-flex items-baseline gap-1"><span className="text-destructive leading-none">*</span>Apellido</p>
        <Input {...form.register("last_name")} aria-invalid={!!form.formState.errors.last_name} />
        {form.formState.errors.last_name && (
          <p className="text-xs text-destructive mt-1">{form.formState.errors.last_name.message}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground inline-flex items-baseline gap-1"><span className="text-destructive leading-none">*</span>Documento</p>
        <Input {...form.register("document_number")} />
      </div>

      <div>
        <p className="text-sm text-muted-foreground inline-flex items-baseline gap-1"><span className="text-destructive leading-none">*</span>Email</p>
        <Input type="email" {...form.register("email")} aria-invalid={!!form.formState.errors.email} />
        {form.formState.errors.email && (
          <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground inline-flex items-baseline gap-1"><span className="text-destructive leading-none">*</span>Telefono</p>
        <Input {...form.register("phone")} aria-invalid={!!form.formState.errors.phone} />
        {form.formState.errors.phone && (
          <p className="text-xs text-destructive mt-1">{form.formState.errors.phone.message}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Direccion</p>
        <Input {...form.register("address")} />
      </div>

       <div>
        <p className="text-sm text-muted-foreground inline-flex items-baseline gap-1"><span className="text-destructive leading-none">*</span>Contrasena</p>
          <Input type="password" {...form.register("password")} aria-invalid={!!form.formState.errors.password} />
          {form.formState.errors.password && (
        <p className="text-xs text-destructive mt-1">{form.formState.errors.password.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-2">
         {onCancel && (
          <Button type="button" variant="outline" className="w-full" onClick={onCancel} disabled={isSaving}>
            Cancelar
          </Button>
        )}
        <Button type="submit" className="w-full" disabled={isSaving}>
          {isSaving ? "Guardando..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default CreateUser;
