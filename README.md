# Meal Prep Plan

[![Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, interactive meal prep planner built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [TypeScript](https://www.typescriptlang.org/).

![MealPrep Pro Landing Page](./landing-page.png)

## Features

- 🏠 **Beautiful Landing Page:** Professional landing page showcasing the meal planning workflow
- 📅 **Weekly Meal Planning:** Visual calendar showing your entire week of meal prep at a glance
- 🥗 **Recipe Management:** Organized meal cards with ingredients, cooking times, and nutritional info
- 🛒 **Smart Grocery Lists:** Auto-generated shopping lists based on selected meals
- 🎯 **Prep Day System:** Organize recipes into efficient cooking sessions
- 📱 **Responsive Design:** Optimized for desktop and mobile devices
- 🖨️ **Print-Ready:** Export grocery lists and meal plans for offline use
- ⚡ **Fast & Modern:** Built with Next.js 14, TypeScript, and Tailwind CSS

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/page.tsx` — Landing page with hero section and benefits
- `src/app/app/page.tsx` — Main meal planning application
- `src/app/components/RecipeCard.tsx` — Individual meal card component
- `src/app/components/GroceryList.tsx` — Dynamic grocery list generator
- `src/app/components/RecipeAssignment.tsx` — Modal for managing meal assignments
- `src/data/meals.ts` — Recipe database with ingredients and instructions
- `src/types/meals.ts` — TypeScript type definitions
- `src/app/globals.css` — Global styles and Tailwind configuration

## Customization

- **Add or edit meals:** Update `src/data/meals.ts` with your own recipes, ingredients, and instructions.
- **Change styles:** Tweak Tailwind classes in the components or update your `tailwind.config.ts`.

## Deployment

Deploy easily to [Vercel](https://vercel.com/) or your favorite platform:

```bash
npm run build
npm start
```

## Credits

- Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [TypeScript](https://www.typescriptlang.org/).
- Font: [Geist](https://vercel.com/font)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
