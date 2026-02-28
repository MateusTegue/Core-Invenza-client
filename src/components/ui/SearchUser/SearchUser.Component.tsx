import { Input } from "@/components/ui/input"
import { Button } from "../button"
import { SearchIcon } from "@/assets/icons"

const SearchUser = () => {
  return (
    <div className="w-full flex items-center gap-1">
      <Input
        className="border-black border rounded-sm bg-white"
        placeholder="Buscar usuario por nombre, apellido o email"
      />
      <Button variant="outline" className="h-10 w-14 !p-0 bg-black hover:bg-white hover:border-black text-white border rounded-md">
        <SearchIcon width={38} height={38} />
      </Button>
      <Button>Filtros</Button>
    </div>
  )
}

export default SearchUser
