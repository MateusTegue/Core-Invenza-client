"use client"
import { useState } from "react"
import { deleteClient } from "@/api/clients.api"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { toast } from "@/helpers/toast.helper"
import { toastCrudMessages } from "@/helpers/toast-messages.helpers"
import { TrashIcon } from "@/assets/icons"

type DeleteClientButtonProps = {
    clientId: string
    onDeleted: () => void
}


const DeleteClientButton = ({ clientId, onDeleted }: DeleteClientButtonProps) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async () => {
        if (!clientId) return

        try {
            setIsDeleting(true)
            await deleteClient(clientId)
            toast.success(toastCrudMessages.success.delete("cliente"))
            setIsOpen(false)
            onDeleted()
        } catch (error) {
            toast.error(toastCrudMessages.error.delete("cliente"))
        } finally {
            setIsDeleting(false)
        }
    }
      return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        disabled={isDeleting || !clientId}
                        className="text-red-600 hover:text-red-800 disabled:text-red-300"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-white rounded-md p-6">
                    <DialogHeader>
                        <DialogTitle>Confirmar eliminacion de cliente</DialogTitle>
                        <DialogDescription>
                            Estas seguro de que deseas eliminar este cliente? Esta accion no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
                            Cancelar
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting || !clientId}>
                            <TrashIcon className="w-4 h-4 " />
                            {isDeleting ? "Eliminando..." : "Eliminar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
}

export default DeleteClientButton;