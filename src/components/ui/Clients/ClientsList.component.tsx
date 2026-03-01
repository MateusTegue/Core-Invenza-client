"use client"

import { useEffect, useState } from "react"
import { listClients, searchClients } from "@/api/clients.api"
import { Card, CardContent } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import ClientTableHeader from "@/components/ui/Clients/ClientTableHeader.component"
import ClientTableContent from "./ClientTableContent.compoenet"
import ClientTableFooter from "@/components/ui/Clients/ClientTableFooter.component"
import { Client } from "@/constants/models"

type ClientsListProps = {
  refreshTrigger?: number
  searchQuery?: string
  onLoadingChange?: (isLoading: boolean) => void
}

const getClientsFromResponse = (payload: unknown): Client[] => {
  if (Array.isArray(payload)) return payload as Client[]
  if (!payload || typeof payload !== "object") return []

  const response = payload as Record<string, unknown>
  const fromResults = Array.isArray(response["results"]) ? response["results"] : null
  const fromClients = Array.isArray(response["clients"]) ? response["clients"] : null
  const fromData = Array.isArray(response["data"]) ? response["data"] : null

  return (fromResults ?? fromClients ?? fromData ?? []) as Client[]
}

const ClientsList = ({ refreshTrigger = 0, searchQuery = "", onLoadingChange }: ClientsListProps) => {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = async () => {
    try {
      setIsLoading(true)
      onLoadingChange?.(true)
      setError(null)
      const response = searchQuery
        ? await searchClients({ search: searchQuery })
        : await listClients()
      setClients(getClientsFromResponse(response))
    } catch {
      setError("No se pudo cargar la lista de clientes.")
      setClients([])
    } finally {
      setIsLoading(false)
      onLoadingChange?.(false)
    }
  }

  useEffect(() => {
    void fetchClients()
  }, [refreshTrigger, searchQuery])

  return (
    <section className="h-full min-h-0 space-y-4">
      <Card className="h-full rounded-none border-0 shadow-none">
        <CardContent className="h-full min-h-0 p-0 border-none shadow-none rounded-none">
          <div className="relative h-full overflow-auto">
            <Table>
              <ClientTableHeader />
              <ClientTableContent
                clients={clients}
                isLoading={isLoading}
                error={error}
                onClientUpdated={fetchClients}
              />
              {!isLoading && !error && <ClientTableFooter totalClients={clients.length} />}
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default ClientsList
