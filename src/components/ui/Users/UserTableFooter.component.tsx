import { TableFooter, TableRow, TableCell } from "@/components/ui/table"
import { EmployeesIcon } from "@/assets/icons"

type UserTableFooterProps = {
  totalUsers: number
}

const UserTableFooter = ({ totalUsers }: UserTableFooterProps) => {
    return (
        <TableFooter className="border-0 bg-transparent">
            <TableRow className="border-0">
                <TableCell colSpan={8}>
                    <div className="flex justify-end">
                        Total usuarios: {totalUsers}
                        <EmployeesIcon className="inline-block w-5 h-5 text-muted-foreground ml-1" />
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
    )
}

export default UserTableFooter
