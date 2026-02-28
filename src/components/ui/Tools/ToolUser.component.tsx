import { useCallback } from "react"
import CreateUserButton from "@/components/ui/CreateUserButton/CreateUserButton.component"
import SearchUser from "../SearchUser/SearchUser.Component"
import DateNow from "../DateNow/DateNow.component"


type ToolUserProps = {
  onUserCreated?: () => void
}

const ToolUser = ({ onUserCreated }: ToolUserProps) => {
  const handleUserCreated = useCallback(() => {
    onUserCreated?.()
  }, [onUserCreated])

  return (
    <div className="w-full min-h-72 bg-muted flex flex-col rounded-sm p-4 gap-4">
      <div className="w-full flex flex-row content-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Gestión de usuarios</h2>
          <p className="text-muted-foreground">Crea, busca y administra los usuarios del sistema</p>
        </div>
        <div>
          <DateNow />
        </div>
      </div>
      <div className="w-full mt-auto flex flex-col gap-3 md:flex-row md:items-center">
        <div className="w-full md:w-auto md:shrink-0">
          <CreateUserButton onUserCreated={handleUserCreated} />
        </div>

        <div className="w-full md:max-w-md">
          <SearchUser />
        </div>
      </div>
    </div>
  )
}

export default ToolUser
