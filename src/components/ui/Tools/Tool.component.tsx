import { ReactNode } from "react"
import SearchUser from "../SearchUser/SearchUser.Component"
import SearchClient from "../SearchClient/SearchClient.Component"
import DateNow from "../DateNow/DateNow.component"

type ToolProps = {
  title: string
  description: string
  createAction?: ReactNode
  onSearch?: (query: string) => void
  searchType?: "user" | "client"
  isSearching?: boolean
}

const Tool = ({ title, description, createAction, onSearch, searchType = "user", isSearching = false }: ToolProps) => {
  return (
    <div className="w-full min-h-72 bg-muted flex flex-col rounded-sm p-4 gap-4">
      <div className="w-full flex flex-row content-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div>
          <DateNow />
        </div>
      </div>

      <div className="w-full mt-auto flex flex-col gap-3 md:flex-row md:items-center">
        {createAction ? <div className="w-full md:w-auto md:shrink-0">{createAction}</div> : null}

        <div className="w-full md:max-w-md">
          {searchType === "client" ? (
            <SearchClient onSearch={(query) => onSearch?.(query)} isSearching={isSearching} />
          ) : (
            <SearchUser onSearch={(query) => onSearch?.(query)} isSearching={isSearching} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Tool
