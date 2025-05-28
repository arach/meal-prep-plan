export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbs: number;   // grams
  fats: number;    // grams
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
  nutrition: NutritionInfo;
}

export interface MealRotation {
  recipes: Recipe[];
} 