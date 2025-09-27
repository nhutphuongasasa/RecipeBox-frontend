import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import type { User } from "@/interface"

export function Header() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const userData = queryClient.getQueryData<User>(['user']);
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-xl font-semibold text-primary hover:cursor-pointer" onClick={() => navigate("/")}>RecipeBox</h1>
          </div>

          <div className="flex items-center space-x-4 sm:hidden lg:block">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Tìm kiếm công thức, nguyên liệu..." className="pl-10 bg-background border-border" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">

          {userData ? (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">{userData.name.charAt(0)}</span>
              </div>
              <span className="text-sm font-medium">{userData.name}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate("/login")} className="md:min-w-32 lg:min-w-40">
                Đăng nhập
              </Button>
              <Button variant="default" onClick={() => navigate("/register")} className="md:min-w-32 lg:min-w-40">
                Đăng ký
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
