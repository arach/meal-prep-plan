import { Recipe } from '@/types/meals';
import { LuCheck } from "react-icons/lu";

interface RecipeCardProps {
  recipe: Recipe;
  tight?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export default function RecipeCard({ recipe, tight, active, onClick }: RecipeCardProps) {
  return (
    <div
      className={`border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden transition-colors cursor-pointer select-none font-tech
        hover:border-blue-300
        ${!active ? 'print:hidden' : ''}
      `}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={!!active}
    >
      <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 relative">
        <span className="text-xl">{recipe.emoji}</span>
        <span className="font-semibold font-tech text-base text-gray-800">{recipe.name}</span>
        <span className="ml-auto flex items-center">
          <LuCheck
            className={`transition-all duration-200 ease-in-out ${active ? 'scale-100 opacity-100 text-green-500' : 'scale-75 opacity-0'}`}
            size={22}
            aria-label={active ? 'Selected' : 'Not selected'}
          />
        </span>
      </div>
      
      <div className="px-4 py-3 space-y-4">
        <div className={tight ? 'space-y-1' : 'space-y-2'}>
          <h4 className="font-medium text-sm">Ingredients:</h4>
          <ul className={`text-sm ${tight ? 'space-y-1' : 'space-y-2'}`}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2 font-mono text-xs text-gray-800">
                <span>•</span>
                <span className="font-mono">{ingredient.amount}{ingredient.unit ? ` ${ingredient.unit}` : ''} {ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={tight ? 'space-y-1' : 'space-y-2'}>
          <h4 className="font-medium text-sm">Instructions:</h4>
          <ul className={`text-sm ${tight ? 'space-y-1' : 'space-y-2'}`}>
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-2 font-mono text-xs text-gray-800">
                <span>•</span>
                <span className="font-mono">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition Info */}
        <div className="mt-2 p-2 rounded bg-white/80 border border-gray-200 flex flex-col items-start text-xs font-mono text-gray-700">
          <span className="font-semibold text-gray-900 mb-1">Nutrition (per serving):</span>
          <div className="flex flex-wrap gap-4">
            <span>🔥 {recipe.nutrition.calories} kcal</span>
            <span>🥩 {recipe.nutrition.protein}g protein</span>
            <span>🍚 {recipe.nutrition.carbs}g carbs</span>
            <span>🧈 {recipe.nutrition.fats}g fats</span>
          </div>
        </div>
      </div>
    </div>
  );
} 