import { TableHeader, TableHead, TableRow } from "@/components/ui/table"



const ClientTableHeader = () => {
    return (
        <TableHeader className="sticky top-0 z-30 h-12 bg-muted [&_tr]:border-1 ">
            <TableRow className="border-0">
                <TableHead className="sticky top-0 z-20 bg-muted">Tipo</TableHead>
                <TableHead className="sticky top-0 z-20 bg-muted">Cliente</TableHead>
                <TableHead className="sticky top-0 z-20 bg-muted">Documento</TableHead>
                <TableHead className="sticky top-0 z-20 bg-muted">Contacto</TableHead>
                <TableHead className="sticky top-0 z-20 bg-muted">Ubicacion</TableHead>
                <TableHead className="sticky top-0 z-20 bg-muted">Estado</TableHead>
                <TableHead className="sticky top-0 z-20 bg-muted text-center">Acciones</TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default ClientTableHeader;
