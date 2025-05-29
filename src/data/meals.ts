import { MealPlan } from '@/types/meals';

export const mealPlan: MealPlan = {
  recipes: [
    {
      id: 'chicken-breast',
      name: 'Chicken',
      emoji: '🍗',
      ingredients: [
        { name: 'chicken breast', amount: '3', unit: 'lbs' },
        { name: 'lemon', amount: '2' },
        { name: 'olive oil', amount: '1/4', unit: 'cup' },
        { name: 'garlic', amount: '4', unit: 'cloves' },
        { name: 'cumin', amount: '2', unit: 'tsp' },
        { name: 'paprika', amount: '2', unit: 'tsp' },
      ],
      instructions: [
        'Preheat oven to 425°F',
        'Season chicken with spices',
        'Add lemon and olive oil',
        'Roast for 18-22 minutes',
      ],
      cookingTime: {
        temperature: '425°F',
        duration: '18-22 minutes',
      },
      nutrition: {
        calories: 450,
        protein: 60,
        carbs: 8,
        fats: 18,
      },
    },
    {
      id: 'vegetarian-bowl',
      name: 'Veggie Bowl',
      emoji: '🥗',
      ingredients: [
        { name: 'chickpeas', amount: '2', unit: 'cans' },
        { name: 'quinoa', amount: '2', unit: 'cups' },
        { name: 'sweet potatoes', amount: '2', unit: 'large' },
        { name: 'tahini', amount: '1/4', unit: 'cup' },
        { name: 'lemon', amount: '2' },
        { name: 'mixed vegetables', amount: '1', unit: 'bag' },
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Roast sweet potatoes until tender',
        'Prepare tahini-lemon dressing',
        'Combine all ingredients in bowls',
      ],
      cookingTime: {
        duration: '30-40 minutes',
      },
      nutrition: {
        calories: 520,
        protein: 18,
        carbs: 85,
        fats: 14,
      },
    },
    {
      id: 'fish',
      name: 'Fish',
      emoji: '🥩',
      ingredients: [
        { name: 'salmon', amount: '2', unit: 'lbs' },
        { name: 'couscous or rice', amount: '2', unit: 'cups' },
        { name: 'potatoes', amount: '4', unit: 'medium' },
        { name: 'spinach or mixed greens', amount: '1', unit: 'bag' },
        { name: 'lemon', amount: '2' },
        { name: 'fresh herbs (dill, parsley, oregano)', amount: '1', unit: 'bunch' },
      ],
      instructions: [
        'Salmon: bake at 375°F for 12–15 minutes',
        'Cook couscous or rice according to package instructions',
        'Boil or roast potatoes; steam or sauté greens',
        'Serve protein with chosen carbs and greens',
      ],
      cookingTime: {
        duration: '15–30 minutes depending on protein',
      },
      nutrition: {
        calories: 600,
        protein: 45,
        carbs: 60,
        fats: 22,
      },
    }
  ],
  prepDays: [
    {
      id: 'prep-day-1',
      name: 'Prep Day 1',
      recipes: ['chicken-breast'],
      order: 0,
    },
    {
      id: 'prep-day-2',
      name: 'Prep Day 2',
      recipes: ['vegetarian-bowl', 'fish-beef'],
      order: 3,
    }
  ]
};

export const groceryRecipes = [
  {
    id: 'chicken',
    name: 'Chicken Breast',
    ingredients: [
      '3 lbs chicken breast',
      '2 lemons',
      '1/4 cup olive oil',
      '4 cloves garlic',
      '2 tsp cumin',
      '2 tsp paprika',
    ],
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian Bowl',
    ingredients: [
      '2 cans chickpeas',
      '2 cups quinoa',
      '2 large sweet potatoes',
      '1/4 cup tahini',
      '2 lemons',
      'Mixed vegetables',
    ],
  },
  {
    id: 'fish',
    name: 'Fish or Beef',
    ingredients: [
      '2 lbs salmon or ground beef / steak',
      '2 cups couscous or rice',
      '4 medium potatoes',
      '1 bag spinach or mixed greens',
      '2 lemons',
      'Fresh herbs',
    ],
  },
]; 