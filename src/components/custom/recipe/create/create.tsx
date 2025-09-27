
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Minus, Upload, Save, Eye, ArrowLeft, Camera, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { MainLayout } from "@/layout/main-layout"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { User } from "@/interface"
import toast from "react-hot-toast"
import axios from "axios"

export default function CreateRecipePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<User>(['user'])
  const [currentTab, setCurrentTab] = useState("basic")
  const [recipe, setRecipe] = useState({
    name: "",
    image_url: "",
    description: "",
    category: "",
    ingredient: [{ ingredientName: "", quantity: ""}],
    step: [{ stepTitle: "", content: "" }],
  })


  const recipeCategories = [
    { value: "main", label: "Món chính" },
    { value: "appetizer", label: "Khai vị" },
    { value: "dessert", label: "Tráng miệng" },
    { value: "breakfast", label: "Ăn sáng" },
    { value: "soup", label: "Canh/Súp" },
    { value: "snack", label: "Ăn vặt" },
    { value: "drink", label: "Đồ uống" },
  ]

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "recipe_upload") 

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dau70jaez/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await res.json()
      console.log(data.secure_url)
      setRecipe({ ...recipe, image_url: data.secure_url }) 
      toast.success("Upload ảnh thành công!")
    } catch (error) {
      console.error(error)
      toast.error("Upload ảnh thất bại!")
    }
  }


  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredient: [...recipe.ingredient, { ingredientName: "", quantity: "" }],
    })
  }

  const removeIngredient = (index: number) => {
    setRecipe({
      ...recipe,
      ingredient: recipe.ingredient.filter((_, i) => i !== index),
    })
  }

  const updateIngredient = (index: number, field: string, value: string) => {
    const updatedIngredients = recipe.ingredient.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient,
    )
    setRecipe({ ...recipe, ingredient: updatedIngredients })
  }

  const addStep = () => {
    setRecipe({
      ...recipe,
      step: [...recipe.step, { stepTitle: "", content: "" }],
    })
  }

  const removeStep = (index: number) => {
    setRecipe({
      ...recipe,
      step: recipe.step.filter((_, i) => i !== index),
    })
  }

  const updateStep = (index: number, field: string, value: string) => {
    const updatedSteps = recipe.step.map((step, i) => (i === index ? { ...step, [field]: value } : step))
    setRecipe({ ...recipe, step: updatedSteps })
  }

  const responseRecipe = async () => axios.post("http://localhost:3000/api/recipe", 
    recipe,
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentUser?.token}`
        }
    }
  )

  const mutation = useMutation({
    mutationFn: responseRecipe,
    onSuccess: () => {
      toast.success("Đăng công thức thành công!")
      queryClient.invalidateQueries({ queryKey: ["recipes"] })
      navigate("/recipes")
    },
    onError: () => {
      toast.error("Đăng công thức thất bại!")
    },
  })

  const handleSubmit = () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập trước khi đăng công thức!")
      return
    }

    mutation.mutate()
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/recipes">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-balance">Tạo công thức mới</h1>
              <p className="text-muted-foreground mt-2">Chia sẻ công thức nấu ăn tuyệt vời của bạn</p>
            </div>
          </div>
          <div>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              Đăng công thức
            </Button>
          </div>
        </div>

        {/* Form */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="ingredients">Nguyên liệu</TabsTrigger>
            <TabsTrigger value="instructions">Cách làm</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="space-y-6">
              {/* Basic Info */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                  <CardDescription>Thông tin chung về công thức</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên công thức *</Label>
                      <Input
                        id="name"
                        placeholder="VD: Phở Bò Hà Nội"
                        value={recipe.name}
                        onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Danh mục *</Label>
                      <Select
                        value={recipe.category}
                        onValueChange={(value) => setRecipe({ ...recipe, category: value })}
                      >
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {recipeCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả ngắn gọn về công thức..."
                      value={recipe.description}
                      onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                      className="bg-background border-border"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Hình ảnh</CardTitle>
                  <CardDescription>Thêm hình ảnh cho công thức</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center relative">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Kéo thả hình ảnh hoặc click để chọn</p>

                    {/* Input file ẩn */}
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0])
                        }
                      }}
                    />

                    {/* Nút chọn hình ảnh */}
                    <label htmlFor="image-upload">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Chọn hình ảnh
                        </span>
                      </Button>
                    </label>

                    {/* Hiển thị preview nếu đã upload */}
                    {recipe.image_url && (
                      <img
                        src={recipe.image_url}
                        alt="Recipe"
                        className="mt-4 mx-auto w-48 h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="ingredients">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Nguyên liệu</CardTitle>
                <CardDescription>Danh sách nguyên liệu cần thiết</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipe.ingredient.map((ingredient, index) => (
                  <div key={index} className="grid gap-4 md:grid-cols-12 items-end ">
                    {/* ten nguyen lieu */}
                    <div className="md:col-span-5 ">
                      <Label htmlFor={`ingredient-name-${index}`}>Tên nguyên liệu</Label>
                      <Input
                        id={`ingredient-name-${index}`}
                        placeholder="VD: Thịt bò"
                        value={ingredient.ingredientName}
                        onChange={(e) => updateIngredient(index, "ingredientName", e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                    {/* so luong */}
                    <div className="md:col-span-3">
                      <Label htmlFor={`ingredient-quantity-${index}`}>Số lượng</Label>
                      <Input
                        id={`ingredient-quantity-${index}`}
                        placeholder="VD: 500g"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>

                    {/* nut them nguyen lieu */}
                    <div className="md:col-span-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        disabled={recipe.ingredient.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button onClick={addIngredient} variant="outline" className="w-full bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm nguyên liệu
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Cách làm</CardTitle>
                <CardDescription>Hướng dẫn từng bước chi tiết</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {recipe.step.map((step, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                    {/* buoc */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Bước {index + 1}</h3>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeStep(index)}
                        disabled={recipe.step.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* tieu de buoc */}
                    <div className="grid gap-4 md:grid-cols-4 ">
                      {/* tieu de */}
                      <div className="space-y-2 md:col-span-3">
                        <Label htmlFor={`step-title-${index}`}>Tiêu đề bước</Label>
                        <Input
                          id={`step-title-${index}`}
                          placeholder="VD: Chuẩn bị nguyên liệu"
                          value={step.stepTitle}
                          onChange={(e) => updateStep(index, "stepTitle", e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`step-content-${index}`}>Nội dung</Label>
                      <Textarea
                        id={`step-content-${index}`}
                        placeholder="Mô tả chi tiết cách thực hiện bước này..."
                        value={step.content}
                        onChange={(e) => updateStep(index, "content", e.target.value)}
                        className="bg-background border-border"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={addStep} variant="outline" className="w-full bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm bước
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              const tabs = ["basic", "ingredients", "instructions"]
              const currentIndex = tabs.indexOf(currentTab)
              if (currentIndex > 0) {
                setCurrentTab(tabs[currentIndex - 1])
              }
            }}
            disabled={currentTab === "basic"}
          >
            Bước trước
          </Button>
          <Button
            onClick={() => {
              const tabs = ["basic", "ingredients", "instructions"]
              const currentIndex = tabs.indexOf(currentTab)
              if (currentIndex < tabs.length - 1) {
                setCurrentTab(tabs[currentIndex + 1])
              } else {
                handleSubmit()
              }
            }}
          >
            {currentTab === "instructions" ? "Đăng công thức" : "Bước tiếp"}
            
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
