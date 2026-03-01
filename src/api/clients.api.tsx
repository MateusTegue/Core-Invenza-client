import api from "@/lib/api.axios"
import path from "path/win32"
import { SearchClientsParams } from "@/constants/models"

export const listClients = async () => {
  const response = await api.get("/clients/list/")
  return response.data
}

export const createClient = async <T extends object>(clientData: T) => {
  const response = await api.post("/clients/create/", clientData)
  return response.data
}

export const getClientById = async (clientId: string) => {
  const response = await api.get(`/clients/detail/${clientId}/`)
  return response.data
}

export const updateClient = async <T extends object>(clientId: string, clientData: T) => {
  const response = await api.put(`/clients/update/${clientId}/`, clientData)
  return response.data
}

export const deleteClient = async (clientId: string) => {
  const response = await api.delete(`/clients/delete/${clientId}/`)
  return response.data
}

export const searchClients = async (params : SearchClientsParams) => {
  const queryParams = new URLSearchParams()
    if (params.search) queryParams.set("search", params.search)
    if (params.name) queryParams.set("name", params.name)
    if (params.last_name) queryParams.set("last_name", params.last_name)
    if (params.document_number) queryParams.set("document_number", params.document_number)

    const suffix = queryParams.toString()
    const response = await api.get(`/clients/search/${suffix ? `?${suffix}` : ""}`)
    return response.data
}
    