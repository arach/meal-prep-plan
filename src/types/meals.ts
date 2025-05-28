export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  schedule: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: {
    temperature?: string;
    duration: string;
  };
}

export interface MealRotation {
  recipes: Recipe[];
} 