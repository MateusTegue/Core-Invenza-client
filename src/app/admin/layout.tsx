import { ReactNode } from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute.component"
import SidebarNav from "@/components/ui/SidebarNav/SidebarNav.component"

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-background">
        <SidebarNav />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </ProtectedRoute>
  )
}

export default AdminLayout
