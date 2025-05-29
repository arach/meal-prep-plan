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
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: {
    temperature?: string;
    duration: string;
  };
  nutrition: NutritionInfo;
}

export interface PrepDay {
  id: string;
  name: string;  // e.g., "Prep Day 1"
  recipes: string[];  // Array of recipe IDs
  order: number;  // For drag-and-drop reordering
}

export interface MealPlan {
  recipes: Recipe[];
  prepDays: PrepDay[];
} 