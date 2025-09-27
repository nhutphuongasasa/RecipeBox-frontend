import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Clock, Users, Eye, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { getStatusBadge } from "./StatusBadge"
import type { Recipe } from "@/interface"

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow group">
      <div className="relative">
        <img
          src={recipe.image_url || "/placeholder.svg"}
          alt={recipe.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">{getStatusBadge(recipe.status!)}</div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Heart className="h-4 w-4" />
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


          {/* <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{recipe.favorites}</span>
              </div>
            </div>
          </div> */}

          <Link to={`/recipes/${recipe.id}`}>
            <Button className="w-full mt-3">Xem chi tiết</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )