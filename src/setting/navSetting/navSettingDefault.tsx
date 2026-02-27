import {
  ClientsIcon,
  DashboardIcon,
  InventoryIcon,
  ProfileIcon,
  ReportsIcon,
  SalesCartIcon,
  SettingsIcon,
} from "@/assets/icons"

const navItems = [
  { label: "Perfil", href: "/admin/profile", icon: ProfileIcon },
  { label: "Dashboard", href: "/admin/dashboard", icon: DashboardIcon },
  { label: "Ventas", href: "/admin/sales", icon: SalesCartIcon },
  { label: "Empleados", href: "/admin/employees", icon: ProfileIcon },
  { label: "Clientes", href: "/admin/clients", icon: ClientsIcon },
  { label: "Inventario", href: "/admin/inventory", icon: InventoryIcon },
  { label: "Reportes", href: "/admin/reports", icon: ReportsIcon },
  { label: "Configuracion", href: "/admin/settings", icon: SettingsIcon },
]

export default navItems
