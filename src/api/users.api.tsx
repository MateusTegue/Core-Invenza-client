import api from "@/lib/api.axios"

export const listUsers = async () => {
  const response = await api.get("/users/list/")
  return response.data
}

export const createUser = async (userData: Record<string, unknown>) => {
  const response = await api.post("/users/create/", userData)
  return response.data
}

export const getUserById = async (userId: string) => {
  const response = await api.get(`/users/detail/${userId}/`)
  return response.data
}

export const updateUser = async (userId: string, userData: Record<string, unknown>) => {
  const response = await api.put(`/users/update/${userId}/`, userData)
  return response.data
}

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/delete/${userId}/`)
  return response.data
}
