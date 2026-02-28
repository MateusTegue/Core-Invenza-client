"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateUserForm from "@/components/ui/CreateUserForm/CreateUserForm.component"
import { CreateUserProps, User } from "@/constants/models"
import { ClouseIcon } from "@/assets/icons"

type CreateUserButtonProps = {
  buttonLabel?: string
  title?: string
  initialData?: Partial<User>
  onUserCreated?: (createdUser: Record<string, unknown>) => void
}

const CreateUserButton = ({
  buttonLabel = "Crear usuario",
  title = "Nuevo usuario",
  initialData,
  onUserCreated,
}: CreateUserButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCreated: NonNullable<CreateUserProps["onCreated"]> = (createdUser) => {
    onUserCreated?.(createdUser)
    setIsOpen(false)
  }

  return (
    <div className="w-full max-w-xl">
      <Button type="button" onClick={() => setIsOpen(true)}>
        {buttonLabel}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <Card
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{title}</CardTitle>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                <ClouseIcon className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <CreateUserForm
                initialData={initialData}
                onCreated={handleCreated}
                onCancel={() => setIsOpen(false)}
                submitLabel={buttonLabel}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default CreateUserButton
