import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Grid3X3, List } from "lucide-react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/layout/main-layout";
import { RecipeListItem } from "../components/RecipeListItem";
import { RecipeCard } from "../components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Recipe } from "@/interface";

export default function RecipesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;

  const responseRecipes = async () => {
    const res = await axios.get("http://localhost:3000/api/recipe", {
      params: { page: currentPage, limit: pageSize },
    });
    console.log("responseRecipes data:", res.data);
    return res.data;
  };

  const responseRecipesByCategory = async () => {
    const res = await axios.get(`http://localhost:3000/api/recipe/category/${selectedCategory}`, {
      params: { page: currentPage, limit: pageSize },
    });
    console.log("responseRecipesByCategory data:", res.data);
    return res.data;
  };

  const responseRecipesBySearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/recipe/name/${searchQuery}`);
      const data = Array.isArray(res.data) ? { recipes: res.data, totalCount: res.data.length } : res.data;
      console.log("responseRecipesBySearch data:", data);
      return data;
    } catch (error) {
      console.error("Error in responseRecipesBySearch:", error);
      throw error;
    }
  };

  function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: recipesData, isLoading, error } = useQuery({
    queryKey: ["recipes", currentPage, selectedCategory, debouncedSearchQuery],
    queryFn: () => {
      if (debouncedSearchQuery) return responseRecipesBySearch();
      else if (selectedCategory !== "all") return responseRecipesByCategory();
      else return responseRecipes();
    },
    staleTime: 1000 * 60,
  });

  console.log("recipesData:", recipesData);

  const recipes = recipesData?.recipes ?? [];
  const totalCount = recipesData?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "main", label: "Món chính" },
    { value: "appetizer", label: "Khai vị" },
    { value: "dessert", label: "Tráng miệng" },
    { value: "breakfast", label: "Ăn sáng" },
    { value: "soup", label: "Canh/Súp" },
    { value: "drink", label: "Đồ uống" },
  ];

  const getVisiblePages = () => {
    const delta = 1;
    const pages: number[] = [];
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (end - start < 2) {
      if (currentPage <= delta) {
        end = Math.min(totalPages, start + 2);
      } else {
        start = Math.max(1, end - 2);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Công thức nấu ăn</h1>
            <p className="text-muted-foreground mt-2">Khám phá và chia sẻ những công thức tuyệt vời</p>
          </div>
          <Link to="/recipes/create">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Tạo công thức mới
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:cursor-pointer" />
                  <Input
                    placeholder="Tìm kiếm công thức..."
                    value={searchQuery}
                    onChange={(e) => {
                      console.log("searchQuery:", e.target.value);
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-40 bg-background border-border">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Hiển thị {recipes.length} trong tổng số {totalCount} công thức
          </p>
        </div>

        {/* Recipe Grid/List */}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : recipes.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recipes.map((recipe: Recipe) => (
                <RecipeListItem key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )
        ) : (
          <p>Không tìm thấy công thức nào.</p>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Trước
          </Button>

          {getVisiblePages().map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Sau
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}