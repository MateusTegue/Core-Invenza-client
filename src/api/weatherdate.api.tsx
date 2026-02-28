import api from "@/lib/api.axios"

export const getWeatherDate = async (date?: string) => {
  const response = await api.get("/weatherdate/weather/", {
    params: date ? { date } : undefined,
  })
  return response.data
}
