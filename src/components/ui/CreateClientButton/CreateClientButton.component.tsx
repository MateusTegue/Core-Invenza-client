"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateClientForm from "@/components/ui/CreateClientForm/CreateClientForm.component"
import { Client } from "@/constants/models"
import { ClouseIcon } from "@/assets/icons"

type CreateClientButtonProps = {
  buttonLabel?: string
  title?: string
  initialData?: Partial<Client>
  onClientCreated?: (createdClient: Record<string, unknown>) => void
}

const CreateClientButton = ({
  buttonLabel = "Crear cliente",
  title = "Nuevo cliente",
  initialData,
  onClientCreated,
}: CreateClientButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCreated = (createdClient: Record<string, unknown>) => {
    onClientCreated?.(createdClient)
    setIsOpen(false)
  }

  return (
    <div className="w-full max-w-xl">
      <Button type="button" onClick={() => setIsOpen(true)}>
        {buttonLabel}
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setIsOpen(false)}>
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm" onClick={(event) => event.stopPropagation()}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{title}</CardTitle>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                <ClouseIcon className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <CreateClientForm
                initialData={initialData}
                onCreated={handleCreated}
                onCancel={() => setIsOpen(false)}
                submitLabel={buttonLabel}
              />
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}

export default CreateClientButton
