import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, Eye, Heart, Star } from "lucide-react"
import AdminLayout from "../layout/admin-layout"
import { getStatusBadge } from "../../components/StatusBadge"

// Mock data
const recipes = [
  {
    id: 1,
    name: "Phở Bò Truyền Thống",
    category: "Món mặn",
    status: "trending",
    likes: 2341,
    favorites: 1876,
    views: 15678,
    createdAt: "2024-01-15",
    author: "Chef Minh",
  },
  {
    id: 2,
    name: "Bánh Mì Thịt Nướng",
    category: "Món mặn",
    status: "popular",
    likes: 1987,
    favorites: 1543,
    views: 12456,
    createdAt: "2024-01-12",
    author: "Nguyễn Văn A",
  },
  {
    id: 3,
    name: "Chè Ba Màu",
    category: "Món ngọt",
    status: "new",
    likes: 1298,
    favorites: 987,
    views: 7654,
    createdAt: "2024-01-20",
    author: "Trần Thị B",
  },
  {
    id: 4,
    name: "Cà Phê Sữa Đá",
    category: "Đồ uống",
    status: "popular",
    likes: 2156,
    favorites: 1765,
    views: 11234,
    createdAt: "2024-01-10",
    author: "Lê Văn C",
  },
  {
    id: 5,
    name: "Gỏi Cuốn Tôm Thịt",
    category: "Món chay",
    status: "trending",
    likes: 1654,
    favorites: 1234,
    views: 9876,
    createdAt: "2024-01-18",
    author: "Phạm Thị D",
  },
]

const categories = ["Tất cả", "Món mặn", "Món ngọt", "Đồ uống", "Món chay"]
const statuses = ["Tất cả", "trending", "popular", "new"]

export default function RecipeAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedStatus, setSelectedStatus] = useState("Tất cả")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tất cả" || recipe.category === selectedCategory
    const matchesStatus = selectedStatus === "Tất cả" || recipe.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })


  return (
    <AdminLayout>
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-balance">Quản lý công thức</h1>
                <p className="text-muted-foreground">Quản lý tất cả công thức nấu ăn trong hệ thống</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm công thức
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                <DialogTitle>Thêm công thức mới</DialogTitle>
                <DialogDescription>Tạo công thức mới hoặc duyệt công thức từ người dùng</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Tên món
                    </Label>
                    <Input id="name" placeholder="Nhập tên món ăn" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                    Danh mục
                    </Label>
                    <Select>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mon-man">Món mặn</SelectItem>
                        <SelectItem value="mon-ngot">Món ngọt</SelectItem>
                        <SelectItem value="do-uong">Đồ uống</SelectItem>
                        <SelectItem value="mon-chay">Món chay</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                    Mô tả
                    </Label>
                    <Textarea id="description" placeholder="Mô tả ngắn về món ăn" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ingredients" className="text-right">
                    Nguyên liệu
                    </Label>
                    <Textarea id="ingredients" placeholder="Danh sách nguyên liệu" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="instructions" className="text-right">
                    Cách làm
                    </Label>
                    <Textarea id="instructions" placeholder="Hướng dẫn từng bước" className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                <Button type="submit">Lưu công thức</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng công thức</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{recipes.length}</div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trending</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chart-1">
                {recipes.filter((r) => r.status === "trending").length}
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Popular</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chart-2">
                {recipes.filter((r) => r.status === "popular").length}
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mới</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chart-3">{recipes.filter((r) => r.status === "new").length}</div>
            </CardContent>
            </Card>
        </div>

        {/* Filters */}
        <Card>
            <CardHeader>
            <CardTitle className="text-lg">Bộ lọc và tìm kiếm</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Tìm kiếm công thức..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                        {category}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                    {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                        {status}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </CardContent>
        </Card>

        {/* Recipes Table */}
        <Card>
            <CardHeader>
            <CardTitle>Danh sách công thức</CardTitle>
            <CardDescription>
                Hiển thị {filteredRecipes.length} trong tổng số {recipes.length} công thức
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Tên món</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-center">Lượt thích</TableHead>
                    <TableHead className="text-center">Yêu thích</TableHead>
                    <TableHead className="text-center">Lượt xem</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredRecipes.map((recipe) => (
                    <TableRow key={recipe.id}>
                    <TableCell className="font-medium">{recipe.name}</TableCell>
                    <TableCell>{recipe.category}</TableCell>
                    <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        {recipe.likes.toLocaleString()}
                        </div>
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {recipe.favorites.toLocaleString()}
                        </div>
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                        <Eye className="h-4 w-4 text-blue-500" />
                        {recipe.views.toLocaleString()}
                        </div>
                    </TableCell>
                    <TableCell>{recipe.author}</TableCell>
                    <TableCell>{new Date(recipe.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        </div>
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
