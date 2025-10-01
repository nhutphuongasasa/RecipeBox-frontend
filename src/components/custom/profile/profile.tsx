import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Edit, Save, X } from "lucide-react"
import { MainLayout } from "@/layout/main-layout"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { Recipe, User } from "@/interface"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<User>(["user"])

  if (!currentUser) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center h-screen ">
          <h1 className="text-2xl font-bold">Không tìm thấy thông tin người dùng</h1>
          <h1 className="text-xl">Vui lòng đăng nhập</h1>
          <Button variant="outline" className="mt-4">
            <Link to="/login" className="text-blue-500">Đăng nhập</Link>
          </Button>
        </div>
      </MainLayout>
    )
  }
  const [profile, setProfile] = useState<User>(currentUser)

  const getRecipesByme = async () => {
    const response = await axios.get(`http://localhost:3000/api/recipe/me`, {
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    })
    return response.data
  }

  const { data: recipes} = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getRecipesByme()
  })

  console.log(recipes)


  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/user-avatar.jpg" />
                  <AvatarFallback className="text-lg">NA</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="bg-background border-border"></Input>
                      </div>
                    </div>
                    <div className="flex justify-start space-x-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                      <X className="mr-2 h-4 w-4" />
                      Hủy
                    </Button>
                    <Button variant="default" onClick={() => setIsEditing(false)} size="sm">
                      <Save className="mr-2 h-4 w-4" />
                      Lưu
                    </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold">{profile.name}</h1>
                      <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </Button>
                    </div>
                    <p className="text-muted-foreground">{profile.email}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="recipes" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="recipes">Công thức của tôi</TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Công thức của tôi</CardTitle>
                <CardDescription>Những công thức bạn đã tạo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipes?.map((recipe: Recipe) => (
                  <div key={recipe.id} className="flex items-center space-x-4 p-4 rounded-lg bg-accent/50">
                    <img
                      src={recipe.image_url || "/placeholder.svg"}
                      alt={recipe.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{recipe.name}</h3>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/recipes/update/${recipe.id}`)}>
                      Xem chi tiết
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>



          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Cài đặt tài khoản</CardTitle>
                <CardDescription>Quản lý thông tin và tùy chọn tài khoản</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                    <Input id="current-password" type="password" className="bg-background border-border" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                    <Input id="new-password" type="password" className="bg-background border-border" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                    <Input id="confirm-password" type="password" className="bg-background border-border" />
                  </div>
                  <Button>Đổi mật khẩu</Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-medium mb-4">Tùy chọn thông báo</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Thông báo email</p>
                        <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                      </div>
                      <input type="checkbox" className="h-4 w-4 rounded border-border" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Công thức mới</p>
                        <p className="text-sm text-muted-foreground">
                          Thông báo khi có công thức mới từ người bạn theo dõi
                        </p>
                      </div>
                      <input type="checkbox" className="h-4 w-4 rounded border-border" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Bình luận</p>
                        <p className="text-sm text-muted-foreground">Thông báo khi có bình luận mới</p>
                      </div>
                      <input type="checkbox" className="h-4 w-4 rounded border-border" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
