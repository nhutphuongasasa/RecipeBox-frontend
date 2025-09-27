"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Users, Eye, TrendingUp, Heart, Star, Clock } from "lucide-react"
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import AdminLayout from "../layout/admin-layout"

// Mock data
const statsData = {
  totalRecipes: 1247,
  totalUsers: 8934,
  todayViews: 12543,
  weekViews: 89234,
  trendingRecipe: "Phở Bò Truyền Thống",
}

const viewsData = [
  { day: "T2", views: 8400 },
  { day: "T3", views: 9200 },
  { day: "T4", views: 7800 },
  { day: "T5", views: 11200 },
  { day: "T6", views: 13400 },
  { day: "T7", views: 15600 },
  { day: "CN", views: 12800 },
]

const categoryData = [
  { name: "Món mặn", value: 45, color: "var(--color-chart-1)" },
  { name: "Món ngọt", value: 25, color: "var(--color-chart-2)" },
  { name: "Đồ uống", value: 20, color: "var(--color-chart-3)" },
  { name: "Món chay", value: 10, color: "var(--color-chart-4)" },
]

const topRecipes = [
  { name: "Phở Bò Truyền Thống", likes: 2341, views: 15678, status: "trending" },
  { name: "Bánh Mì Thịt Nướng", likes: 1987, views: 12456, status: "popular" },
  { name: "Bún Bò Huế", likes: 1654, views: 9876, status: "trending" },
  { name: "Cơm Tấm Sài Gòn", likes: 1432, views: 8765, status: "popular" },
  { name: "Chè Ba Màu", likes: 1298, views: 7654, status: "new" },
]

const recentActivity = [
  { user: "Nguyễn Văn A", action: "đã thêm công thức", recipe: "Bánh Xèo Miền Tây", time: "5 phút trước" },
  { user: "Trần Thị B", action: "đã bình luận", recipe: "Phở Gà Hà Nội", time: "12 phút trước" },
  { user: "Lê Văn C", action: "đã thích", recipe: "Bún Riêu Cua", time: "18 phút trước" },
  { user: "Phạm Thị D", action: "đã lưu", recipe: "Cháo Lòng", time: "25 phút trước" },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
          <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
        <p className="text-muted-foreground">Tổng quan hệ thống quản lý công thức nấu ăn</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng công thức</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalRecipes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-1">+12%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+8%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt xem hôm nay</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.todayViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-3">+15%</span> so với hôm qua
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt xem tuần này</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.weekViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-4">+23%</span> so với tuần trước
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lượt xem theo ngày</CardTitle>
            <CardDescription>7 ngày gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Lượt xem",
                  color: "var(--color-chart-1)",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-1)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo danh mục</CardTitle>
            <CardDescription>Tỷ lệ công thức theo loại</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                category: {
                  label: "Danh mục",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Recipes and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 công thức phổ biến</CardTitle>
            <CardDescription>Được yêu thích nhất tuần này</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRecipes.map((recipe, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{recipe.name}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {recipe.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {recipe.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      recipe.status === "trending" ? "default" : recipe.status === "popular" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {recipe.status === "trending" ? "Trending" : recipe.status === "popular" ? "Popular" : "New"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Cập nhật mới nhất từ người dùng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.recipe}</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Recipe Highlight */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            Công thức trending nhất
          </CardTitle>
          <CardDescription>Được quan tâm nhiều nhất trong tuần</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{statsData.trendingRecipe}</h3>
              <p className="text-muted-foreground">Công thức truyền thống được yêu thích</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-1">2.3K</div>
                <div className="text-muted-foreground">Lượt thích</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-2">15.6K</div>
                <div className="text-muted-foreground">Lượt xem</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-3">456</div>
                <div className="text-muted-foreground">Bình luận</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  )
}
