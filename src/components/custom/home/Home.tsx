import { MainLayout } from "@/layout/main-layout"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from "react"
import { RecipeCard } from "../components/RecipeCard"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Recipe } from "@/interface"

export default function HomePage() {
  const navigate = useNavigate()
    const responseRecipes = async () =>{
    const res = await axios.get("http://localhost:3000/api/recipe")
    console.log(res.data)
    return res.data.recipes
  }

  const { data: recipes = []} = useQuery({
    queryKey: ["recipes-home"],
    queryFn: responseRecipes,
  })
  const pluginAutoplay = React.useRef(
    Autoplay({
      delay: 4000, // Thời gian chờ (4 giây)
      stopOnInteraction: false, // Tiếp tục chạy ngay cả khi người dùng bấm/kéo
      
      rootNode: (emblaRoot) => emblaRoot.parentElement
    })
  );

const images = [
  { url: "top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg" },
  { url: "pexels-pixabay-262897.jpg" },
  { url: "image.png" },
  { url: "anh-sang-16013173882981583565664.jpg" },
  { url: "chup-anh-do-an-dep-SPencil-Agency-3.jpg" },
]


  return <MainLayout>
    <div className="space-y-6 overflow-auto">
      <div className="space-y-2 text-center font-semibold">
        <h1 className="text-3xl font-bold text-balance">Chào mừng đến với RecipeBox</h1>
        <p className="text-muted-foreground mt-2">Quản lý và khám phá những công thức nấu ăn tuyệt vời</p>
      </div>
      <Carousel
        plugins={[pluginAutoplay.current]}
        opts={{
          align: "center",
          loop: true
        }}
        className="w-full max-h-md"
      >
        <CarouselContent>
          {images.map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={images[index].url} alt="" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex w-full max-w-lg mx-auto space-x-2 justify-center items-center py-2">
        <Button onClick={() => navigate('/recipes')} className="bg-orange-400 hover:bg-orange-500 h-full text-lg p-2">Khám phá công thức món ăn mới</Button>
      </div>  
      <h2 className="text-2xl font-semibold text-center py-2">Các món ăn phổ biến</h2>
      <div className="space-y-4">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <footer className="bg-gray-100 text-gray-700 py-6 mt-10 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} RecipeBox. All rights reserved.
      </p>
      <p className="text-sm mt-1">Designed with ❤️ for cooking lovers.</p>
    </footer>
    </div>
  </MainLayout>
}
