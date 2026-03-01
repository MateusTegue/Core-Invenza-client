"use client"

import { useState } from "react"
import UsersList from "@/components/ui/Users/UsersList.component"
import Tool from "@/components/ui/Tools/Tool.component"
import CreateUserButton from "@/components/ui/CreateUserButton/CreateUserButton.component"

const EmployeesPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleUserCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <section className="h-full min-h-0 flex flex-col gap-4 overflow-hidden">
      <Tool
        title="Gestion de empleados"
        description="Crea, busca y administra los usuarios del sistema"
        createAction={<CreateUserButton onUserCreated={handleUserCreated} />}
        isSearching={isSearching}
        onSearch={setSearchQuery}
      />
      <UsersList refreshTrigger={refreshTrigger} searchQuery={searchQuery} onLoadingChange={setIsSearching} />
    </section>
  )
}

export default EmployeesPage
