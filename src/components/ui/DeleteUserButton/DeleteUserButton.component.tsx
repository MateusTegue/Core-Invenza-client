"use client"

import { useState } from "react"
import { deleteUser } from "@/api/users.api"
import { TrashIcon } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { toast } from "@/helpers/toast.helper"
import { toastCrudMessages } from "@/helpers/toast-messages.helpers"

type DeleteUserButtonProps = {
  userId: string
  onDeleted: () => void
}

const DeleteUserButton = ({ userId, onDeleted }: DeleteUserButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    if (!userId) return

    try {
      setIsDeleting(true)
      await deleteUser(userId)
      toast.success(toastCrudMessages.success.delete("usuario"))
      setIsOpen(false)
      onDeleted()
    } catch {
      toast.error(toastCrudMessages.error.delete("usuario"))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={isDeleting || !userId}
          className="text-red-600 hover:text-red-800 disabled:text-red-300"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white rounded-md p-6">
        <DialogHeader>
          <DialogTitle>Confirmar eliminacion de usuario</DialogTitle>
          <DialogDescription>
            Estas seguro de que deseas eliminar este usuario? Esta accion no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting || !userId}>
            <TrashIcon className="w-4 h-4 " />
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteUserButton;
