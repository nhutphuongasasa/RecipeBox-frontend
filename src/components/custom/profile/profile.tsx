import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Edit, Save, X, BookOpen, Heart, Star, Award } from "lucide-react"
import { MainLayout } from "@/layout/main-layout"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    bio: "Đầu bếp nghiệp dư yêu thích khám phá các món ăn truyền thống Việt Nam",
    location: "Hà Nội, Việt Nam",
    joinDate: "Tham gia từ tháng 3, 2024",
  })

  const stats = [
    { label: "Công thức", value: 24, icon: BookOpen },
    { label: "Yêu thích", value: 156, icon: Heart },
    { label: "Đánh giá", value: 4.8, icon: Star },
    { label: "Huy hiệu", value: 8, icon: Award },
  ]

  const recentRecipes = [
    { id: 1, name: "Phở Bò Hà Nội", rating: 4.8, favorites: 24, image: "/steaming-pho.png" },
    { id: 2, name: "Bánh Mì Thịt Nướng", rating: 4.6, favorites: 18, image: "/banh-mi.jpg" },
    { id: 3, name: "Chè Ba Màu", rating: 4.9, favorites: 32, image: "/che-ba-mau.jpg" },
  ]

  const achievements = [
    { name: "Đầu bếp mới", description: "Tạo công thức đầu tiên", earned: true },
    { name: "Người được yêu thích", description: "Nhận 50 lượt yêu thích", earned: true },
    { name: "Chuyên gia", description: "Tạo 20 công thức", earned: true },
    { name: "Ngôi sao", description: "Đạt rating 4.5+", earned: true },
    { name: "Cộng đồng", description: "Nhận 100 bình luận", earned: false },
    { name: "Bậc thầy", description: "Tạo 50 công thức", earned: false },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save profile logic here
  }

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
                      <div>
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Địa điểm</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Giới thiệu</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="bg-background border-border"
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} size="sm">
                        <Save className="mr-2 h-4 w-4" />
                        Lưu
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                        <X className="mr-2 h-4 w-4" />
                        Hủy
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
                    <p className="text-sm">{profile.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{profile.location}</span>
                      <span>•</span>
                      <span>{profile.joinDate}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="recipes" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="recipes">Công thức của tôi</TabsTrigger>
            <TabsTrigger value="achievements">Thành tích</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Công thức gần đây</CardTitle>
                <CardDescription>Những công thức bạn đã tạo gần đây</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentRecipes.map((recipe) => (
                  <div key={recipe.id} className="flex items-center space-x-4 p-4 rounded-lg bg-accent/50">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{recipe.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{recipe.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{recipe.favorites}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Huy hiệu & Thành tích</CardTitle>
                <CardDescription>Những thành tích bạn đã đạt được</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.name}
                      className={`p-4 rounded-lg border ${
                        achievement.earned ? "bg-primary/10 border-primary/20" : "bg-muted/50 border-border opacity-60"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.earned && (
                        <Badge variant="secondary" className="mt-2">
                          Đã đạt được
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
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
