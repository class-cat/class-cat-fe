"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icons } from "~/components/icons"
import { ROUTES } from "~/lib/const"
import { cn } from "@class-cat/ui"

interface SidebarItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: Icons.home,
  },
  {
    label: "Kalendarz",
    href: ROUTES.CALENDAR,
    icon: Icons.calendar,
  },
  {
    label: "Zajęcia",
    href: ROUTES.ACTIVITIES,
    icon: Icons.briefcase,
  },
  {
    label: "Pracownicy",
    href: ROUTES.EMPLOYEES,
    icon: Icons.users,
  },
  {
    label: "Lokalizacje",
    href: ROUTES.LOCATIONS,
    icon: Icons.map,
  },
  {
    label: "Ustawienia",
    href: ROUTES.SETTINGS,
    icon: Icons.settings,
  },
]

export const Sidebar = () => {
  const { isLoaded, userId } = useAuth()
  const pathname = usePathname()

  // Only show sidebar when user is loaded and signed in
  if (!isLoaded || !userId) {
    return null
  }

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-secondary bg-white">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="mb-4 px-2">
          <h2 className="text-lg font-semibold text-primary">Menu</h2>
        </div>
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-foregroundMuted hover:bg-secondary hover:text-primary"
                )}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

