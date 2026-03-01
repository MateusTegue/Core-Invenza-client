import api from "@/lib/api.axios"
import { SearchUsersParams } from "@/constants/models"

export const listUsers = async () => {
  const response = await api.get("/users/list/")
  return response.data
}

export const createUser = async <T extends object>(userData: T) => {
  const response = await api.post("/users/create/", userData)
  return response.data
}

export const getUserById = async (userId: string) => {
  const response = await api.get(`/users/detail/${userId}/`)
  return response.data
}

export const updateUser = async <T extends object>(userId: string, userData: T) => {
  const response = await api.put(`/users/update/${userId}/`, userData)
  return response.data
}

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/delete/${userId}/`)
  return response.data
}

export const searchUsers = async (params: SearchUsersParams) => {
  const queryParams = new URLSearchParams()

  if (params.search) queryParams.set("search", params.search)
  if (params.name) queryParams.set("name", params.name)
  if (params.last_name) queryParams.set("last_name", params.last_name)
  if (params.cedula) queryParams.set("cedula", params.cedula)
  if (params.document_number) queryParams.set("document_number", params.document_number)

  const suffix = queryParams.toString()
  const response = await api.get(`/users/search/${suffix ? `?${suffix}` : ""}`)
  return response.data
}
