import { Recipe } from '@/types/meals';

interface RecipeCardProps {
  recipe: Recipe;
  tight?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export default function RecipeCard({ recipe, tight, active, onClick }: RecipeCardProps) {
  return (
    <div
      className={`bg-gray-50 rounded-lg border shadow-sm transition-colors cursor-pointer select-none
        ${tight ? 'space-y-2 p-3' : 'space-y-4 p-4'}
        ${active ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}
      `}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={!!active}
    >
      <h3 className={`text-lg font-medium flex items-center gap-2 ${tight ? 'mb-1' : ''}`}>
        <span>{recipe.emoji}</span> {recipe.name}
      </h3>
      <p className="text-sm text-gray-600">{recipe.schedule}</p>
      
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

      <div className="text-sm text-gray-600">
        <p>Cooking Time: {recipe.cookingTime.duration}</p>
        {recipe.cookingTime.temperature && (
          <p>Temperature: {recipe.cookingTime.temperature}</p>
        )}
      </div>
    </div>
  );
} 