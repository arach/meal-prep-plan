'use client';
import { mealPlan } from '@/data/meals';

interface GroceryListProps {
  selectedMeals: string[];
}

export default function GroceryList({ selectedMeals }: GroceryListProps) {
  const selectedRecipeObjs = mealPlan.recipes.filter(recipe => selectedMeals.includes(recipe.id));

  // For summary line
  const selectedRecipeNames = selectedRecipeObjs.map(recipe => recipe.name);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-xl flex flex-col items-start print:shadow-none print:border print:rounded-none print:bg-white print:max-w-full print:w-full">
      <h2 className="text-2xl font-semibold mb-4 pb-2 border-b flex items-center gap-2 w-full">
        <span>🛒</span> Grocery List
      </h2>
      {/* Stacked meal sections */}
      <div className="w-full flex flex-col gap-2">
        {selectedRecipeObjs.length > 0 ? (
          selectedRecipeObjs.map((recipe) => (
            <div key={recipe.id} className="mb-1">
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 border-b border-gray-200">
                  <span className="text-xl">{recipe.emoji}</span>
                  <span className="font-semibold text-gray-800 text-base font-tech">{recipe.name}</span>
                </div>
                <ul className="p-2 space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 px-2 py-0.5 rounded font-mono text-xs text-gray-800"
                    >
                      <span>•</span>
                      <span className="font-mono">{ingredient.amount}{ingredient.unit ? ` ${ingredient.unit}` : ''} {ingredient.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Select recipes to see ingredients</p>
        )}
      </div>

    </div>
  );
} 
