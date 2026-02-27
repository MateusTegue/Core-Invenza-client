import api from "@/lib/api.axios"

export const login = async (email: string, password: string) => {
    try {
        // Evita enviar tokens viejos/expirados al endpoint de login.
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')

        const data = { email, password }
        const response = await api.post('/auth/login/', data, {
            skipAuth: true,
        
        } );

        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)

        return response.data
    } catch (error: any) {
        throw error.response?.data?.detail || error.response?.data?.error || 'Error al iniciar sesion'
    }
}

export const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
}
