import { TableHeader, TableHead, TableRow } from "@/components/ui/table"



const ClientTableHeader = () => {
    return (
        <TableHeader className="h-12 bg-muted [&_tr]:border-1 ">
            <TableRow className="border-0">
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Ubicacion</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default ClientTableHeader;
