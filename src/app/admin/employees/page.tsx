"use client"

import { useState } from "react"
import UsersList from "@/components/ui/Users/UsersList.component"
import ToolUser from "@/components/ui/Tools/ToolUser.component"

const EmployeesPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleUserCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <section className="space-y-4">
      <ToolUser onUserCreated={handleUserCreated} />
      <UsersList refreshTrigger={refreshTrigger} />
    </section>
  )
}

export default EmployeesPage
