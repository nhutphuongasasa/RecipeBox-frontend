import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { getStatusBadge } from "./StatusBadge"
import type { Recipe, User } from "@/interface"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [isFavorite, setIsFavorite] = useState(recipe.hasFavorites)
    const queryClient = useQueryClient()
    const currentUser = queryClient.getQueryData<User>(["user"]) 

    const handleFavorite = async () => {
      if(!currentUser){
        toast.error("Vui lòng đăng nhập để thêm vào yêu thích")
        return
      }

      if (isFavorite){
        const response = await axios.delete(`http://localhost:3000/api/favorite/${recipe.id}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        })
        .then(() => {
          setIsFavorite(false)
          toast.success("Đã xóa khỏi yêu thích")
        })
        .catch((error) => {
          console.log(error)
          toast.error("Lỗi khi xóa khỏi yêu thích")
        })
      }else{
        const response = await axios.post(`http://localhost:3000/api/favorite/`,{
            recipeId: recipe.id,
        }, {
            headers:{
                Authorization: `Bearer ${currentUser?.token}`
            }
        }).then(() => {
            setIsFavorite(true)
            toast.success("Đã thêm vào yêu thích")
        }).catch((error) => {
            console.log(error)
            toast.error("Lỗi khi thêm vào yêu thích")
        })
      }
    }
    return (
          <Card className="bg-card border-border hover:shadow-lg transition-shadow group">
      <div className="relative">
        <img
          src={recipe.image_url || "/placeholder.svg"}
          alt={recipe.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">{getStatusBadge(recipe.status!)}</div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-8 w-8" onClick={handleFavorite}>
            {isFavorite ? (
              <Heart className="h-4 w-4 fill-rose-400" />
            ) : (
              <Heart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{recipe.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{recipe.description}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {recipe.category}
            </Badge>
          </div>

          <Link to={`/recipes/${recipe.id}`}>
            <Button className="w-full mt-3">Xem chi tiết</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
    )
}