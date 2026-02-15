import { useState} from "react";

export default function AdvancedFilters({
  applyFilter,
  recipes = [],
}) {
  const [region, setRegion] = useState("");
  // suggestions are derived from region and allRegions, so no need for state
  const [flavor, setFlavor] = useState("");
  const [diet, setDiet] = useState("");
  const [minCalories, setMinCalories] = useState("");
  const [maxCalories, setMaxCalories] = useState("");

  /* =============================
     Extract unique regions dynamically
  ============================== */
  const allRegions = [
    ...new Set(recipes.map((r) => r.Region).filter(Boolean)),
  ];

  /* =============================
     Autocomplete logic
  ============================== */
  // suggestions are derived, not stored
  const suggestions = region
    ? allRegions.filter((r) =>
        r.toLowerCase().includes(region.toLowerCase())
      ).slice(0, 5)
    : [];

  /* =============================
     Handlers
  ============================== */
  const handleCuisine = () => {
    if (!region) return;
    applyFilter("cuisine", { region, page: 1 });
  };

  const handleCalories = () => {
    if (!minCalories || !maxCalories) return;
    applyFilter("calories", {
      minCalories,
      maxCalories,
      page: 1,
    });
  };

  const handleFlavor = () => {
    if (!flavor) return;
    applyFilter("flavor", { flavor, page: 1 });
  };

  const handleDiet = () => {
    if (!region || !diet) return;
    applyFilter("diet-region", {
      region,
      diet,
      limit: 10,
    });
  };

  return (
    <section className="py-14 bg-white border-t border-emerald-100">
      <div className="mx-auto max-w-7xl px-4">

        <h3 className="text-2xl font-bold text-slate-900 mb-8">
          Advanced Filters
        </h3>

        {/* Single Row Layout */}
        <div className="flex flex-wrap gap-6 items-end">

          {/* Region Autocomplete */}
          <div className="relative min-w-[250px] flex-1">
            <label className="text-sm font-semibold text-slate-600">
              Region
            </label>

            <input
              type="text"
              placeholder="Type region (e.g. Scandinavian)"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl border px-4 py-2 mt-1"
            />

            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-xl shadow-lg mt-1">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setRegion(item);
                    }}
                    className="px-4 py-2 hover:bg-emerald-50 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleCuisine}
              className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2 font-semibold transition-all"
            >
              Apply
            </button>
          </div>

          {/* Flavor */}
          <div className="min-w-[200px] flex-1">
            <label className="text-sm font-semibold text-slate-600">
              Flavor
            </label>

            <select
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              className="w-full rounded-xl border px-4 py-2 mt-1"
            >
              <option value="">Select Flavor</option>
              <option value="spicy">Spicy</option>
              <option value="sweet">Sweet</option>
              <option value="savory">Savory</option>
            </select>

            <button
              onClick={handleFlavor}
              className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2 font-semibold transition-all"
            >
              Apply
            </button>
          </div>

          {/* Calories */}
          <div className="min-w-[250px] flex-1">
            <label className="text-sm font-semibold text-slate-600">
              Calories Range
            </label>

            <div className="flex gap-2 mt-1">
              <input
                type="number"
                placeholder="Min"
                value={minCalories}
                onChange={(e) => setMinCalories(e.target.value)}
                className="w-full rounded-xl border px-3 py-2"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxCalories}
                onChange={(e) => setMaxCalories(e.target.value)}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>

            <button
              onClick={handleCalories}
              className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2 font-semibold transition-all"
            >
              Apply
            </button>
          </div>

          {/* Diet */}
          <div className="min-w-[220px] flex-1">
            <label className="text-sm font-semibold text-slate-600">
              Diet
            </label>

            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full rounded-xl border px-4 py-2 mt-1"
            >
              <option value="">Select Diet</option>
              <option value="vegan">Vegan</option>
              <option value="pescetarian">Pescetarian</option>
              <option value="lacto_vegetarian">Lacto Vegetarian</option>
            </select>

            <button
              onClick={handleDiet}
              className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2 font-semibold transition-all"
            >
              Apply
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
