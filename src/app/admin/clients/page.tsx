"use client"

import { useState } from "react"
import ClientsList from "@/components/ui/Clients/ClientsList.component"
import Tool from "@/components/ui/Tools/Tool.component"
import CreateClientButton from "@/components/ui/CreateClientButton/CreateClientButton.component"

const ClientsPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  return (
    <section className="h-full min-h-0 flex flex-col gap-4 overflow-hidden">
      <Tool
        title="Gestion de clientes"
        description="Busca y administra los clientes del sistema"
        createAction={<CreateClientButton onClientCreated={() => setRefreshTrigger((prev) => prev + 1)} />}
        searchType="client"
        isSearching={isSearching}
        onSearch={setSearchQuery}
      />
      <div className="flex-1 min-h-0">
        <ClientsList refreshTrigger={refreshTrigger} searchQuery={searchQuery} onLoadingChange={setIsSearching} />
      </div>
    </section>
  )
}

export default ClientsPage
