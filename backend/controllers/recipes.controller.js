import { hybridAdvancedSearch } from "../services/hybridEngine.js";
import { fetchByIngredients } from "../services/recipes.service.js";
import axios from "axios";
const ingredientCache = new Map();

/* ===============================
   ADVANCED SEARCH CONTROLLER
================================= */
export const handleAdvancedSearch = async (req, res) => {
  try {
    const filters = {
      region: req.query.region || "",
      diet: req.query.diet || "",
      cuisine: req.query.cuisine || "",
      minCalories: req.query.minCalories
        ? Number(req.query.minCalories)
        : undefined,
      maxCalories: req.query.maxCalories
        ? Number(req.query.maxCalories)
        : undefined,
      minProtein: req.query.minProtein
        ? Number(req.query.minProtein)
        : undefined,
      maxProtein: req.query.maxProtein
        ? Number(req.query.maxProtein)
        : undefined,
      minCarbs: req.query.minCarbs
        ? Number(req.query.minCarbs)
        : undefined,
      maxCarbs: req.query.maxCarbs
        ? Number(req.query.maxCarbs)
        : undefined,
      limit: req.query.limit ? Number(req.query.limit) : 20,
    };

    const recipes = await hybridAdvancedSearch(filters);

    return res.json({
      success: true,
      count: recipes?.length || 0,
      recipes: recipes || [],
    });

  } catch (error) {
    console.error("Hybrid Advanced Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Advanced search failed",
    });
  }
};


/* ===============================
   INGREDIENT SEARCH CONTROLLER
================================= */


export const handleIngredientSearch = async (req, res) => {
  try {
    const { ingredients, page = 1 } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.json({
        success: true,
        recipes: [],
        pagination: null,
      });
    }

    const response = await axios.get(
      `${process.env.RECIPEDB_BASE_URL}/recipe2-api/recipebyingredient/by-ingredients-categories-title`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FOODOSCOPE_API_KEY}`,
        },
        params: {
          includeIngredients: ingredients.join(","),
          page,
          limit: 25,
        },
      }
    );

    return res.json({
      success: true,
      recipes: response.data?.payload?.data || [],
      pagination: response.data?.payload?.pagination || null,
    });

  } catch (error) {
    console.error("Ingredient Search Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      recipes: [],
      pagination: null,
    });
  }
};


// import axios from "axios";

export const handleCuisineFilter = async (req, res) => {
  try {
    const { region, continent, subRegion, page = 1 } = req.query;

    if (!region) {
      return res.json({
        success: false,
        recipes: [],
        pagination: null,
      });
    }

    const response = await axios.get(
      `${process.env.RECIPEDB_BASE_URL}/recipe2-api/recipes_cuisine/cuisine/${region}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FOODOSCOPE_API_KEY}`,
        },
        params: {
          continent,
          subRegion,
          page,
          page_size: 10,
        },
      }
    );

    return res.json({
      success: true,
      recipes: response.data.data || [],
      pagination: response.data.pagination || null,
    });

  } catch (error) {
    console.error("Cuisine Filter Error:", error.response?.data || error.message);

    return res.json({
      success: false,
      recipes: [],
      pagination: null,
    });
  }
};





export const handleFlavorFilter = async (req, res) => {
  try {
    const { flavor, page = 1 } = req.query;

    if (!flavor) {
      return res.json({
        success: false,
        recipes: [],
        pagination: null,
      });
    }

    const response = await axios.get(
      `${process.env.RECIPEDB_BASE_URL}/recipe2-api/ingredients/flavor/${flavor}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FOODOSCOPE_API_KEY}`,
        },
        params: {
          page,
          limit: 10,
        },
      }
    );

    console.log("FLAVOR API RESPONSE:", response.data);

    return res.json({
      success: true,
      recipes: response.data.data || [],
      pagination: response.data.pagination || null,
    });

  } catch (error) {
    console.error("Flavor filter error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      recipes: [],
      pagination: null,
    });
  }
};




export const handleDietRegionFilter = async (req, res) => {
  try {
    const { region, diet, limit = 10, page = 1 } = req.query;

    const response = await axios.get(
      `${process.env.RECIPEDB_BASE_URL}/recipe2-api/recipe/region-diet/region-diet`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FOODOSCOPE_API_KEY}`,
        },
        params: {
          region,
          diet,
          limit,
          page,
        },
      }
    );

    const safeResponse = {
      success: true,
      recipes: response.data?.data || [],
      pagination: response.data?.pagination || null,
    };

    return res.json(safeResponse);

  } catch (error) {
    console.error("Diet Region Filter Error:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);

    return res.status(500).json({
      success: false,
      recipes: [],
      pagination: null,
    });
  }
};





export const handleCaloriesFilter = async (req, res) => {
  try {
    const { minCalories, maxCalories, page = 1 } = req.query;

    if (!minCalories || !maxCalories) {
      return res.json({
        success: false,
        recipes: [],
        pagination: null,
      });
    }

    const response = await axios.get(
      `${process.env.RECIPEDB_BASE_URL}/recipe2-api/recipes-calories/calories`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FOODOSCOPE_API_KEY}`,
        },
        params: {
          minCalories: Number(minCalories),
          maxCalories: Number(maxCalories),
          limit: 10,
        },
      }
    );

    return res.json({
      success: true,
      recipes: response.data.data || [],
      pagination: response.data.pagination || null,
    });

  } catch (error) {
    console.error("Calories Filter Error:", error.response?.data || error.message);

    return res.json({
      success: false,
      recipes: [],
      pagination: null,
    });
  }
};








