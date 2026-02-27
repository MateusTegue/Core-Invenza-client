import { ClientsIcon, DashboardIcon, ProfileIcon, ReportsIcon, SettingsIcon, SalesCartIcon, InventoryIcon } from "@/assets/icons";


const navItems = [
  { label: "Perfil", href: "/app/profile", icon: ProfileIcon },

  { label: "Dashboard", href: "/app", icon: DashboardIcon },

  { label: "Ventas", href: "/app/sales", icon: SalesCartIcon },

  { label: "Empleados", href: "/app/employees", icon: ProfileIcon },
  { label: "Clientes", href: "/app/clients", icon: ClientsIcon },

  { label: "Inventario", href: "/app/inventory", icon: InventoryIcon },

  { label: "Reportes", href: "/app/reports", icon: ReportsIcon },

  { label: "Configuración", href: "/app/settings", icon: SettingsIcon },
]

export default navItems;