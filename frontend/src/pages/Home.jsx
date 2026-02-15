import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import IntelligenceModules from "../components/IntelligenceModules";
import IngredientAnalyzer from "../components/IngredientAnalyzer";
import AdvancedFilters from "../components/AdvanceFilters";
import RecipeResults from "../components/RecipeResults";
import EmptyState from "../components/EmptyState";
import ImpactSection from "../components/ImpactSection";
import Footer from "../components/Footer";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchedIngredients, setSearchedIngredients] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterResetKey, setFilterResetKey] = useState(0);


  // Compute regions directly from recipes
  const regions = [...new Set(recipes.map(r => r.Region).filter(Boolean))].sort();



  const handleResults = (results, ingredients, paginationData) => {
    setRecipes(results || []);
    setSearchedIngredients(ingredients || []);
    setPagination(paginationData || null);
    setHasSearched(true);
    setCurrentPage(1);
    setFilterResetKey(prev => prev + 1);
  };

  const applyFilter = async (type, params) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/recipes/${type}`,
        { params }
      );

      if (response.data.success) {
        setRecipes(response.data.recipes || []);
        setPagination(response.data.pagination || null);
        setHasSearched(true);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Filter failed:", error);
    }
  };

  const loadMore = async () => {
    if (!pagination?.hasNextPage) return;

    try {
      const nextPage = currentPage + 1;

      const response = await axios.post(
        `${API_BASE_URL}/api/recipes/search`,
        {
          ingredients: searchedIngredients,
          page: nextPage,
        }
      );

      if (response.data.success) {
        setRecipes((prev) => [
          ...prev,
          ...(response.data.recipes || []),
        ]);

        setPagination(response.data.pagination || null);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Load more failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/30 to-green-50">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <IntelligenceModules />

        <IngredientAnalyzer onResults={handleResults} />

        <AdvancedFilters
        key={filterResetKey}
          applyFilter={applyFilter}
          regions={regions}
        />

        <div id="results">
          {hasSearched && recipes.length > 0 && (
            <RecipeResults
              recipes={recipes}
              ingredients={searchedIngredients}
              pagination={pagination}
              loadMore={loadMore}
            />
          )}

          {hasSearched && recipes.length === 0 && <EmptyState />}
        </div>

        <ImpactSection />
        <Footer />
      </div>
    </div>
  );
}
