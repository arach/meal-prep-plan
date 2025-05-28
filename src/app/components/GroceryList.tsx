'use client';
import { mealRotation } from '@/data/meals';

interface GroceryListProps {
  selectedMeals: string[];
}

export default function GroceryList({ selectedMeals }: GroceryListProps) {
  const selectedRecipeObjs = mealRotation.recipes.filter(recipe => selectedMeals.includes(recipe.id));

  const selectedIngredients = selectedRecipeObjs
    .flatMap(recipe => recipe.ingredients.map(ingredient => `${ingredient.amount}${ingredient.unit ? ' ' + ingredient.unit : ''} ${ingredient.name}`));

  // Map recipe id to emoji for button display
  const recipeEmoji: Record<string, string> = {
    'chicken-breast': '🍗',
    'vegetarian-bowl': '🥗',
    'fish-beef': '🥩',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-xl flex flex-col items-start">
      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 w-full">
        <span>🛒</span> Grocery List
      </h2>

      {/* Recipe Selection */}
      <div className="mb-4 w-full">
        <h3 className="text-lg font-medium mb-2">Select Recipes</h3>
        <div className="flex flex-wrap gap-2">
          {mealRotation.recipes.map(recipe => (
            <div
              key={recipe.id}
              className={`px-2 py-1 rounded border-2 flex flex-col justify-center items-center gap-0.5 transition-colors font-medium text-xs cursor-default select-none
                ${selectedMeals.includes(recipe.id)
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white opacity-60'}
              `}
              style={{ minWidth: 80, minHeight: 48 }}
            >
              <span className="text-base leading-none flex items-center justify-center">{recipeEmoji[recipe.id]}</span>
              <span className="leading-tight text-center flex items-center justify-center" style={{ minHeight: 18 }}>{recipe.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grocery List */}
      <div className="w-full">
        <h3 className="text-lg font-medium mb-3">Ingredients</h3>
        {selectedIngredients.length > 0 ? (
          <ul className="space-y-1 bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm">
            {selectedIngredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-start gap-2 px-2 py-1 rounded font-mono text-xs text-gray-800"
              >
                <span>•</span>
                <span className="font-mono">{ingredient}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">Select recipes to see ingredients</p>
        )}
      </div>
    </div>
  );
} 
