
import { TableRow, TableCell } from "@/components/ui/table"
import { Client } from "@/constants/models"
import { ViewIcon } from "@/assets/icons"
import UpdateClient from "@/components/ui/UpdateClient/UpdateClient.component"
import DeleteClientButton from "../DeleteClientButton/DeleteClientButton.component"

type ClientsItemProps = {
  client: Client
  index: number
  onClientUpdated: () => void
}

const ClientsItem = ({ client, index, onClientUpdated }: ClientsItemProps) => {
    const displayName =
      client.client_type === "COMPANY"
        ? client.trade_name ?? client.business_name ?? "No disponible"
        : `${client.name ?? ""} ${client.last_name ?? ""}`.trim() || "No disponible"
    const documentValue = [client.document_type, client.document_number].filter(Boolean).join(" - ") || "No disponible"
    const locationValue = [client.city, client.state, client.country].filter(Boolean).join(", ") || "No disponible"
    const contactValue = [client.email, client.phone].filter(Boolean).join(" / ") || "No disponible"
    const statusLabel = client.is_active === false ? "Inactivo" : "Activo"
    const clientTypeLabel = client.client_type === "COMPANY" ? "Empresa" : "Persona"

    return (
        <TableRow className="border-none">
          <TableCell>{clientTypeLabel}</TableCell>
          <TableCell className="font-medium">{displayName}</TableCell>
          <TableCell>{documentValue}</TableCell>
          <TableCell className="break-all">{contactValue}</TableCell>
          <TableCell>{locationValue}</TableCell>
          <TableCell>{statusLabel}</TableCell>
          <TableCell className="flex items-center justify-center gap-4">
            <button className="flex items-center bg-blue-400 w-30 p-1 gap-0 border-blue-400 rounded-sm text-white font-sans"><ViewIcon width={16} height={16} className="mr-2" /><a href="#">Ver detalle</a></button>
            <UpdateClient client={client} onUpdated={onClientUpdated} />
            <DeleteClientButton clientId={client.id ?? ""} onDeleted={onClientUpdated} />
          </TableCell>
        </TableRow>
    )
}

export default ClientsItem;
