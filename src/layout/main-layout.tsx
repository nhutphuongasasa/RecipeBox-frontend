import type React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Home, BookOpen, Plus, Search, Heart, BarChart3, Carrot, User, LogOut, Menu } from "lucide-react"

interface MainLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Công thức", href: "/recipes", icon: BookOpen },
  { name: "Tạo công thức", href: "/recipes/create", icon: Plus },
  { name: "Yêu thích", href: "/favorites", icon: Heart },
  { name: "Hồ sơ", href: "/profile", icon: User },
]

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex-col h-screen bg-background">
        <Header />
        <div className="flex h-full">
          <Sidebar listMenu={navigation}/>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
    </div>
  )
}
