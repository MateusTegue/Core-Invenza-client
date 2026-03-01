"use client"

import { useEffect, useState } from "react"
import { listUsers, searchUsers } from "@/api/users.api"
import { Card, CardContent } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import UserTableHeader from "@/components/ui/Users/UserTableHeader.component"
import UserTableContent from "@/components/ui/Users/UserTableContent.compoenet"
import UserTableFooter from "@/components/ui/Users/UserTableFooter.component"
import { UserListItem } from "@/components/ui/Users/UsersItem.component"

type UsersListProps = {
  refreshTrigger?: number
  searchQuery?: string
  onLoadingChange?: (isLoading: boolean) => void
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

const UsersList = ({ refreshTrigger = 0, searchQuery = "", onLoadingChange }: UsersListProps) => {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      onLoadingChange?.(true)
      setError(null)
      const response = searchQuery
        ? await searchUsers({ search: searchQuery })
        : await listUsers()
      setUsers(getUsersFromResponse(response))
    } catch {
      setError("No se pudo cargar la lista de usuarios.")
      setUsers([])
    } finally {
      setIsLoading(false)
      onLoadingChange?.(false)
    }
  }

  useEffect(() => {
    void fetchUsers()
  }, [refreshTrigger, searchQuery])

  return (
    <section className="space-y-4">
      <Card className="rounded-none border-0 shadow-none">
        <CardContent className="p-0 border-none shadow-none rounded-none">
          <div className="relative max-h-[65vh] overflow-auto">
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
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default UsersList
