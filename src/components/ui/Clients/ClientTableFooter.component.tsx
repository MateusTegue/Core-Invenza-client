import { TableFooter, TableRow, TableCell } from "@/components/ui/table"
import { ClientsIcon } from "@/assets/icons"




type ClientTableFooterProps = {
  totalClients: number
}


const ClientTableFooter = ({ totalClients }: ClientTableFooterProps) => {
    return (
        <TableFooter className="border-0 bg-transparent">
            <TableRow className="border-0">
                <TableCell colSpan={7}>
                    <div className="flex justify-end">
                        Total clientes: {totalClients}
                        <ClientsIcon className="inline-block w-5 h-5 text-muted-foreground ml-1" />
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
    )
}

export default ClientTableFooter;
