import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Upload, ArrowLeft, Camera, X, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "@/layout/main-layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User, Recipe } from "@/interface";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateRecipePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>(); // Get recipe ID from URL
  const currentUser = queryClient.getQueryData<User>(["user"]);
  const [currentTab, setCurrentTab] = useState("basic");
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    name: "",
    image_url: "",
    description: "",
    category: "",
    ingredient: [{ ingredientName: "", quantity: "" }],
    step: [{ stepTitle: "", content: "" }],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Recipe categories
  const recipeCategories = [
    { value: "main", label: "Món chính" },
    { value: "appetizer", label: "Khai vị" },
    { value: "dessert", label: "Tráng miệng" },
    { value: "breakfast", label: "Ăn sáng" },
    { value: "soup", label: "Canh/Súp" },
    { value: "snack", label: "Ăn vặt" },
    { value: "drink", label: "Đồ uống" },
  ];

  // Fetch recipe data
  const { data: recipeData, isLoading, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      if (!id) throw new Error("Recipe ID is missing");
      const response = await axios.get(`http://localhost:3000/api/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      return response.data as Recipe;
    },
    enabled: !!id && !!currentUser?.token,
  });

  // Pre-fill form with fetched recipe data
  useEffect(() => {
    if (recipeData) {
      setRecipe({
        name: recipeData.name,
        image_url: recipeData.image_url,
        description: recipeData.description,
        category: recipeData.category,
        ingredient: recipeData.ingredient.length
          ? recipeData.ingredient
          : [{ ingredientName: "", quantity: "" }],
        step: recipeData.step.length
          ? recipeData.step
          : [{ stepTitle: "", content: "" }],
      });
    }
  }, [recipeData]);

  // Validate form fields
  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!recipe.name?.trim()) {
      newErrors.name = "Tên công thức là bắt buộc";
    }
    if (!recipe.category) {
      newErrors.category = "Vui lòng chọn danh mục";
    }
    if (!recipe.ingredient?.some((ing) => ing.ingredientName.trim() && ing.quantity.trim())) {
      newErrors.ingredient = "Cần ít nhất một nguyên liệu hợp lệ";
    }
    if (!recipe.step?.some((step) => step.stepTitle.trim() && step.content.trim())) {
      newErrors.step = "Cần ít nhất một bước hướng dẫn hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [recipe]);

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "recipe_upload");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dau70jaez/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setRecipe((prev) => ({ ...prev, image_url: data.secure_url }));
        toast.success("Upload ảnh thành công!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Upload ảnh thất bại!");
    }
  };

  // Reset image
  const resetImage = () => {
    setRecipe((prev) => ({ ...prev, image_url: "" }));
    toast.success("Đã xóa hình ảnh!");
  };

  // Centralized field update
  const updateField = useCallback((field: keyof typeof recipe, value: any) => {
    setRecipe((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  // Ingredient handling
  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredient: [...(prev.ingredient || []), { ingredientName: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredient: (prev.ingredient || []).filter((_, i) => i !== index),
    }));
    setErrors((prev) => ({ ...prev, ingredient: "" }));
  };

  const updateIngredient = (index: number, field: "ingredientName" | "quantity", value: string) => {
    setRecipe((prev) => ({
      ...prev,
      ingredient: (prev.ingredient || []).map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      ),
    }));
    setErrors((prev) => ({ ...prev, ingredient: "" }));
  };

  // Step handling
  const addStep = () => {
    setRecipe((prev) => ({
      ...prev,
      step: [...(prev.step || []), { stepTitle: "", content: "" }],
    }));
  };

  const removeStep = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      step: (prev.step || []).filter((_, i) => i !== index),
    }));
    setErrors((prev) => ({ ...prev, step: "" }));
  };

  const updateStep = (index: number, field: "stepTitle" | "content", value: string) => {
    setRecipe((prev) => ({
      ...prev,
      step: (prev.step || []).map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      ),
    }));
    setErrors((prev) => ({ ...prev, step: "" }));
  };

  // API call to update recipe
  const updateRecipe = async () => {
    if (!currentUser?.token) {
      throw new Error("User not authenticated");
    }
    if (!id) {
      throw new Error("Recipe ID is missing");
    }
    return axios.put(
      `http://localhost:3000/api/recipe/${id}`,
      { ...recipe },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
  };

  const mutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: () => {
      toast.success("Cập nhật công thức thành công!");
      queryClient.invalidateQueries({ queryKey: ["recipes", id] });
      navigate("/recipes");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Cập nhật công thức thất bại!");
    },
  });

  const handleSubmit = () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập trước khi cập nhật công thức!");
      return;
    }
    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    mutation.mutate();
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-4">Đang tải công thức...</div>
      </MainLayout>
    );
  }

  if (error || !recipeData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-4 text-red-500">
          Không thể tải công thức. Vui lòng thử lại sau!
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/recipes" aria-label="Quay lại danh sách công thức">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-balance">Cập nhật công thức</h1>
              <p className="text-muted-foreground mt-2">Chỉnh sửa công thức nấu ăn của bạn</p>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90"
            disabled={mutation.isPending}
            aria-label="Cập nhật công thức"
          >
            {mutation.isPending ? "Đang cập nhật..." : "Cập nhật công thức"}
          </Button>
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
                        onChange={(e) => updateField("name", e.target.value)}
                        className={`bg-background border-border ${errors.name ? "border-red-500" : ""}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-sm">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Danh mục *</Label>
                      <Select
                        value={recipe.category}
                        onValueChange={(value) => updateField("category", value)}
                      >
                        <SelectTrigger
                          className={`bg-background border-border ${errors.category ? "border-red-500" : ""}`}
                          aria-invalid={!!errors.category}
                        >
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
                      {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả ngắn gọn về công thức..."
                      value={recipe.description}
                      onChange={(e) => updateField("description", e.target.value)}
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
                  <CardDescription>Thêm hoặc thay đổi hình ảnh cho công thức (tối đa 5MB)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center relative">
                    {!recipe.image_url ? (
                      <>
                        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">Kéo thả hình ảnh hoặc click để chọn</p>
                        <input
                          type="file"
                          accept="image/*"
                          id="image-upload"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0]);
                            }
                          }}
                        />
                        <label htmlFor="image-upload">
                          <Button variant="outline" asChild>
                            <span>
                              <Upload className="mr-2 h-4 w-4" />
                              Chọn hình ảnh
                            </span>
                          </Button>
                        </label>
                      </>
                    ) : (
                      <div className="relative">
                        <img
                          src={recipe.image_url}
                          alt="Recipe preview"
                          className="mt-4 mx-auto w-48 h-48 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={resetImage}
                          aria-label="Xóa hình ảnh"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
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
                {errors.ingredient && (
                  <p className="text-red-500 text-sm">{errors.ingredient}</p>
                )}
                {recipe.ingredient?.map((ingredient, index) => (
                  <div key={index} className="grid gap-4 md:grid-cols-12 items-end">
                    <div className="md:col-span-5 space-y-2">
                      <Label htmlFor={`ingredient-name-${index}`}>Tên nguyên liệu</Label>
                      <Input
                        id={`ingredient-name-${index}`}
                        placeholder="VD: Thịt bò"
                        value={ingredient.ingredientName}
                        onChange={(e) => updateIngredient(index, "ingredientName", e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="md:col-span-3 space-y-2">
                      <Label htmlFor={`ingredient-quantity-${index}`}>Số lượng</Label>
                      <Input
                        id={`ingredient-quantity-${index}`}
                        placeholder="VD: 500g"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        disabled={recipe.ingredient?.length === 1}
                        aria-label={`Xóa nguyên liệu ${index + 1}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={addIngredient}
                  variant="outline"
                  className="w-full bg-transparent"
                  aria-label="Thêm nguyên liệu"
                >
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
                {errors.step && <p className="text-red-500 text-sm">{errors.step}</p>}
                {recipe.step?.map((step, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Bước {index + 1}</h3>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeStep(index)}
                        disabled={recipe.step?.length === 1}
                        aria-label={`Xóa bước ${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
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
                <Button
                  onClick={addStep}
                  variant="outline"
                  className="w-full bg-transparent"
                  aria-label="Thêm bước"
                >
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
              const tabs = ["basic", "ingredients", "instructions"];
              const currentIndex = tabs.indexOf(currentTab);
              if (currentIndex > 0) {
                setCurrentTab(tabs[currentIndex - 1]);
              }
            }}
            disabled={currentTab === "basic" || mutation.isPending}
            aria-label="Quay lại bước trước"
          >
            Bước trước
          </Button>
          <Button
            onClick={() => {
              const tabs = ["basic", "ingredients", "instructions"];
              const currentIndex = tabs.indexOf(currentTab);
              if (currentIndex < tabs.length - 1) {
                setCurrentTab(tabs[currentIndex + 1]);
              } else {
                handleSubmit();
              }
            }}
            disabled={mutation.isPending}
            aria-label={currentTab === "instructions" ? "Cập nhật công thức" : "Tiếp tục bước tiếp theo"}
          >
            {currentTab === "instructions" ? "Cập nhật công thức" : "Bước tiếp"}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}