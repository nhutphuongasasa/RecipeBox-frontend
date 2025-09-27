"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Shield, Ban, Trash2, UserCheck, Users, ChefHat, MessageSquare } from "lucide-react"
import { MainLayout } from "@/layout/main-layout"
import AdminLayout from "../layout/admin-layout"

// Mock data
const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "user",
    recipesCount: 12,
    commentsCount: 45,
    joinedAt: "2024-01-15",
    status: "active",
    lastActive: "2024-01-25",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "admin",
    recipesCount: 28,
    commentsCount: 89,
    joinedAt: "2023-12-10",
    status: "active",
    lastActive: "2024-01-25",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "user",
    recipesCount: 7,
    commentsCount: 23,
    joinedAt: "2024-01-20",
    status: "blocked",
    lastActive: "2024-01-22",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "user",
    recipesCount: 15,
    commentsCount: 67,
    joinedAt: "2024-01-08",
    status: "active",
    lastActive: "2024-01-24",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "user",
    recipesCount: 3,
    commentsCount: 12,
    joinedAt: "2024-01-22",
    status: "active",
    lastActive: "2024-01-25",
  },
]

export default function UserAdmin() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeUsers = users.filter((user) => user.status === "active").length
  const blockedUsers = users.filter((user) => user.status === "blocked").length
  const adminUsers = users.filter((user) => user.role === "admin").length

  const getRoleBadge = (role: string) => {
    return role === "admin" ? (
      <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">
        <Shield className="mr-1 h-3 w-3" />
        Admin
      </Badge>
    ) : (
      <Badge variant="secondary">User</Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Hoạt động</Badge>
    ) : (
      <Badge className="bg-red-500/20 text-red-600 border-red-500/30">Bị chặn</Badge>
    )
  }

  const handleBlockUser = (userId: number) => {
    console.log("Block user:", userId)
  }

  const handleDeleteUser = (userId: number) => {
    console.log("Delete user:", userId)
  }

  const handlePromoteUser = (userId: number) => {
    console.log("Promote user to admin:", userId)
  }

  return (
    <AdminLayout>
        <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Quản lý người dùng</h1>
        <p className="text-muted-foreground">Quản lý tất cả người dùng trong hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+12%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">{((activeUsers / users.length) * 100).toFixed(1)}% tổng số</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bị chặn</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{blockedUsers}</div>
            <p className="text-xs text-muted-foreground">{((blockedUsers / users.length) * 100).toFixed(1)}% tổng số</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quản trị viên</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{adminUsers}</div>
            <p className="text-xs text-muted-foreground">{((adminUsers / users.length) * 100).toFixed(1)}% tổng số</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tìm kiếm người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>
            Hiển thị {filteredUsers.length} trong tổng số {users.length} người dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Công thức</TableHead>
                <TableHead className="text-center">Bình luận</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Hoạt động cuối</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <ChefHat className="h-4 w-4 text-muted-foreground" />
                      {user.recipesCount}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      {user.commentsCount}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(user.joinedAt).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell>{new Date(user.lastActive).toLocaleDateString("vi-VN")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {user.role !== "admin" && (
                          <DropdownMenuItem onClick={() => handlePromoteUser(user.id)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Thăng cấp Admin
                          </DropdownMenuItem>
                        )}

                        {user.status === "active" ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Ban className="mr-2 h-4 w-4" />
                                Chặn người dùng
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Chặn người dùng</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bạn có chắc chắn muốn chặn người dùng {user.name}? Họ sẽ không thể truy cập vào hệ
                                  thống.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleBlockUser(user.id)}>Chặn</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <DropdownMenuItem onClick={() => handleBlockUser(user.id)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Bỏ chặn
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa người dùng
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xóa người dùng</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa người dùng {user.name}? Hành động này không thể hoàn tác và sẽ
                                xóa tất cả dữ liệu của họ.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        </div>
    </AdminLayout>
  )
}
