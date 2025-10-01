import { Routes, Route } from "react-router-dom"
import { Header } from "./layout/header"
import HomePage from "./components/custom/home/Home"
import LoginPage from "./components/custom/auth/login/login"
import RegisterPage from "./components/custom/auth/register/register"
import ProfilePage from "./components/custom/profile/profile"
import RecipesPage from "./components/custom/recipe/reipe"
import CreateRecipePage from "./components/custom/recipe/create/create"
import RecipeDetailPage from "./components/custom/recipe/detail/detail"
import FavoritePage from "./components/custom/favorite/favorite"
import UpdateRecipePage from "./components/custom/recipe/update/updateRecipe"
import UserFavoriteStatsPage from "./components/custom/recipe/stats/page"

function App() {
  return (
    <div>      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/stats" element={<UserFavoriteStatsPage/>}/>
        <Route path="/recipes/update/:id" element={<UpdateRecipePage/>}/>
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/create" element={<CreateRecipePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
      </Routes>
    </div>
  )
}

export default App
