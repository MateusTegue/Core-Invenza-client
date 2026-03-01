import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Client } from "@/constants/models"
import ClientsItem from "./ClientsItem.component"
import { Spinner } from "../spinner"





type ClientTableContentProps = {
  clients: Client[]
  isLoading: boolean
  error: string | null
  onClientUpdated: () => void
}

const ClientTableContent = ({ clients, isLoading, error, onClientUpdated }: ClientTableContentProps) => {
  if (isLoading) {
    return (
        <TableBody>
            <TableRow className="border-0">
                <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                   <Spinner className="mr-1 inline-block" /> Cargando clientes...
                </TableCell>
            </TableRow>
        </TableBody>
    )
  }

  if (error) {
    return (
        <TableBody>
            <TableRow className="border-0">
                <TableCell colSpan={7} className="text-center text-destructive py-6">
                    {error}
                </TableCell>
            </TableRow>
        </TableBody>
    )
  }

  if (!clients.length) {
    return (
        <TableBody>
            <TableRow className="border-0">
                <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                    No hay clientes registrados.    
                </TableCell>    
            </TableRow>
        </TableBody>
    )
  }

  return (
    <TableBody>
      {clients.map((client, index) => (
        <ClientsItem
            key={client.id ?? client.email ?? `${client.name}-${index}`}
            client={client}
            index={index}
            onClientUpdated={onClientUpdated}
        />
      ))}
    </TableBody>
  )
}

export default ClientTableContent;
