import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { getStatusBadge } from "./StatusBadge"
import type { Recipe, User } from "@/interface"
import { useState } from "react"
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const RecipeListItem = ({ recipe }: { recipe: Recipe }) => {
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
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex space-x-4">
                    <img
                        src={recipe.image_url || "/placeholder.svg"}
                        alt={recipe.name}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
        
                    <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">{recipe.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {getStatusBadge(recipe.status!)}
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleFavorite}>
                                    {isFavorite ? (
                                        <Heart className="h-4 w-4 fill-rose-400" />
                                    ) : (
                                        <Heart className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
        
                        <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                                {recipe.category}
                            </Badge>
                        </div>
            
                        <div className="flex items-center justify-between">
                            <Link to={`/recipes/${recipe.id}`}>
                            <Button size="sm">Xem chi tiết</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}