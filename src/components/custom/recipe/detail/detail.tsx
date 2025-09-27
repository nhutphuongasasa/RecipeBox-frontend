// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Heart,
//   Star,
//   Clock,
//   Users,
//   ChefHat,
//   Share2,
//   Bookmark,
//   MessageCircle,
//   ThumbsUp,
//   Edit,
//   Flag,
//   Eye,
// } from "lucide-react"
// import { Link } from "react-router-dom"
// import { MainLayout } from "@/layout/main-layout"

// export default function RecipeDetailPage() {
//   const [isFavorited, setIsFavorited] = useState(false)
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const [userRating, setUserRating] = useState(0)
//   const [newComment, setNewComment] = useState("")

//   // Mock data - in real app, fetch based on params.id
//   const recipe = {
//     id: 1,
//     name: "Phở Bò Hà Nội",
//     description: "Món phở truyền thống với nước dùng trong vắt, thịt bò tươi ngon và bánh phở dai ngon",
//     category: "Món chính",
//     image: "/steaming-pho.png",
//     author: "Nguyễn Văn A",
//     authorAvatar: "/user-avatar.jpg",
//     authorId: "user1",
//     rating: 4.8,
//     ratingCount: 156,
//     favorites: 124,
//     views: 2340,
//     comments: 45,
//     cookTime: 180,
//     prepTime: 60,
//     servings: 4,
//     difficulty: "Khó",
//     createdAt: "2024-01-15",
//     updatedAt: "2024-01-20",
//     status: "POPULAR",
//     tags: ["Truyền thống", "Hà Nội", "Món nóng", "Bò"],
//     nutrition: {
//       calories: 450,
//       protein: 25,
//       carbs: 45,
//       fat: 15,
//     },
//     ingredients: [
//       { name: "Xương bò", quantity: "1kg", category: "Thịt" },
//       { name: "Thịt bò tái", quantity: "300g", category: "Thịt" },
//       { name: "Bánh phở", quantity: "400g", category: "Tinh bột" },
//       { name: "Hành tây", quantity: "2 củ", category: "Rau củ" },
//       { name: "Gừng", quantity: "1 khúc", category: "Gia vị" },
//       { name: "Quế", quantity: "2 thanh", category: "Gia vị" },
//       { name: "Hồi", quantity: "3 cái", category: "Gia vị" },
//       { name: "Nước mắm", quantity: "3 thìa", category: "Gia vị" },
//       { name: "Đường phèn", quantity: "2 thìa", category: "Gia vị" },
//       { name: "Hành lá", quantity: "1 bó", category: "Rau thơm" },
//       { name: "Ngò gai", quantity: "1 bó", category: "Rau thơm" },
//       { name: "Giá đỗ", quantity: "200g", category: "Rau củ" },
//     ],
//     steps: [
//       {
//         step: 1,
//         title: "Chuẩn bị xương và thịt bò",
//         content:
//           "Rửa sạch xương bò, blanch qua nước sôi để loại bỏ tạp chất. Thịt bò tái thái lát mỏng, ướp với chút muối và tiêu.",
//         time: 15,
//         image: "/step1.jpg",
//       },
//       {
//         step: 2,
//         title: "Nướng gia vị",
//         content: "Nướng hành tây, gừng trên bếp gas cho thơm. Rang quế, hồi trong chảo khô cho dậy mùi thơm.",
//         time: 10,
//         image: "/step2.jpg",
//       },
//       {
//         step: 3,
//         title: "Ninh nước dùng",
//         content:
//           "Cho xương bò vào nồi lớn, đổ nước ngập. Thêm hành tây, gừng đã nướng và gia vị đã rang. Ninh trong 3-4 tiếng với lửa nhỏ.",
//         time: 240,
//         image: "/step3.jpg",
//       },
//       {
//         step: 4,
//         title: "Chuẩn bị bánh phở và rau thơm",
//         content: "Ngâm bánh phở trong nước ấm cho mềm. Rửa sạch rau thơm, thái nhỏ. Trụng giá đỗ qua nước sôi.",
//         time: 10,
//         image: "/step4.jpg",
//       },
//       {
//         step: 5,
//         title: "Hoàn thiện và trình bày",
//         content:
//           "Cho bánh phở vào tô, xếp thịt bò tái lên trên. Chan nước dùng nóng, rắc hành lá, ngò gai. Ăn kèm với giá đỗ, chanh, ớt.",
//         time: 5,
//         image: "/step5.jpg",
//       },
//     ],
//   }

//   const comments = [
//     {
//       id: 1,
//       user: "Trần Thị B",
//       avatar: "/user-avatar.jpg",
//       rating: 5,
//       content: "Công thức rất chi tiết và dễ hiểu. Tôi đã làm theo và phở rất ngon!",
//       createdAt: "2024-01-20",
//       likes: 12,
//       replies: [
//         {
//           id: 11,
//           user: "Nguyễn Văn A",
//           avatar: "/user-avatar.jpg",
//           content: "Cảm ơn bạn đã thử công thức của mình!",
//           createdAt: "2024-01-20",
//           likes: 3,
//         },
//       ],
//     },
//     {
//       id: 2,
//       user: "Lê Văn C",
//       avatar: "/user-avatar.jpg",
//       rating: 4,
//       content: "Nước dùng rất trong và ngọt. Lần sau tôi sẽ thêm chút xương ống để đậm đà hơn.",
//       createdAt: "2024-01-18",
//       likes: 8,
//       replies: [],
//     },
//   ]

//   const relatedRecipes = [
//     { id: 2, name: "Bún Bò Huế", image: "/bun-bo-hue.jpg", rating: 4.5 },
//     { id: 3, name: "Bánh Mì Thịt Nướng", image: "/banh-mi.jpg", rating: 4.6 },
//     { id: 4, name: "Gỏi Cuốn Tôm Thịt", image: "/goi-cuon.jpg", rating: 4.7 },
//   ]

//   const handleRating = (rating: number) => {
//     setUserRating(rating)
//     // Handle rating submission
//   }

//   const handleComment = () => {
//     if (newComment.trim()) {
//       // Handle comment submission
//       setNewComment("")
//     }
//   }

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Recipe Header */}
//         <div className="relative">
//           <img
//             src={recipe.image || "/placeholder.svg"}
//             alt={recipe.name}
//             className="w-full h-96 object-cover rounded-lg"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
//           <div className="absolute bottom-6 left-6 right-6 text-white">
//             <div className="flex items-center space-x-2 mb-2">
//               <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/20">Phổ biến</Badge>
//               <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
//                 {recipe.category}
//               </Badge>
//             </div>
//             <h1 className="text-4xl font-bold text-balance mb-2">{recipe.name}</h1>
//             <p className="text-lg text-white/90">{recipe.description}</p>
//           </div>
//         </div>

//         {/* Recipe Info & Actions */}
//         <Card className="bg-card border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-4">
//                 <Avatar className="h-12 w-12">
//                   <AvatarImage src={recipe.authorAvatar || "/placeholder.svg"} />
//                   <AvatarFallback>{recipe.author[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{recipe.author}</p>
//                   <p className="text-sm text-muted-foreground">
//                     Đăng ngày {new Date(recipe.createdAt).toLocaleDateString("vi-VN")}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Button
//                   variant={isFavorited ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setIsFavorited(!isFavorited)}
//                 >
//                   <Heart className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
//                   {recipe.favorites}
//                 </Button>
//                 <Button
//                   variant={isBookmarked ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setIsBookmarked(!isBookmarked)}
//                 >
//                   <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
//                   Lưu
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <Share2 className="mr-2 h-4 w-4" />
//                   Chia sẻ
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <Edit className="mr-2 h-4 w-4" />
//                   Chỉnh sửa
//                 </Button>
//               </div>
//             </div>

//             {/* Recipe Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 bg-accent/50 rounded-lg">
//               <div className="text-center">
//                 <div className="flex items-center justify-center mb-1">
//                   <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
//                 </div>
//                 <div className="text-lg font-semibold">{recipe.rating}</div>
//                 <div className="text-xs text-muted-foreground">{recipe.ratingCount} đánh giá</div>
//               </div>
//               <div className="text-center">
//                 <div className="flex items-center justify-center mb-1">
//                   <Clock className="h-5 w-5 text-muted-foreground" />
//                 </div>
//                 <div className="text-lg font-semibold">{recipe.cookTime}p</div>
//                 <div className="text-xs text-muted-foreground">Nấu</div>
//               </div>
//               <div className="text-center">
//                 <div className="flex items-center justify-center mb-1">
//                   <Users className="h-5 w-5 text-muted-foreground" />
//                 </div>
//                 <div className="text-lg font-semibold">{recipe.servings}</div>
//                 <div className="text-xs text-muted-foreground">Khẩu phần</div>
//               </div>
//               <div className="text-center">
//                 <div className="flex items-center justify-center mb-1">
//                   <ChefHat className="h-5 w-5 text-muted-foreground" />
//                 </div>
//                 <div className="text-lg font-semibold">{recipe.difficulty}</div>
//                 <div className="text-xs text-muted-foreground">Độ khó</div>
//               </div>
//               <div className="text-center">
//                 <div className="flex items-center justify-center mb-1">
//                   <Eye className="h-5 w-5 text-muted-foreground" />
//                 </div>
//                 <div className="text-lg font-semibold">{recipe.views}</div>
//                 <div className="text-xs text-muted-foreground">Lượt xem</div>
//               </div>
//               <div className="text-center">
//                 <div className="flex items-center justify-center mb-1">
//                   <MessageCircle className="h-5 w-5 text-muted-foreground" />
//                 </div>
//                 <div className="text-lg font-semibold">{recipe.comments}</div>
//                 <div className="text-xs text-muted-foreground">Bình luận</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Recipe Content */}
//         <Tabs defaultValue="ingredients" className="space-y-4">
//           <TabsList className="bg-muted">
//             <TabsTrigger value="ingredients">Nguyên liệu</TabsTrigger>
//             <TabsTrigger value="instructions">Cách làm</TabsTrigger>
//             <TabsTrigger value="nutrition">Dinh dưỡng</TabsTrigger>
//             <TabsTrigger value="comments">Bình luận ({recipe.comments})</TabsTrigger>
//           </TabsList>

//           <TabsContent value="ingredients">
//             <Card className="bg-card border-border">
//               <CardHeader>
//                 <CardTitle>Nguyên liệu ({recipe.servings} người)</CardTitle>
//                 <CardDescription>Danh sách nguyên liệu cần thiết</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {Object.entries(
//                     recipe.ingredients.reduce(
//                       (acc, ingredient) => {
//                         if (!acc[ingredient.category]) {
//                           acc[ingredient.category] = []
//                         }
//                         acc[ingredient.category].push(ingredient)
//                         return acc
//                       },
//                       {} as Record<string, typeof recipe.ingredients>,
//                     ),
//                   ).map(([category, ingredients]) => (
//                     <div key={category}>
//                       <h3 className="font-medium text-primary mb-2">{category}</h3>
//                       <div className="space-y-2">
//                         {ingredients.map((ingredient, index) => (
//                           <div key={index} className="flex items-center justify-between p-2 rounded bg-accent/30">
//                             <span>{ingredient.name}</span>
//                             <Badge variant="outline">{ingredient.quantity}</Badge>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="instructions">
//             <Card className="bg-card border-border">
//               <CardHeader>
//                 <CardTitle>Cách làm</CardTitle>
//                 <CardDescription>Hướng dẫn từng bước chi tiết</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   {recipe.steps.map((step) => (
//                     <div key={step.step} className="flex space-x-4">
//                       <div className="flex-shrink-0">
//                         <div className="h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
//                           {step.step}
//                         </div>
//                       </div>
//                       <div className="flex-1 space-y-2">
//                         <div className="flex items-center justify-between">
//                           <h3 className="font-medium">{step.title}</h3>
//                           <Badge variant="outline" className="text-xs">
//                             <Clock className="mr-1 h-3 w-3" />
//                             {step.time}p
//                           </Badge>
//                         </div>
//                         <p className="text-muted-foreground">{step.content}</p>
//                         {step.image && (
//                           <img
//                             src={step.image || "/placeholder.svg"}
//                             alt={`Bước ${step.step}`}
//                             className="w-full max-w-md h-32 object-cover rounded-lg"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="nutrition">
//             <Card className="bg-card border-border">
//               <CardHeader>
//                 <CardTitle>Thông tin dinh dưỡng</CardTitle>
//                 <CardDescription>Giá trị dinh dưỡng trên 1 khẩu phần</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div className="text-center p-4 bg-accent/30 rounded-lg">
//                     <div className="text-2xl font-bold text-primary">{recipe.nutrition.calories}</div>
//                     <div className="text-sm text-muted-foreground">Calories</div>
//                   </div>
//                   <div className="text-center p-4 bg-accent/30 rounded-lg">
//                     <div className="text-2xl font-bold text-primary">{recipe.nutrition.protein}g</div>
//                     <div className="text-sm text-muted-foreground">Protein</div>
//                   </div>
//                   <div className="text-center p-4 bg-accent/30 rounded-lg">
//                     <div className="text-2xl font-bold text-primary">{recipe.nutrition.carbs}g</div>
//                     <div className="text-sm text-muted-foreground">Carbs</div>
//                   </div>
//                   <div className="text-center p-4 bg-accent/30 rounded-lg">
//                     <div className="text-2xl font-bold text-primary">{recipe.nutrition.fat}g</div>
//                     <div className="text-sm text-muted-foreground">Fat</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="comments">
//             <div className="space-y-4">
//               {/* Rating & Comment Form */}
//               <Card className="bg-card border-border">
//                 <CardHeader>
//                   <CardTitle>Đánh giá công thức</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <p className="text-sm font-medium mb-2">Đánh giá của bạn:</p>
//                     <div className="flex space-x-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button key={star} onClick={() => handleRating(star)}>
//                           <Star
//                             className={`h-6 w-6 ${
//                               star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
//                             }`}
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <p className="text-sm font-medium mb-2">Bình luận:</p>
//                     <Textarea
//                       placeholder="Chia sẻ trải nghiệm của bạn về công thức này..."
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       className="bg-background border-border"
//                       rows={3}
//                     />
//                     <Button onClick={handleComment} className="mt-2">
//                       Gửi bình luận
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Comments List */}
//               <div className="space-y-4">
//                 {comments.map((comment) => (
//                   <Card key={comment.id} className="bg-card border-border">
//                     <CardContent className="p-4">
//                       <div className="flex space-x-3">
//                         <Avatar className="h-10 w-10">
//                           <AvatarImage src={comment.avatar || "/placeholder.svg"} />
//                           <AvatarFallback>{comment.user[0]}</AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1 space-y-2">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <p className="font-medium">{comment.user}</p>
//                               <div className="flex items-center space-x-2">
//                                 <div className="flex">
//                                   {[1, 2, 3, 4, 5].map((star) => (
//                                     <Star
//                                       key={star}
//                                       className={`h-4 w-4 ${
//                                         star <= comment.rating
//                                           ? "fill-yellow-400 text-yellow-400"
//                                           : "text-muted-foreground"
//                                       }`}
//                                     />
//                                   ))}
//                                 </div>
//                                 <span className="text-sm text-muted-foreground">
//                                   {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
//                                 </span>
//                               </div>
//                             </div>
//                             <Button variant="ghost" size="sm">
//                               <Flag className="h-4 w-4" />
//                             </Button>
//                           </div>
//                           <p className="text-muted-foreground">{comment.content}</p>
//                           <div className="flex items-center space-x-4">
//                             <Button variant="ghost" size="sm">
//                               <ThumbsUp className="mr-1 h-4 w-4" />
//                               {comment.likes}
//                             </Button>
//                             <Button variant="ghost" size="sm">
//                               Trả lời
//                             </Button>
//                           </div>

//                           {/* Replies */}
//                           {comment.replies.length > 0 && (
//                             <div className="ml-4 space-y-3 pt-3 border-l-2 border-border pl-4">
//                               {comment.replies.map((reply) => (
//                                 <div key={reply.id} className="flex space-x-3">
//                                   <Avatar className="h-8 w-8">
//                                     <AvatarImage src={reply.avatar || "/placeholder.svg"} />
//                                     <AvatarFallback>{reply.user[0]}</AvatarFallback>
//                                   </Avatar>
//                                   <div className="flex-1">
//                                     <div className="flex items-center space-x-2">
//                                       <p className="font-medium text-sm">{reply.user}</p>
//                                       <span className="text-xs text-muted-foreground">
//                                         {new Date(reply.createdAt).toLocaleDateString("vi-VN")}
//                                       </span>
//                                     </div>
//                                     <p className="text-sm text-muted-foreground mt-1">{reply.content}</p>
//                                     <Button variant="ghost" size="sm" className="mt-1">
//                                       <ThumbsUp className="mr-1 h-3 w-3" />
//                                       {reply.likes}
//                                     </Button>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>

//         {/* Related Recipes */}
//         <Card className="bg-card border-border">
//           <CardHeader>
//             <CardTitle>Công thức liên quan</CardTitle>
//             <CardDescription>Những công thức khác bạn có thể thích</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4 md:grid-cols-3">
//               {relatedRecipes.map((related) => (
//                 <Link key={related.id} to={`/recipes/${related.id}`}>
//                   <div className="group cursor-pointer">
//                     <img
//                       src={related.image || "/placeholder.svg"}
//                       alt={related.name}
//                       className="w-full h-32 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
//                     />
//                     <div className="mt-2">
//                       <p className="font-medium group-hover:text-primary transition-colors">{related.name}</p>
//                       <div className="flex items-center space-x-1 mt-1">
//                         <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                         <span className="text-sm text-muted-foreground">{related.rating}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </MainLayout>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Star,
  Clock,
  Users,
  Share2,
  Bookmark,
  MessageCircle,
  ThumbsUp,
  Edit,
  Flag,
} from "lucide-react"
import { Link } from "react-router-dom"
import { MainLayout } from "@/layout/main-layout"
import type { Recipe, User } from "@/interface"
import toast from "react-hot-toast"

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [isFavorited, setIsFavorited] = useState(false)
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<User>(['user'])

  // Fetch recipe data
  const fetchRecipe = async (): Promise<Recipe> => {
    const res = await axios.get(`http://localhost:3000/api/recipe/${id}`)
    console.log(res.data)
    return res.data
  }

  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: fetchRecipe,
    staleTime: 1000 * 60,
  })

  const { data: relatedRecipes = []} = useQuery({
    queryKey: ["relatedRecipes", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/recipe`,{
        params: {page: 1, limit: 3},
      });
      return res.data.recipes;
    },
  });
  
  const { data: author } = useQuery({
    queryKey: ["author", recipe?.authorId],
    queryFn: async () => {
      if (!recipe?.authorId) return null
      console.log(recipe.authorId)
      const res = await axios.get(`http://localhost:3000/api/user/${recipe.authorId}`)
      return res.data
    },
    enabled: !!recipe?.authorId
  })


  const handleFavorite = async () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để thực hiện thao tác này!")
      return
    }
    console.log(currentUser.token)
    try {
      await axios.post(`http://localhost:3000/api/favorite`,{
        recipeId: id,
      },{
        headers: {
          Authorization: `Bearer ${currentUser?.token}`
        }
      }) 
      setIsFavorited(!isFavorited)
      toast.success(isFavorited ? "Đã bỏ thích!" : "Đã thích công thức!")
    } catch (error) {
      toast.error("Thao tác thất bại!")
    }
  }


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>
  if (!recipe) return <div>Không tìm thấy công thức</div>

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Recipe Header */}
        <div className="relative">
          <img
            src={recipe.image_url || "/placeholder.svg"}
            alt={recipe.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              {recipe.status && (
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/20">{recipe.status}</Badge>
              )}
              <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                {recipe.category}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-balance mb-2">{recipe.name}</h1>
            <p className="text-lg text-white/90">{recipe.description}</p>
          </div>
        </div>

        {/* Recipe Info & Actions */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={author?.avatar || "/user-avatar.jpg"} />
                  <AvatarFallback>{author?.name[0] || "A"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{author?.name || "Ẩn danh"}</p>
                  <p className="text-sm text-muted-foreground">
                    {recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString("vi-VN") : "Chưa có ngày đăng"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={isFavorited ? "default" : "outline"}
                  size="sm"
                  onClick={handleFavorite}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                  Thích
                </Button>

              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Content */}
        <Tabs defaultValue="ingredients" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="ingredients">Nguyên liệu</TabsTrigger>
            <TabsTrigger value="instructions">Cách làm</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Nguyên liệu</CardTitle>
                <CardDescription>Danh sách nguyên liệu cần thiết</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-primary mb-2">Nguyên liệu</h3>
                    <div className="space-y-2">
                      {recipe.ingredient.map((ingredient, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded bg-accent/30">
                          <span>{ingredient.ingredientName}</span>
                          <Badge variant="outline">{ingredient.quantity}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Cách làm</CardTitle>
                <CardDescription>Hướng dẫn từng bước chi tiết</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recipe.step.map((step, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium">{step.stepTitle}</h3>
                        <p className="text-muted-foreground">{step.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Recipes */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Công thức liên quan</CardTitle>
            <CardDescription>Những công thức khác bạn có thể thích</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedRecipes.map((related: Recipe) => (
                <Link key={related.id} to={`/recipes/${related.id}`}>
                  <div className="group cursor-pointer">
                    <img
                      src={related.image_url || "/placeholder.svg"}
                      alt={related.name}
                      className="w-full h-32 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                    />
                    <div className="mt-2">
                      <p className="font-medium group-hover:text-primary transition-colors">{related.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}