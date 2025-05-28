'use client';
import { mealRotation } from '@/data/meals';

interface GroceryListProps {
  selectedMeals: string[];
}

export default function GroceryList({ selectedMeals }: GroceryListProps) {
  const selectedRecipeObjs = mealRotation.recipes.filter(recipe => selectedMeals.includes(recipe.id));

  const selectedIngredients = selectedRecipeObjs
    .flatMap(recipe => recipe.ingredients.map(ingredient => `${ingredient.amount}${ingredient.unit ? ' ' + ingredient.unit : ''} ${ingredient.name}`));

  // For summary line
  const selectedRecipeNames = selectedRecipeObjs.map(recipe => recipe.name);

  // Map recipe id to emoji for display
  const recipeEmoji: Record<string, string> = {
    'chicken-breast': '🍗',
    'vegetarian-bowl': '🥗',
    'fish-beef': '🥩',
  };

  // Emoji row for selected recipes
  const emojiRow = selectedMeals.length > 0
    ? selectedMeals.map(id => (
        <span key={id} className="text-2xl mr-1 align-middle">{recipeEmoji[id]}</span>
      ))
    : <span className="text-2xl text-gray-200">🥜🥜🥜</span>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-xl flex flex-col items-start">
      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b flex items-center gap-2 w-full">
        <span>🛒</span> Grocery List
      </h2>

      {/* Emoji row as section header, aligned with Meal Rotation title */}
      <div className="flex items-center mb-3 min-h-[2.5rem]">
        {emojiRow}
      </div>

      {/* Grocery List */}
      <div className="w-full">
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
        {/* One-liner summary of selected recipes */}
        {selectedRecipeNames.length > 0 && (
          <div className="mt-3 text-xs text-gray-500">
            Recipes to cook: {selectedRecipeNames.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
} 
