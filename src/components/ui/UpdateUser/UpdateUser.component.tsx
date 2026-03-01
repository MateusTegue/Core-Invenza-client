"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUser } from "@/api/users.api"
import { EdictIcon, SaveIcon } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ApiError } from "@/constants/models"
import { toast } from "@/helpers/toast.helper"
import { toastCrudMessages } from "@/helpers/toast-messages.helpers"

type UpdateUserModel = {
  id?: string
  name?: string
  last_name?: string
  cedula?: string
  document_number?: string
  email?: string
  phone?: string
  address?: string
  company_name?: string
}

type UpdateUserProps = {
  user: UpdateUserModel
  onUpdated: () => void
}

const updateUserSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio."),
  last_name: z.string().trim().min(1, "El apellido es obligatorio."),
  document_number: z.string().trim(),
  email: z.email("Ingresa un correo valido."),
  phone: z.string().trim().min(1, "El telefono es obligatorio."),
  address: z.string().trim(),
  company_name: z.string().trim().optional(),
})

type UpdateUserSchema = z.infer<typeof updateUserSchema>

const toDefaultValues = (user: UpdateUserModel): UpdateUserSchema => ({
  name: user.name ?? "",
  last_name: user.last_name ?? "",
  document_number: user.document_number ?? user.cedula ?? "",
  email: user.email ?? "",
  phone: user.phone ?? "",
  address: user.address ?? "",
  company_name: user.company_name ?? "",
})

const UpdateUser = ({ user, onUpdated }: UpdateUserProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: toDefaultValues(user),
    mode: "onSubmit",
  })

  useEffect(() => {
    form.reset(toDefaultValues(user))
  }, [form, user])

  const handleUpdateUser = async (values: UpdateUserSchema) => {
    if (!user.id) {
      toast.error("No se pudo obtener el id del usuario.")
      return
    }

    try {
      setIsSaving(true)
      await updateUser(user.id, {
        name: values.name.trim(),
        last_name: values.last_name.trim(),
        cedula: values.document_number.trim(),
        document_number: values.document_number.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        company_name: values.company_name?.trim() ?? "",
      })

      toast.success(toastCrudMessages.success.update("usuario"))
      setIsOpen(false)
      onUpdated()
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message =
        apiError.response?.data?.detail ||
        apiError.response?.data?.error ||
        toastCrudMessages.error.update("usuario")
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button type="button" className="text-blue-500 hover:text-blue-700" disabled={!user.id}>
          <EdictIcon className="w-5 h-5 cursor-pointer" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto !rounded-sm">
        <DialogHeader>
          <DialogTitle>Editar empleado</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 flex flex-col" noValidate onSubmit={form.handleSubmit(handleUpdateUser)}>
          <div>
            <p className="text-sm text-muted-foreground">Nombre</p>
            <Input {...form.register("name")} aria-invalid={!!form.formState.errors.name} />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Apellido</p>
            <Input {...form.register("last_name")} aria-invalid={!!form.formState.errors.last_name} />
            {form.formState.errors.last_name && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.last_name.message}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Documento</p>
            <Input {...form.register("document_number")} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <Input type="email" {...form.register("email")} aria-invalid={!!form.formState.errors.email} />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Telefono</p>
            <Input {...form.register("phone")} aria-invalid={!!form.formState.errors.phone} />
            {form.formState.errors.phone && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Direccion</p>
            <Input {...form.register("address")} />
          </div>
          <DialogFooter className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="w-full" onClick={() => setIsOpen(false)} disabled={isSaving}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving} className="w-full">
              <SaveIcon width={16} height={16} />
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateUser
