"use client"

import { useEffect, useState } from "react"
import { listUsers } from "@/api/users.api"
import { Card, CardContent } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import UserTableHeader from "@/components/ui/Users/UserTableHeader.component"
import UserTableContent from "@/components/ui/Users/UserTableContent.compoenet"
import UserTableFooter from "@/components/ui/Users/UserTableFooter.component"
import { UserListItem } from "@/components/ui/Users/UsersItem.component"

type UsersListProps = {
  refreshTrigger?: number
}

const getUsersFromResponse = (payload: unknown): UserListItem[] => {
  if (Array.isArray(payload)) {
    return payload as UserListItem[]
  }

  if (!payload || typeof payload !== "object") return []

  const response = payload as Record<string, unknown>
  const fromResults = Array.isArray(response["results"]) ? response["results"] : null
  const fromUsers = Array.isArray(response["users"]) ? response["users"] : null
  const fromData = Array.isArray(response["data"]) ? response["data"] : null

  return (fromResults ?? fromUsers ?? fromData ?? []) as UserListItem[]
}

const UsersList = ({ refreshTrigger = 0 }: UsersListProps) => {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await listUsers()
      setUsers(getUsersFromResponse(response))
    } catch {
      setError("No se pudo cargar la lista de usuarios.")
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchUsers()
  }, [refreshTrigger])

  return (
    <section className="space-y-4">
      <Card className="rounded-none border-0 shadow-none">
        <CardContent className="p-0 border-none shadow-none rounded-none">
          <Table>
            <UserTableHeader />
            <UserTableContent
              users={users}
              isLoading={isLoading}
              error={error}
              onUserDeleted={fetchUsers}
              onUserUpdated={fetchUsers}
            />
            {!isLoading && !error && <UserTableFooter totalUsers={users.length} />}
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}

export default UsersList
