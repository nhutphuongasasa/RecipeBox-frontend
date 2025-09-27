import { MainLayout } from '@/layout/main-layout'
import { RecipeListItem } from '../components/RecipeListItem'
import { useQuery } from '@tanstack/react-query'
import type { Recipe } from '@/interface'
import axios from 'axios'
import { useEffect, useState } from 'react'


const favoritePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const responseAllRecipes = async () => {
    const res = await axios.get('http://localhost:3000/api/recipe')
    return res.data.recipes
  }


  useEffect(() => {
    responseAllRecipes().then(data => setRecipes(data))
  }, [])
    

  return (
    <MainLayout>
      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>Favorite</h1>
        <div className='space-y-4'>
            {recipes.map((recipe: Recipe) => (
              <RecipeListItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default favoritePage