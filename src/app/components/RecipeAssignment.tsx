"use client";
import { Recipe, PrepDay } from '@/types/meals';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';

interface RecipeAssignmentProps {
  recipes: Recipe[];
  prepDays: PrepDay[];
  onAssignRecipe: (recipeId: string, prepDayId: string) => void;
  onUnassignRecipe: (recipeId: string, prepDayId: string) => void;
}

export default function RecipeAssignment({ recipes, prepDays, onAssignRecipe, onUnassignRecipe }: RecipeAssignmentProps) {
  // Only show prep days and their assigned meals. No unassigned section.
  const [isDragging, setIsDragging] = useState(false);

  // Map droppableId to recipe ids
  const droppableRecipes: Record<string, string[]> = {};
  prepDays.forEach(pd => {
    droppableRecipes[pd.id] = pd.recipes;
  });

  function onDragEnd(result: DropResult) {
    setIsDragging(false);
    if (!result.destination) return;
    const sourceId = result.source.droppableId;
    const destId = result.destination.droppableId;
    const recipeId = result.draggableId;
    if (sourceId === destId) return;

    const sourceIsPrepDay = true; // Only prep days now
    const destIsPrepDay = true;
    const sourceRecipes = droppableRecipes[sourceId];

    // Prevent removing the last meal from a prep day (only for removals)
    if (sourceIsPrepDay) {
      if (sourceRecipes.length === 1 && sourceRecipes[0] === recipeId) {
        // Don't allow removing the last meal
        return;
      }
    }

    // Normal move (move meal chip between prep days)
    onUnassignRecipe(recipeId, sourceId);
    onAssignRecipe(recipeId, destId);
  }

  const COLUMN_WIDTH = 140;

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
      <div className="flex w-full min-h-[60px]">
        {/* Prep Day columns */}
        {prepDays.map((pd) => (
          <Droppable droppableId={pd.id} key={pd.id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-none bg-gray-50 border rounded p-1 transition-colors flex flex-col items-center mx-1 ${snapshot.isDraggingOver ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
                style={{ width: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH }}
              >
                <div className="font-medium text-xs mb-1 text-center truncate w-full px-1">{pd.name}</div>
                <div className="flex flex-col gap-1 min-h-[32px] w-full">
                  {droppableRecipes[pd.id].map((rid, idx) => {
                    const recipe = recipes.find(r => r.id === rid);
                    if (!recipe) return null;
                    return (
                      <Draggable draggableId={rid} index={idx} key={rid}>
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={`px-2 py-0.5 rounded-full border bg-white shadow-sm flex items-center gap-1 cursor-move text-xs w-full ${dragSnapshot.isDragging ? 'bg-blue-100' : ''}`}
                            style={{
                              ...dragProvided.draggableProps.style,
                              transition: dragSnapshot.isDropAnimating ? 'transform 80ms cubic-bezier(0.4,0,0.2,1)' : 'none',
                            }}
                          >
                            <span>{recipe.emoji}</span>
                            <span className="truncate">{recipe.name}</span>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
} 