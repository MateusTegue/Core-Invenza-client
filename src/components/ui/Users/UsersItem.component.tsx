import { TableRow, TableCell } from "@/components/ui/table"
import { TrashIcon, EdictIcon } from "@/assets/icons"

export type UserListItem = {
  id?: string
  name?: string
  last_name?: string
  email?: string
  phone?: string
  company_name?: string
}

type UsersItemProps = {
  user: UserListItem
  index: number
}

const UsersItem = ({ user, index }: UsersItemProps) => {
  const fullName = `${user.name ?? ""} ${user.last_name ?? ""}`.trim() || "Sin nombre"

  return (
    <TableRow className="border-none">
      <TableCell className="font-medium">{fullName}</TableCell>
      <TableCell className="break-all">{user.email ?? "No disponible"}</TableCell>
      <TableCell>{user.phone ?? "No disponible"}</TableCell>
      <TableCell>{user.company_name ?? "No disponible"}</TableCell>
      <TableCell className="flex justify-center gap-4">
        <EdictIcon className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
        <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
      </TableCell>
    </TableRow>
  )
}

export default UsersItem
