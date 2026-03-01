import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import UsersItem, { UserListItem } from "@/components/ui/Users/UsersItem.component"

type UserTableContentProps = {
  users: UserListItem[]
  isLoading: boolean
  error: string | null
  onUserDeleted: () => void
  onUserUpdated: () => void
}

const UserTableContent = ({ users, isLoading, error, onUserDeleted, onUserUpdated }: UserTableContentProps) => {
  if (isLoading) {
    return (
      <TableBody>
        <TableRow className="border-0">
          <TableCell colSpan={8} className="text-center text-muted-foreground py-6">
            Cargando usuarios...
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  if (error) {
    return (
      <TableBody>
        <TableRow className="border-0">
          <TableCell colSpan={8} className="text-center text-destructive py-6">
            {error}
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  if (!users.length) {
    return (
      <TableBody>
        <TableRow className="border-0">
          <TableCell colSpan={8} className="text-center text-muted-foreground py-6">
            No hay usuarios registrados.
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {users.map((user, index) => (
        <UsersItem
          key={user.id ?? user.email ?? `${user.name}-${user.last_name}-${index}`}
          user={user}
          index={index}
          onUserDeleted={onUserDeleted}
          onUserUpdated={onUserUpdated}
        />
      ))}
    </TableBody>
  )
}

export default UserTableContent
