import { Link, useLocation } from "react-router-dom"
import { Home, BookOpen, Plus, Search, Heart, BarChart3, Carrot, User, LogOut, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SidebarProps {
  listMenu: { name: string, href: string, icon: any }[]
}

export function Sidebar({ listMenu }: SidebarProps) {
  const pathname = useLocation()
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <div className={`
      flex h-full flex-col bg-card border-r border-border
      ${isOpenSidebar ? "w-64" : "w-20"}
      transition-all duration-300 ease-in-out
    `}>
      <div className="flex h-16 items-center px-6 border-b border-border space-x-3">
        <Menu className="h-6 w-6 text-primary hover:cursor-pointer" onClick={() => setIsOpenSidebar(!isOpenSidebar)}/>
        <h1 className={`
          text-xl font-semibold text-primary
          ${isOpenSidebar ? "text-xl" : "hidden"}
          transition-all duration-300 ease-in-out
        `}>Menu</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {listMenu.map((item) => {
          const isActive = pathname.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300 ease-in-out",
                isActive
                  ? "bg-orange-300 text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {isOpenSidebar && item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </div>
  )
}
