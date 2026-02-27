"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/api/login.api"

const LogoutPage = () => {
  const router = useRouter()

  useEffect(() => {
    logout()
    router.replace("/")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Closing session...</p>
    </div>
  )
}

export default LogoutPage
