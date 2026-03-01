import { ReactNode } from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute.component"
import SidebarNav from "@/components/ui/SidebarNav/SidebarNav.component"

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ProtectedRoute>
      <div className="h-screen flex bg-background overflow-hidden">
        <SidebarNav />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoute>
  )
}

export default AdminLayout
