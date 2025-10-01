export interface User {
  name: string;
  email: string;
  password: string;
  token: string | undefined;
}

export interface Recipe {
  id: string;
  name: string;
  image_url: string;
  authorId: string;
  createdAt: string | undefined;
  status: string | undefined;
  description: string;
  category: string;
  totalCount: number | undefined;
  ingredient: { ingredientName: string; quantity: string }[];
  step: { stepTitle: string; content: string }[];
  hasFavorites: boolean;
}
