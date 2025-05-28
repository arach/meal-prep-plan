'use client';
import React, { useState } from 'react';
import GroceryList from './components/GroceryList';
import RecipeCard from './components/RecipeCard';
import { mealRotation } from '@/data/meals';

const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const prepEvents = [
  { day: 'Sunday', label: 'Prep Chicken', emoji: '🍗', time: 'PM', details: 'For Mon–Wed' },
  { day: 'Wednesday', label: 'Prep Fish/Beef', emoji: '🥩', time: 'PM', details: 'For Thu–Sat' },
];

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
              <section className="flex-1 mb-8 lg:mb-0 bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b w-full border-gray-200">
                  <span className="text-2xl">🧑‍🍳</span>
                  <h2 className="text-2xl font-semibold">Meal Rotation</h2>
                </div>
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
              </section>
              {/* Grocery List Card aligned and always top-aligned */}
              <div className="w-full max-w-xl lg:w-[22rem] flex flex-col items-start gap-4 mt-4 lg:mt-0">
                <GroceryList selectedMeals={selectedMeals} />
              </div>
            </div>
          </div>
        </div>
        {/* Static Weekly Grid Cooking Schedule */}
        <div className="w-full bg-white rounded-lg shadow-sm p-6 mt-8">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b w-full border-gray-200">
            <span className="text-2xl">📅</span>
            <h2 className="text-xl font-semibold">Cooking Schedule</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => {
              const event = prepEvents.find(e => e.day === day);
              return (
                <div key={day} className="flex flex-col items-center">
                  <div className="text-xs font-medium text-gray-500 mb-1">{day.slice(0,3)}</div>
                  {event ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-md px-2 py-1 flex flex-col items-center text-xs">
                      <span className="text-lg mb-0.5">{event.emoji}</span>
                      <span className="font-semibold text-blue-700">{event.label}</span>
                      <span className="text-gray-500">{event.time}</span>
                      <span className="text-gray-400">{event.details}</span>
                    </div>
                  ) : (
                    <div className="h-12" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}