import { KeyboardEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "../button"
import { SearchIcon, TrashIcon } from "@/assets/icons"
import { Spinner } from "../spinner"

type SearchClientProps = {
  onSearch: (query: string) => void
  onOpenFilters?: () => void
  isSearching?: boolean
}

const SearchClient = ({ onSearch, onOpenFilters, isSearching = false }: SearchClientProps) => {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    onSearch(query.trim())
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSearch()
    }
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="w-full flex items-center gap-1">
      <Input
        className="border-black border rounded-sm bg-white"
        placeholder="Buscar por razon social, nombre o documento"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        type="button"
        variant="outline"
        className="h-10 w-16 !p-0 bg-black hover:bg-white hover:border-black text-white border rounded-md"
        onClick={handleSearch}
        aria-label="Buscar clientes"
        disabled={isSearching}
      >
        {isSearching ? <Spinner className="size-4" /> : <SearchIcon width={18} height={18} />}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-10 w-16 !p-0 bg-black hover:bg-white hover:border-black text-white border rounded-md"
        onClick={handleClear}
        aria-label="Limpiar busqueda"
      >
        <TrashIcon width={18} height={18} />
      </Button>

      <Button type="button" className="h-10 bg-black hover:bg-white hover:border-black text-white hover:text-black border rounded-md" onClick={onOpenFilters}>
        Filtros
      </Button>
    </div>
  )
}

export default SearchClient
