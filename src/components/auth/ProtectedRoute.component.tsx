"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentSession, logout } from "@/api/login.api"

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const verifySession = async () => {
      try {
        await getCurrentSession()
        setIsChecking(false)
      } catch {
        logout()
        router.replace("/")
      }
    }

    void verifySession()
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Validating session...</p>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
