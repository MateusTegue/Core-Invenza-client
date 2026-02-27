"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardIcon, LogoutIcon, ProfileIcon, SettingsIcon, ShowSidebarIcon, OcultSidebarIcon, ClientsIcon, ReportsIcon } from "@/assets/icons"
import navItems from "@/setting/navSetting/navSettingDefault"
import { cn } from "@/lib/utils"
import { useState } from "react"


const SidebarNav = () => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen border-r transition-all duration-300 flex flex-col overflow-hidden",
        isCollapsed ? "w-16" : "w-48"
      )}
    >
      <div className="flex items-center px-4 py-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed
            ? <OcultSidebarIcon className="h-4 w-4" />
            : <ShowSidebarIcon className="h-4 w-4" />
          }
        </button>
      </div>

      <nav className="flex flex-col flex-1 w-full">
        <div className={cn( "px-4 py-6 border-b flex", isCollapsed ? "justify-center" : "flex-col items-center")}>
          <img src="/logo.png" alt="Profile" className="h-8 w-8" />
          {!isCollapsed && (
            <h1 className="text-xl  mt-2">Matius</h1>
          )}
        </div>

        <div className="px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isCollapsed ? "justify-center" : "gap-3",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />

                {!isCollapsed && (
                  <span>{item.label}</span>
                )}
              </Link>

            )
          })}
        </div>
        <div className="mt-auto px-4 py-4 border-t text-center ">
          <Link
            href="/logout"
            className={cn(
              "flex items-center text-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isCollapsed ? "justify-center" : "gap-3",
              "text-destructive hover:bg-destructive/10"
            )}
          >
            <LogoutIcon className="h-4 w-4 shrink-0" />

            {!isCollapsed && <span>Logout</span>}
          </Link>


          {!isCollapsed && (
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Developed by TechSolutions
            </p>
          )}

        </div>

      </nav>
    </div>
  )
}

export default SidebarNav

