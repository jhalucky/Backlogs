import React from "react";

const popularIngredients = [
  "Tomatoes",
  "Garlic",
  "Onions",
  "Olive Oil",
  "Basil",
  "Chicken",
  "Rice",
  "Lemon",
  "Ginger",
  "Butter",
  "Eggs",
  "Peppers",
  "Salmon",
  "Pasta",
  "Turmeric",
];

export default function PopularIngredients({ onSelect }) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <div className="mb-6 text-emerald-500 text-2xl">🍴</div>

        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Popular Ingredients
        </h2>

        <p className="text-lg text-slate-600 mb-10">
          The most loved ingredients by home cooks around the world
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {popularIngredients.map((ingredient, index) => (
            <button
              key={index}
              onClick={() => onSelect(ingredient)}
              className="px-6 py-3 rounded-full border border-slate-200 bg-white text-slate-700 font-medium hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm"
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
