import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Icon, TrendingDown, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import { MainLayout } from "@/layout/main-layout";
import axios from "axios";
import type { Recipe, User } from "@/interface";
import { useQueryClient } from "@tanstack/react-query";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserFavoriteStatsPage() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<User>(["user"]);
  const [stats, setStats] = useState([
    { title: "Tổng số lượng", value: 0 },
    { title: "Tổng số lượt yêu thích", value: 0 },
    { title: "Món ăn được yêu thích nhất", value: 0 },
  ]);

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

  
  const countFavoriteRecipe = async () => {
    const response = await axios.get("https://recipebox-backend.onrender.com/api/recipe/top", {
      headers: {
        Authorization: `Bearer ${currentUser?.token}`,
      },
    });
    console.log("favoriteRecipes:", response.data);
    return response.data; 
  }

  const {data: favoriteRecipes}  = useQuery({
    queryKey: ["favorite-recipes"],
    queryFn: countFavoriteRecipe,
    enabled: !!currentUser?.token,
  })

  useEffect(() => {
    if (!favoriteRecipes) return; // recipes là dữ liệu từ useQuery

    const totalRecipes = favoriteRecipes.totalRecipe;
    const totalFavorites = favoriteRecipes.totalFavorite;
    const bestRecipe = favoriteRecipes.bestRecipe

    setStats([
      { title: "Tổng số lượng", value: totalRecipes },
      { title: "Tổng số lượt yêu thích", value: totalFavorites },
      { title: "Món ăn được yêu thích nhất", value: bestRecipe },
    ]);
  }, [favoriteRecipes]);

    const categories = [
    { value: "main", name: "Món chính" },
    { value: "appetizer", name: "Khai vị" },
    { value: "dessert", name: "Tráng miệng" },
    { value: "breakfast", name: "Ăn sáng" },
    { value: "soup", name: "Canh/Súp" },
    { value: "drink", name: "Đồ uống" },
    ];

    const { data: categoryData } = useQuery({
    queryKey: ["category-counts"],
    queryFn: async () => {
        const results = await Promise.all(
        categories.map(async (cat) => {
            try {
            const res = await axios.get(`https://recipebox-backend.onrender.com/api/recipe/count/${cat.value}`, {
                headers: { Authorization: `Bearer ${currentUser?.token}` },
            });
            console.log("categoryData:", res.data);
            return {
                ...cat,
                value: res.data ?? 0,
                color: "#A18CD1",
            };
            } catch (err) {
            return {
                ...cat,
                value: 0,
                color: "#A18CD1",
            };
            }
        })
        );
        return results;
    },
    enabled: !!currentUser?.token,
    });




  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1">
            {stats.map((stats) => (
             <Card key={stats.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stats.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.value}</div>
              </CardContent>
            </Card>
            ))}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
        {/* Category Distribution Pie Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Phân bố theo danh mục</CardTitle>
            <CardDescription>Tỷ lệ công thức theo từng danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Số lượng",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData?.filter((entry) => entry.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Công thức được yêu thích nhất</CardTitle>
            <CardDescription>Top 5 công thức có lượt yêu thích cao nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Lượt xem",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={favoriteRecipes.sortRecipe}
                  layout="vertical"
                  barCategoryGap={50} // khoảng cách giữa các nhóm cột
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="favoriteCount" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      </div>
    </MainLayout>
  )
}