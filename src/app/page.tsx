'use client';
import React, { useState } from 'react';
import GroceryList from './components/GroceryList';
import RecipeCard from './components/RecipeCard';
import { mealRotation } from '@/data/meals';

export default function HomePage() {
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const toggleMeal = (mealId: string) => {
    setSelectedMeals(prev =>
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Row: Main Title, Meal Rotation, Grocery List */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold mb-2">Weekly Meal Prep Plan</h1>
            <p className="text-gray-600 mb-8">A simple, efficient approach to meal preparation</p>
            {/* Meal Rotation Main Event - header aligned horizontally with Grocery List */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              <section className="flex-1 mb-8 lg:mb-0">
                <div className="flex items-baseline gap-2 mb-4">
                  <h2 className="text-xl font-semibold tracking-tight">Meal Rotation</h2>
                </div>
                <div className="bg-white/60 rounded-xl p-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {mealRotation.recipes.map((recipe) => (
                      <div key={recipe.id} className="w-full">
                        <RecipeCard
                          recipe={recipe}
                          tight
                          active={selectedMeals.includes(recipe.id)}
                          onClick={() => toggleMeal(recipe.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              {/* Grocery List Card aligned and always top-aligned */}
              <div className="w-full max-w-xl lg:w-[22rem] flex flex-col items-start gap-4 mt-4 lg:mt-0">
                <GroceryList selectedMeals={selectedMeals} />
              </div>
            </div>
          </div>
        </div>
        {/* Cooking Schedule at the bottom right */}
        <div className="flex flex-col lg:flex-row lg:justify-end mt-8">
          <section className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 w-full max-w-md lg:w-80">
            <h2 className="text-lg font-semibold mb-3 pb-2 border-b-2 border-gray-100 flex items-center gap-2">
              <span>📅</span> Cooking Schedule
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                <span className="text-xl">🌅</span>
                <div>
                  <div className="font-medium text-gray-900">Sunday PM</div>
                  <div className="text-xs text-gray-600">~60 min • Prep for Mon–Wed</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                <span className="text-xl">🌙</span>
                <div>
                  <div className="font-medium text-gray-900">Wednesday PM</div>
                  <div className="text-xs text-gray-600">~60 min • Prep for Thu–Sat</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}