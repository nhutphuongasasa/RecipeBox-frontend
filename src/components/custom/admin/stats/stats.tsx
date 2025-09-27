"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
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
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Eye, Heart, Download } from "lucide-react"
import AdminLayout from "../layout/admin-layout"

// Mock data
const topRecipesData = [
  { name: "Phở Bò Truyền Thống", likes: 2341, views: 15678, comments: 456 },
  { name: "Bánh Mì Thịt Nướng", likes: 1987, views: 12456, comments: 389 },
  { name: "Bún Bò Huế", likes: 1654, views: 9876, comments: 234 },
  { name: "Cơm Tấm Sài Gòn", likes: 1432, views: 8765, comments: 198 },
  { name: "Chè Ba Màu", likes: 1298, views: 7654, comments: 167 },
]

const categoryDistribution = [
  { name: "Món mặn", value: 45, count: 456, color: "var(--color-chart-1)" },
  { name: "Món ngọt", value: 25, count: 234, color: "var(--color-chart-2)" },
  { name: "Đồ uống", value: 20, count: 189, color: "var(--color-chart-3)" },
  { name: "Món chay", value: 10, count: 123, color: "var(--color-chart-4)" },
]

const viewsOverTime = [
  { date: "01/01", views: 8400, users: 1200 },
  { date: "02/01", views: 9200, users: 1350 },
  { date: "03/01", views: 7800, users: 1100 },
  { date: "04/01", views: 11200, users: 1600 },
  { date: "05/01", views: 13400, users: 1850 },
  { date: "06/01", views: 15600, users: 2100 },
  { date: "07/01", views: 12800, users: 1750 },
  { date: "08/01", views: 14200, users: 1950 },
  { date: "09/01", views: 16800, users: 2300 },
  { date: "10/01", views: 18900, users: 2600 },
  { date: "11/01", views: 17200, users: 2400 },
  { date: "12/01", views: 19500, users: 2700 },
  { date: "13/01", views: 21300, users: 2950 },
  { date: "14/01", views: 20100, users: 2800 },
  { date: "15/01", views: 22800, users: 3150 },
]

const statusComparison = [
  { status: "Trending", count: 45, percentage: 15 },
  { status: "Popular", count: 123, percentage: 41 },
  { status: "New", count: 89, percentage: 30 },
  { status: "Draft", count: 42, percentage: 14 },
]

const userEngagement = [
  { metric: "Lượt thích trung bình", value: 1847, change: "+12%" },
  { metric: "Bình luận trung bình", value: 234, change: "+8%" },
  { metric: "Lượt chia sẻ", value: 456, change: "+23%" },
  { metric: "Thời gian xem trung bình", value: "3m 24s", change: "+15%" },
]

const monthlyGrowth = [
  { month: "T1", recipes: 45, users: 234 },
  { month: "T2", recipes: 52, users: 289 },
  { month: "T3", recipes: 48, users: 312 },
  { month: "T4", recipes: 67, users: 398 },
  { month: "T5", recipes: 73, users: 445 },
  { month: "T6", recipes: 89, users: 523 },
]

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const exportData = () => {
    console.log("Exporting statistics data...")
  }

  return (
    <AdminLayout>

    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Thống kê & Phân tích</h1>
          <p className="text-muted-foreground">Báo cáo chi tiết về hiệu suất hệ thống</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 ngày qua</SelectItem>
              <SelectItem value="30d">30 ngày qua</SelectItem>
              <SelectItem value="90d">3 tháng qua</SelectItem>
              <SelectItem value="1y">1 năm qua</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {userEngagement.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-chart-1">{metric.change}</span> so với kỳ trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top 5 Recipes Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Top 5 công thức được yêu thích nhất
          </CardTitle>
          <CardDescription>Xếp hạng theo số lượt thích và lượt xem</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              likes: {
                label: "Lượt thích",
                color: "var(--color-chart-1)",
              },
              views: {
                label: "Lượt xem",
                color: "var(--color-chart-2)",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRecipesData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="likes" fill="var(--color-chart-1)" name="Lượt thích" />
                <Bar dataKey="views" fill="var(--color-chart-2)" name="Lượt xem" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố công thức theo danh mục</CardTitle>
            <CardDescription>Tỷ lệ phần trăm các loại công thức</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                category: {
                  label: "Danh mục",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.count} công thức ({data.value}%)
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Status Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>So sánh trạng thái công thức</CardTitle>
            <CardDescription>Phân bố theo Trending/Popular/New</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Số lượng",
                  color: "var(--color-chart-3)",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="status" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-chart-3)" name="Số lượng" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Views Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-500" />
            Lượt xem theo thời gian
          </CardTitle>
          <CardDescription>Xu hướng lượt xem và người dùng hoạt động trong 15 ngày qua</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              views: {
                label: "Lượt xem",
                color: "var(--color-chart-1)",
              },
              users: {
                label: "Người dùng",
                color: "var(--color-chart-2)",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsOverTime} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="var(--color-chart-1)"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  name="Lượt xem"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-chart-2)"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Người dùng"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Tăng trưởng hàng tháng
          </CardTitle>
          <CardDescription>Số lượng công thức và người dùng mới theo tháng</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              recipes: {
                label: "Công thức mới",
                color: "var(--color-chart-4)",
              },
              users: {
                label: "Người dùng mới",
                color: "var(--color-chart-5)",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="recipes"
                  stroke="var(--color-chart-4)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-chart-4)", strokeWidth: 2, r: 4 }}
                  name="Công thức mới"
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-chart-5)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-chart-5)", strokeWidth: 2, r: 4 }}
                  name="Người dùng mới"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hiệu suất tổng thể</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tỷ lệ tương tác</span>
              <Badge className="bg-green-500/20 text-green-600 border-green-500/30">+18.5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Thời gian ở lại</span>
              <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">+12.3%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tỷ lệ quay lại</span>
              <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">+25.7%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Xu hướng nội dung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Món Việt truyền thống</span>
              <Badge variant="default">Trending</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Healthy food</span>
              <Badge variant="secondary">Rising</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Món nướng BBQ</span>
              <Badge variant="outline">Stable</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dự báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Người dùng tháng tới</span>
              <span className="text-sm font-medium">~3,200</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Công thức mới</span>
              <span className="text-sm font-medium">~95</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Lượt xem dự kiến</span>
              <span className="text-sm font-medium">~850K</span>
            </div>
          </CardContent>
        </Card>
      </div>
        </div>

    </AdminLayout>
  )
}
