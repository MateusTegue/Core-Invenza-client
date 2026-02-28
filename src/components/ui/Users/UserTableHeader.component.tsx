import { TableHeader, TableHead, TableRow } from "@/components/ui/table"

const UserTableHeader = () => {
  return (
    <TableHeader className="h-12 bg-muted [&_tr]:border-1 ">
      <TableRow className="border-0">
        {/* <TableHead className="w-[80px]">#</TableHead> */}
        <TableHead>Nombre</TableHead>
        <TableHead>Apellido</TableHead>
        <TableHead>Numero de Documento</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Telefono</TableHead>
        <TableHead>Direccion</TableHead>
        <TableHead>Empresa</TableHead>
        <TableHead className="text-center">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default UserTableHeader
