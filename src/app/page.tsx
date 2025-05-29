'use client';
import React, { useState } from 'react';
import GroceryList from './components/GroceryList';
import RecipeCard from './components/RecipeCard';
import RecipeAssignment from './components/RecipeAssignment';
import { mealPlan } from '@/data/meals';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { PrepDay } from '@/types/meals';
import Modal from './components/Modal';
import { MdEdit } from "react-icons/md";

const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const PrintButton = () => (
  <button
    onClick={() => window.print()}
    className="print:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-3 py-1 rounded-full shadow hover:bg-blue-700 transition text-sm"
    aria-label="Print or Export to PDF"
  >
    🖨️ Print
  </button>
);

// Helper to get day index
const getDayIdx = (day: string) => weekDays.indexOf(day);

export default function HomePage() {
  // Default selection: chicken-breast and fish-beef
  const [selectedMeals, setSelectedMeals] = useState<string[]>(['chicken-breast', 'fish-beef']);
  // Map of day name to prepDayId (or null if empty)
  const [dayAssignments, setDayAssignments] = useState<Record<string, string | null>>(() => {
    // Assign prep days to their order (index) in weekDays, rest are null
    const assignments: Record<string, string | null> = {};
    weekDays.forEach((day, idx) => {
      const prepDay = mealPlan.prepDays.find(pd => pd.order === idx);
      assignments[day] = prepDay ? prepDay.id : null;
    });
    return assignments;
  });
  // Keep prepDays in state for recipe assignment UI
  const [prepDays, setPrepDays] = useState(mealPlan.prepDays);
  const [isAssignmentModalOpen, setAssignmentModalOpen] = useState(false);

  // Helper to get prepDay by id
  const getPrepDay = (id: string | null) => prepDays.find(pd => pd.id === id);

  // Remove from prep days (do NOT affect selectedMeals)
  const handleUnassignRecipe = (recipeId: string, prepDayId: string) => {
    setPrepDays(prev => {
      const updated = prev.map(prepDay => {
        if (prepDay.id === prepDayId) {
          return {
            ...prepDay,
            recipes: prepDay.recipes.filter(id => id !== recipeId)
          };
        }
        return prepDay;
      });
      // After unassign, if prep day 1 is empty and prep day 2 has meals, move top meal from 2 to 1
      const pd1 = updated[0];
      const pd2 = updated[1];
      if (pd1 && pd1.recipes.length === 0 && pd2 && pd2.recipes.length > 0) {
        const [first, ...rest] = pd2.recipes;
        return [
          { ...pd1, recipes: [first] },
          { ...pd2, recipes: rest },
          ...updated.slice(2)
        ];
      }
      return updated;
    });
  };

  // Deselecting from meal rotation only removes from prep days, keeps in pool
  const toggleMeal = (mealId: string) => {
    setSelectedMeals(prev => {
      if (prev.includes(mealId)) {
        if (prev.length <= 2) return prev; // Prevent going below 2
        // Remove from prep days as well
        setPrepDays(currentPrepDays => {
          const updated = currentPrepDays.map(pd => ({
            ...pd,
            recipes: pd.recipes.filter(id => id !== mealId)
          }));
          // After unassign, if prep day 1 is empty and prep day 2 has meals, move top meal from 2 to 1
          const pd1 = updated[0];
          const pd2 = updated[1];
          if (pd1 && pd1.recipes.length === 0 && pd2 && pd2.recipes.length > 0) {
            const [first, ...rest] = pd2.recipes;
            return [
              { ...pd1, recipes: [first] },
              { ...pd2, recipes: rest },
              ...updated.slice(2)
            ];
          }
          return updated;
        });
        return prev.filter(id => id !== mealId);
      } else {
        // Add to selectedMeals and append to last prep day if not already assigned
        setPrepDays(currentPrepDays => {
          // If already assigned, do nothing
          if (currentPrepDays.some(pd => pd.recipes.includes(mealId))) return currentPrepDays;
          // Append to last prep day
          return currentPrepDays.map((pd, idx) =>
            idx === currentPrepDays.length - 1
              ? { ...pd, recipes: [...pd.recipes, mealId] }
              : pd
          );
        });
        return [...prev, mealId];
      }
    });
  };

  const handleAssignRecipe = (recipeId: string, prepDayId: string) => {
    setPrepDays(prev => prev.map(prepDay => {
      if (prepDay.id === prepDayId) {
        return {
          ...prepDay,
          recipes: [...prepDay.recipes, recipeId]
        };
      }
      return prepDay;
    }));
  };

  // Atomic swap handler
  const handleSwapRecipes = (sourceDayId: string, destDayId: string, sourceMealId: string, destMealId: string) => {
    setPrepDays(prev => prev.map(pd => {
      if (pd.id === sourceDayId) {
        return { ...pd, recipes: [destMealId] };
      }
      if (pd.id === destDayId) {
        return { ...pd, recipes: [sourceMealId] };
      }
      return pd;
    }));
  };

  // Select a meal in Meal Rotation (add to selectedMeals if not present)
  const handleSelectMeal = (mealId: string) => {
    setSelectedMeals(prev => prev.includes(mealId) ? prev : [...prev, mealId]);
  };

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const sourceDay = result.source.droppableId;
    const destDay = result.destination.droppableId;
    const prepDayId = dayAssignments[sourceDay];
    if (!prepDayId) return;
    // Prevent moving to a day that already has a prep day
    if (dayAssignments[destDay]) return;
    // Move prepDayId to destDay, clear from sourceDay
    setDayAssignments(prev => {
      const updated = { ...prev };
      updated[sourceDay] = null;
      updated[destDay] = prepDayId;
      return updated;
    });
    // Optionally, update the order property on prepDays
    setPrepDays(prev => prev.map(pd =>
      pd.id === prepDayId ? { ...pd, order: weekDays.indexOf(destDay) } : pd
    ));
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PrintButton />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Meal Rotation and Grocery List */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold mb-2">Weekly Meal Prep Plan</h1>
            <p className="text-gray-600 mb-8">A simple, efficient approach to meal preparation</p>
            {/* Meal Rotation Main Event - header aligned horizontally with Grocery List */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              <section className="flex-1 mb-8 lg:mb-0 bg-white rounded-lg shadow-sm p-4 print:shadow-none print:border print:rounded-none print:bg-white">
                <h2 className="text-2xl font-semibold font-tech mb-4 pb-2 border-b flex items-center gap-2 w-full">
                  <span className="text-2xl">🧑‍🍳</span> Meal Rotation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {mealPlan.recipes.map((recipe) => {
                    // Show as active if assigned to any prep day or in the pool
                    const isAssigned = prepDays.some(pd => pd.recipes.includes(recipe.id));
                    const isInPool = selectedMeals.includes(recipe.id);
                    return (
                      <div key={recipe.id} className="w-full">
                        <RecipeCard
                          recipe={recipe}
                          tight
                          active={isAssigned || isInPool}
                          onClick={() => toggleMeal(recipe.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
              {/* Grocery List Card aligned and always top-aligned */}
              <div className="w-full max-w-xl lg:w-[22rem] flex flex-col items-start gap-4 mt-4 lg:mt-0 print:max-w-full print:w-full">
                <GroceryList selectedMeals={selectedMeals} />
              </div>
            </div>
          </div>
        </div>
        {/* Cooking Schedule Section */}
        <div className="w-full bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-1 mb-2 pb-2 border-b border-gray-200">
            <span className="text-2xl">📅</span>
            <h2 className="text-xl font-semibold font-tech">Cooking Schedule</h2>
            <button
              className="ml-1 p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition align-middle"
              onClick={() => setAssignmentModalOpen(true)}
              aria-label="Edit meal assignment"
              style={{ lineHeight: 0 }}
            >
              <MdEdit size={22} />
            </button>
          </div>
          {/* Week View Card Header */}
          <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 border border-gray-200 rounded-t-lg font-semibold font-tech text-lg">
            <span className="text-lg">🗓️</span>
            <span>Week View</span>
          </div>
          {/* Calendar Grid Card (content) */}
          <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg shadow-sm p-2">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-7 gap-2 print:grid-cols-7 print:gap-1">
                {weekDays.map((day) => (
                  <Droppable droppableId={day} key={day}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex flex-col items-center min-h-[120px] rounded-md border border-gray-100 bg-white p-1 transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50' : ''} snap-center`}
                      >
                        <div className="text-xs font-semibold text-gray-600 mb-1">{day.slice(0,3)}</div>
                        {dayAssignments[day] && (
                          <Draggable draggableId={dayAssignments[day]!} index={0} key={dayAssignments[day]!}>
                            {(dragProvided, dragSnapshot) => {
                              const prepDay = getPrepDay(dayAssignments[day]);
                              if (!prepDay) return null;
                              return (
                                <div
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  {...dragProvided.dragHandleProps}
                                  className={`bg-blue-50 border border-blue-200 rounded-md px-3 py-2 flex flex-col items-center text-xs w-full mt-2 ${dragSnapshot.isDragging ? 'shadow-lg' : ''} snap-center`}
                                >
                                  <span className="font-semibold text-blue-700 mb-1">{prepDay.name}</span>
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {prepDay.recipes.map(rid => {
                                      const recipe = mealPlan.recipes.find(r => r.id === rid);
                                      return recipe ? (
                                        <span key={rid} className="flex items-center gap-1 bg-white border rounded px-2 py-0.5 text-xs">
                                          <span>{recipe.emoji}</span> <span>{recipe.name}</span>
                                        </span>
                                      ) : null;
                                    })}
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </div>
          <Modal
            open={isAssignmentModalOpen}
            onClose={() => setAssignmentModalOpen(false)}
            title="🍽️ Edit Meal Assignment"
          >
            <div>
              <div className="border-b border-gray-200 pb-2 mb-4" />
              <RecipeAssignment
                recipes={mealPlan.recipes}
                prepDays={prepDays}
                onAssignRecipe={handleAssignRecipe}
                onUnassignRecipe={handleUnassignRecipe}
              />
            </div>
          </Modal>
        </div>
      </div>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body, html {
            background: #fff !important;
          }
          .print\:hidden { display: none !important; }
          .print\:shadow-none { box-shadow: none !important; }
          .print\:border { border: 1px solid #e5e7eb !important; }
          .print\:rounded-none { border-radius: 0 !important; }
          .print\:bg-white { background: #fff !important; }
          .print\:max-w-full { max-width: 100% !important; }
          .print\:w-full { width: 100% !important; }
          .print\:gap-1 { gap: 0.25rem !important; }
        }
      `}</style>
    </main>
  );
}