import { TableHeader, TableHead, TableRow } from "@/components/ui/table"

const UserTableHeader = () => {
  return (
    <TableHeader className="h-12 bg-muted [&_tr]:border-1 ">
      <TableRow className="border-0">
        {/* <TableHead className="w-[80px]">#</TableHead> */}
        <TableHead className="sticky top-0 z-20 bg-muted">Nombre</TableHead>
        <TableHead className="sticky top-0 z-20 bg-muted">Apellido</TableHead>
        <TableHead className="sticky top-0 z-20 bg-muted">Numero de Documento</TableHead>
        <TableHead className="sticky top-0 z-20 bg-muted">Email</TableHead>
        <TableHead className="sticky top-0 z-20 bg-muted">Telefono</TableHead>
        <TableHead className="sticky top-0 z-20 bg-muted">Direccion</TableHead>
        <TableHead className="sticky top-0 z-20 bg-muted">Empresa</TableHead>
        <TableHead className="sticky top-0 z-20 bg-muted text-center">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default UserTableHeader
