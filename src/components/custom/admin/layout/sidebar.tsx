import { Sidebar } from '@/layout/sidebar'
import { BarChart3, BookOpen, Users, Tag, LineChart, Settings } from 'lucide-react'

export const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Recipes", href: "/admin/recipes", icon: BookOpen },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Statistics", href: "/admin/statistics", icon: LineChart },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const SidebarAdmin = () => {
  return (
    <div>
        <Sidebar listMenu={navigation}/>
    </div>
  )
}

export default SidebarAdmin