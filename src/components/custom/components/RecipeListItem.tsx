import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Heart, Star, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { getStatusBadge } from "./StatusBadge"
import type { Recipe } from "@/interface"

export const RecipeListItem = ({ recipe }: { recipe: Recipe }) => (
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
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Heart className="h-4 w-4" />
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