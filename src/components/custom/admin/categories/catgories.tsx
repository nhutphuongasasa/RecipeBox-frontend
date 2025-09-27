import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, FolderOpen, ChefHat } from "lucide-react"
import AdminLayout from "../layout/admin-layout"

// Mock data
const categories = [
  {
    id: 1,
    name: "Món mặn",
    description: "Các món ăn chính trong bữa cơm như cơm, phở, bún, mì...",
    recipeCount: 456,
    color: "#3b82f6",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-20",
  },
  {
    id: 2,
    name: "Món ngọt",
    description: "Các loại bánh kẹo, chè, kem và đồ tráng miệng",
    recipeCount: 234,
    color: "#ec4899",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: 3,
    name: "Đồ uống",
    description: "Nước uống, sinh tố, trà, cà phê và các loại cocktail",
    recipeCount: 189,
    color: "#10b981",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: 4,
    name: "Món chay",
    description: "Các món ăn chay, thuần chay và healthy food",
    recipeCount: 123,
    color: "#f59e0b",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-22",
  },
  {
    id: 5,
    name: "Món nướng",
    description: "Các món nướng BBQ, nướng than, nướng lò",
    recipeCount: 87,
    color: "#ef4444",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-25",
  },
]

export default function CategoriesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
  })

  const totalRecipes = categories.reduce((sum, cat) => sum + cat.recipeCount, 0)

  const handleAddCategory = () => {
    console.log("Add category:", formData)
    setIsAddDialogOpen(false)
    setFormData({ name: "", description: "", color: "#3b82f6" })
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateCategory = () => {
    console.log("Update category:", editingCategory.id, formData)
    setIsEditDialogOpen(false)
    setEditingCategory(null)
    setFormData({ name: "", description: "", color: "#3b82f6" })
  }

  const handleDeleteCategory = (categoryId: number) => {
    console.log("Delete category:", categoryId)
  }

  return (
    <AdminLayout>
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-balance">Quản lý danh mục</h1>
                <p className="text-muted-foreground">Quản lý các danh mục công thức nấu ăn</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm danh mục
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                <DialogTitle>Thêm danh mục mới</DialogTitle>
                <DialogDescription>Tạo danh mục mới để phân loại công thức nấu ăn</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Tên danh mục
                    </Label>
                    <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên danh mục"
                    className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                    Mô tả
                    </Label>
                    <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả về danh mục"
                    className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="color" className="text-right">
                    Màu sắc
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                    <Input
                        id="color"
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-16 h-10"
                    />
                    <Input
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        placeholder="#3b82f6"
                        className="flex-1"
                    />
                    </div>
                </div>
                </div>
                <DialogFooter>
                <Button type="submit" onClick={handleAddCategory}>
                    Thêm danh mục
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng danh mục</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{categories.length}</div>
                <p className="text-xs text-muted-foreground">Đang hoạt động</p>
            </CardContent>
            </Card>

            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng công thức</CardTitle>
                <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalRecipes.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Trong tất cả danh mục</p>
            </CardContent>
            </Card>

            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Danh mục phổ biến</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chart-1">
                {categories.sort((a, b) => b.recipeCount - a.recipeCount)[0]?.name}
                </div>
                <p className="text-xs text-muted-foreground">
                {categories.sort((a, b) => b.recipeCount - a.recipeCount)[0]?.recipeCount} công thức
                </p>
            </CardContent>
            </Card>

            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trung bình</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{Math.round(totalRecipes / categories.length)}</div>
                <p className="text-xs text-muted-foreground">Công thức/danh mục</p>
            </CardContent>
            </Card>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
            <Card key={category.id} className="relative">
                <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{category.recipeCount} công thức</Badge>
                </div>
                <CardDescription className="text-pretty">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Cập nhật: {new Date(category.updatedAt).toLocaleDateString("vi-VN")}</span>
                    <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Xóa danh mục</AlertDialogTitle>
                            <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa danh mục "{category.name}"? Hành động này sẽ ảnh hưởng đến{" "}
                            {category.recipeCount} công thức trong danh mục này.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                            onClick={() => handleDeleteCategory(category.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                            Xóa
                            </AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>

        {/* Categories Table */}
        <Card>
            <CardHeader>
            <CardTitle>Chi tiết danh mục</CardTitle>
            <CardDescription>Thông tin chi tiết về tất cả danh mục</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead className="text-center">Số công thức</TableHead>
                    <TableHead className="text-center">Tỷ lệ</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Cập nhật cuối</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.name}</span>
                        </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                        <p className="text-sm text-muted-foreground truncate">{category.description}</p>
                    </TableCell>
                    <TableCell className="text-center">
                        <Badge variant="outline">{category.recipeCount}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                        {((category.recipeCount / totalRecipes) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>{new Date(category.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell>{new Date(category.updatedAt).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Xóa danh mục</AlertDialogTitle>
                                <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa danh mục "{category.name}"? Hành động này sẽ ảnh hưởng đến{" "}
                                {category.recipeCount} công thức trong danh mục này.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                onClick={() => handleDeleteCategory(category.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                Xóa
                                </AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                <DialogDescription>Cập nhật thông tin danh mục</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                    Tên danh mục
                </Label>
                <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên danh mục"
                    className="col-span-3"
                />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                    Mô tả
                </Label>
                <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả về danh mục"
                    className="col-span-3"
                />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-color" className="text-right">
                    Màu sắc
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                    <Input
                    id="edit-color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-16 h-10"
                    />
                    <Input
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#3b82f6"
                    className="flex-1"
                    />
                </div>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={handleUpdateCategory}>
                Cập nhật
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    </AdminLayout>
  )
}
