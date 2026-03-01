"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateClient } from "@/api/clients.api"
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
import { ApiError, Client } from "@/constants/models"
import { toast } from "@/helpers/toast.helper"
import { toastCrudMessages } from "@/helpers/toast-messages.helpers"

type UpdateClientProps = {
  client: Partial<Client>
  onUpdated: () => void
}

const updateClientSchema = z
  .object({
    client_type: z.enum(["PERSON", "COMPANY"]),
    name: z.string().trim().optional(),
    last_name: z.string().trim().optional(),
    business_name: z.string().trim().optional(),
    trade_name: z.string().trim().optional(),
    document_type: z.enum(["DNI", "RUC", "PASSPORT", "OTHER"]),
    document_number: z.string().trim().min(1, "El numero de documento es obligatorio."),
    email: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    address: z.string().trim().min(1, "La direccion es obligatoria."),
    city: z.string().trim().min(1, "La ciudad es obligatoria."),
    state: z.string().trim().min(1, "El estado es obligatorio."),
    country: z.string().trim().min(1, "El pais es obligatorio."),
    postal_code: z.string().trim().optional(),
    payment_terms: z.number().min(0, "Los terminos de pago no pueden ser negativos."),
    credit_limit: z.string().trim().optional(),
    notes: z.string().trim().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.client_type === "PERSON") {
      if (!values.name) {
        ctx.addIssue({ code: "custom", path: ["name"], message: "El nombre es obligatorio para persona." })
      }
      if (!values.last_name) {
        ctx.addIssue({ code: "custom", path: ["last_name"], message: "El apellido es obligatorio para persona." })
      }
    }

    if (values.client_type === "COMPANY" && !values.business_name) {
      ctx.addIssue({ code: "custom", path: ["business_name"], message: "La razon social es obligatoria para empresa." })
    }
  })

type UpdateClientSchema = z.infer<typeof updateClientSchema>

const toDefaultValues = (client: Partial<Client>): UpdateClientSchema => ({
  client_type: client.client_type ?? "PERSON",
  name: client.name ?? "",
  last_name: client.last_name ?? "",
  business_name: client.business_name ?? "",
  trade_name: client.trade_name ?? "",
  document_type: client.document_type ?? "DNI",
  document_number: client.document_number ?? "",
  email: client.email ?? "",
  phone: client.phone ?? "",
  address: client.address ?? "",
  city: client.city ?? "",
  state: client.state ?? "",
  country: client.country ?? "",
  postal_code: client.postal_code ?? "",
  payment_terms: Number(client.payment_terms ?? 0),
  credit_limit: client.credit_limit !== undefined && client.credit_limit !== null ? String(client.credit_limit) : "",
  notes: client.notes ?? "",
})

const UpdateClient = ({ client, onUpdated }: UpdateClientProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<UpdateClientSchema>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: toDefaultValues(client),
    mode: "onSubmit",
  })

  const clientType = form.watch("client_type")

  useEffect(() => {
    form.reset(toDefaultValues(client))
  }, [form, client])

  const handleUpdateClient = async (values: UpdateClientSchema) => {
    if (!client.id) {
      toast.error("No se pudo obtener el id del cliente.")
      return
    }

    try {
      setIsSaving(true)
      await updateClient(client.id, {
        client_type: values.client_type,
        name: values.client_type === "PERSON" ? values.name?.trim() : undefined,
        last_name: values.client_type === "PERSON" ? values.last_name?.trim() : undefined,
        business_name: values.client_type === "COMPANY" ? values.business_name?.trim() : undefined,
        trade_name: values.client_type === "COMPANY" ? values.trade_name?.trim() || undefined : undefined,
        document_type: values.document_type,
        document_number: values.document_number.trim(),
        email: values.email?.trim() || undefined,
        phone: values.phone?.trim() || undefined,
        address: values.address.trim(),
        city: values.city.trim(),
        state: values.state.trim(),
        country: values.country.trim(),
        postal_code: values.postal_code?.trim() || undefined,
        payment_terms: values.payment_terms,
        credit_limit: values.credit_limit?.trim() ? values.credit_limit.trim() : undefined,
        notes: values.notes?.trim() || undefined,
      })

      toast.success(toastCrudMessages.success.update("cliente"))
      setIsOpen(false)
      onUpdated()
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message =
        apiError.response?.data?.detail ||
        apiError.response?.data?.error ||
        toastCrudMessages.error.update("cliente")
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button type="button" className="text-blue-500 hover:text-blue-700" disabled={!client.id}>
          <EdictIcon className="w-5 h-5 cursor-pointer" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto !rounded-sm">
        <DialogHeader>
          <DialogTitle>Editar cliente</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 flex flex-col" noValidate onSubmit={form.handleSubmit(handleUpdateClient)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Tipo de cliente</p>
              <select className="h-10 w-full rounded-sm border border-input bg-background px-3" {...form.register("client_type") }>
                <option value="PERSON">Persona Natural</option>
                <option value="COMPANY">Empresa</option>
              </select>
            </div>

             <div>
              <p className="text-sm text-muted-foreground">Tipo de documento</p>
              <select className="h-10 w-full rounded-sm border border-input bg-background px-3" {...form.register("document_type") }>
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
                <option value="PASSPORT">Pasaporte</option>
                <option value="OTHER">Otro</option>
              </select>
            </div>

            {clientType === "PERSON" ? (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Nombre</p>
                  <Input {...form.register("name")} aria-invalid={!!form.formState.errors.name} />
                  {form.formState.errors.name ? <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p> : null}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Apellido</p>
                  <Input {...form.register("last_name")} aria-invalid={!!form.formState.errors.last_name} />
                  {form.formState.errors.last_name ? <p className="text-xs text-destructive mt-1">{form.formState.errors.last_name.message}</p> : null}
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Razon social</p>
                  <Input {...form.register("business_name")} aria-invalid={!!form.formState.errors.business_name} />
                  {form.formState.errors.business_name ? <p className="text-xs text-destructive mt-1">{form.formState.errors.business_name.message}</p> : null}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Nombre comercial</p>
                  <Input {...form.register("trade_name")} />
                </div>
              </>
            )}

            <div>
              <p className="text-sm text-muted-foreground">Numero de documento</p>
              <Input {...form.register("document_number")} aria-invalid={!!form.formState.errors.document_number} />
              {form.formState.errors.document_number ? <p className="text-xs text-destructive mt-1">{form.formState.errors.document_number.message}</p> : null}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <Input type="email" {...form.register("email")} />
            </div>

          <div>
            <p className="text-sm text-muted-foreground">Telefono</p>
            <Input {...form.register("phone")} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Direccion</p>
            <Input {...form.register("address")} aria-invalid={!!form.formState.errors.address} />
            {form.formState.errors.address ? <p className="text-xs text-destructive mt-1">{form.formState.errors.address.message}</p> : null}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Ciudad</p>
            <Input {...form.register("city")} aria-invalid={!!form.formState.errors.city} />
            {form.formState.errors.city ? <p className="text-xs text-destructive mt-1">{form.formState.errors.city.message}</p> : null}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Estado</p>
            <Input {...form.register("state")} aria-invalid={!!form.formState.errors.state} />
            {form.formState.errors.state ? <p className="text-xs text-destructive mt-1">{form.formState.errors.state.message}</p> : null}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Pais</p>
            <Input {...form.register("country")} aria-invalid={!!form.formState.errors.country} />
            {form.formState.errors.country ? <p className="text-xs text-destructive mt-1">{form.formState.errors.country.message}</p> : null}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Codigo postal</p>
            <Input {...form.register("postal_code")} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Terminos de pago (dias)</p>
            <Input type="number" min={0} {...form.register("payment_terms", { valueAsNumber: true })} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Limite de credito</p>
            <Input {...form.register("credit_limit")} />
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Notas</p>
            <Input {...form.register("notes")} />
          </div>
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

export default UpdateClient
