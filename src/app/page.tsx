'use client';
import React, { useState } from 'react';
import GroceryList from './components/GroceryList';
import RecipeCard from './components/RecipeCard';
import { mealRotation } from '@/data/meals';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const initialPrepEvents = [
  { id: 'chicken', label: 'Prep Chicken', emoji: '🍗', time: 'PM', details: 'For Mon–Wed', duration: 3, color: 'blue', day: 'Sunday' },
  { id: 'fishbeef', label: 'Prep Fish/Beef', emoji: '🥩', time: 'PM', details: 'For Thu–Sat', duration: 4, color: 'blue', day: 'Wednesday' },
];

const PrintButton = () => (
  <button
    onClick={() => window.print()}
    className="print:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
    aria-label="Print or Export to PDF"
  >
    🖨️ Print / Export PDF
  </button>
);

// Helper to get day index
const getDayIdx = (day: string) => weekDays.indexOf(day);

export default function HomePage() {
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [prepEvents, setPrepEvents] = useState(initialPrepEvents);

  // Map days to event arrays (for DnD compatibility)
  const dayToEvents: Record<string, typeof prepEvents> = {};
  weekDays.forEach(day => { dayToEvents[day] = []; });
  prepEvents.forEach(event => { dayToEvents[event.day].push(event); });

  const toggleMeal = (mealId: string) => {
    setSelectedMeals(prev =>
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const sourceDay = result.source.droppableId;
    const destDay = result.destination.droppableId;
    const eventId = result.draggableId;
    setPrepEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const startIdx = getDayIdx(destDay);
        const endIdx = (startIdx + ev.duration - 1) % 7;
        const forLabel = `For ${weekDays[startIdx].slice(0,3)}–${weekDays[endIdx].slice(0,3)}`;
        return { ...ev, day: destDay, details: forLabel };
      }
      return ev;
    }));
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PrintButton />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Row: Main Title, Meal Rotation, Grocery List */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold mb-2">Weekly Meal Prep Plan</h1>
            <p className="text-gray-600 mb-8">A simple, efficient approach to meal preparation</p>
            {/* Meal Rotation Main Event - header aligned horizontally with Grocery List */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
              <section className="flex-1 mb-8 lg:mb-0 bg-white rounded-lg shadow-sm p-6 print:shadow-none print:border print:rounded-none print:bg-white">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b w-full border-gray-200">
                  <span className="text-2xl">🧑‍🍳</span>
                  <h2 className="text-2xl font-semibold">Meal Rotation</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {mealRotation.recipes
                    .filter(recipe => {
                      if (typeof window !== 'undefined' && window.matchMedia('print').matches) {
                        return selectedMeals.includes(recipe.id);
                      }
                      return true;
                    })
                    .map((recipe) => (
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
              <div className="w-full max-w-xl lg:w-[22rem] flex flex-col items-start gap-4 mt-4 lg:mt-0 print:max-w-full print:w-full">
                <GroceryList selectedMeals={selectedMeals} />
              </div>
            </div>
          </div>
        </div>
        {/* Drag-and-drop Weekly Grid Cooking Schedule */}
        <div className="w-full bg-white rounded-lg shadow-sm p-6 mt-8">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b w-full border-gray-200">
            <span className="text-2xl">📅</span>
            <h2 className="text-xl font-semibold">Cooking Schedule</h2>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-7 gap-2 print:grid-cols-7 print:gap-1">
              {weekDays.map((day, idx) => (
                <Droppable droppableId={day} key={day}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex flex-col items-center min-h-[80px] rounded transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50' : ''} snap-center`}
                    >
                      <div className="text-xs font-medium text-gray-500 mb-1">{day.slice(0,3)}</div>
                      {dayToEvents[day].map((event, i) => (
                        <Draggable draggableId={event.id} index={i} key={event.id}>
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              className={`bg-blue-50 border border-blue-200 rounded-md px-2 py-1 flex flex-col items-center text-xs ${dragSnapshot.isDragging ? 'shadow-lg' : ''} snap-center`}
                              style={{
                                ...dragProvided.draggableProps.style,
                                transition: dragSnapshot.isDropAnimating ? 'transform 10ms ease' : undefined,
                                transform: dragSnapshot.isDragging
                                  ? dragProvided.draggableProps.style?.transform
                                  : 'translate(0, 0)',
                              }}
                            >
                              <span className="text-lg mb-0.5">{event.emoji}</span>
                              <span className="font-semibold text-blue-700">{event.label}</span>
                              <span className="text-gray-500">{event.time}</span>
                              <span className="text-gray-400">{event.details}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
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