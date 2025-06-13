# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev        # Start development server on http://localhost:3000

# Production
npm run build      # Build for production
npm run start      # Start production server

# Code Quality
npm run lint       # Run ESLint
```

## Architecture Overview

This is a meal planning application built with Next.js 14 App Router. The application helps users organize weekly meal prep with features for recipe management, grocery list generation, and cooking schedule planning.

### Core Features
- **Recipe Cards**: Visual meal cards with ingredients, instructions, cooking time, and nutrition
- **Dynamic Grocery List**: Auto-generated based on selected meals, with print functionality
- **Prep Day System**: Organize recipes into cooking sessions that can be assigned to weekdays
- **Drag & Drop**: Reorder prep days and manage recipe assignments

### Key Technical Patterns

1. **Client-Side State**: Uses React hooks (`useState`) for all state management
   - `selectedMeals`: Set of recipe IDs for grocery list
   - `prepDays`: Array of prep day configurations with assigned recipes
   - `dayAssignments`: Maps weekdays to prep day indices

2. **Data Structure**: All meal data is statically defined in `src/data/meals.ts`
   - Recipes include emoji identifiers for visual appeal
   - Ingredients have amount and optional unit properties
   - Each recipe has cooking time and nutrition information

3. **Component Architecture**:
   - `RecipeCard`: Individual meal display with toggle functionality
   - `GroceryList`: Consolidated ingredient list with print button
   - `RecipeAssignment`: Modal for managing recipe-to-prep-day assignments
   - All components use TypeScript with proper type definitions from `src/types/meals.ts`

4. **Styling Approach**:
   - Tailwind CSS for all styling
   - Custom Geist font family (Sans and Mono variants)
   - Print-optimized styles for grocery list output
   - Responsive design with mobile-first approach

5. **Interactive Features**:
   - Click meal cards to toggle selection
   - Drag prep days to reorder
   - Modal-based recipe assignment editing
   - Real-time grocery list updates

## Memories

- ask me about rmdir and rm commands, I might allow it if I understand the purpose and context, I just don't want it to get automatically run 