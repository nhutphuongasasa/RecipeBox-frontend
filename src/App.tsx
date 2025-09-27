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
import AdminHome from "./components/custom/admin/home/admin-home"
import CategoriesPage from "./components/custom/admin/categories/catgories"
import RecipeAdmin from "./components/custom/admin/recipe/recipe-admin"
import UserAdmin from "./components/custom/admin/user/user"
import Stats from "./components/custom/admin/stats/stats"
import AdminDashboard from "./components/custom/admin/dashborad/dasgboard"

function App() {
  return (
    <div>      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/create" element={<CreateRecipePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/recipes" element={<RecipeAdmin/>}/>
        <Route path="/admin/users" element={<UserAdmin/>}/>
        <Route path="/admin/statistics" element={<Stats/>}/>
      </Routes>
    </div>
  )
}

export default App
