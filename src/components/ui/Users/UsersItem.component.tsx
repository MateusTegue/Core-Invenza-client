import { TableRow, TableCell } from "@/components/ui/table"
import DeleteUserButton from "../DeleteUserButton/DeleteUserButton.component"
import UpdateUser from "../UpdateUser/UpdateUser.component"

export type UserListItem = {
  id?: string
  name?: string
  last_name?: string
  document_number?: string
  email?: string
  phone?: string
  address?: string
  company_name?: string
}

type UsersItemProps = {
  user: UserListItem
  index: number
  onUserDeleted: () => void
  onUserUpdated: () => void
}

const UsersItem = ({ user, index, onUserDeleted, onUserUpdated }: UsersItemProps) => {
  const fullName = `${user.name ?? ""} ${user.last_name ?? ""}`.trim() || "Sin nombre"

  return (
    <TableRow className="border-none">
      <TableCell className="font-medium">{fullName}</TableCell>
      <TableCell>{user.last_name ?? "No disponible"}</TableCell>
      <TableCell>{user?.document_number ?? "No disponible"}</TableCell>
      <TableCell className="break-all">{user.email ?? "No disponible"}</TableCell>
      <TableCell>{user.phone ?? "No disponible"}</TableCell>
      <TableCell>{user.address ?? "No disponible"}</TableCell>
      <TableCell>{user.company_name ?? "No disponible"}</TableCell>
      <TableCell className="flex justify-center gap-4">
        <UpdateUser user={user} onUpdated={onUserUpdated} />
        <DeleteUserButton userId={user.id ?? ""} onDeleted={onUserDeleted} />
      </TableCell>
    </TableRow>
  )
}

export default UsersItem
