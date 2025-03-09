import axios from "axios";

// Create an axios instance with the base URL for the API
const API = axios.create({ baseURL: "http://localhost:5000" });

export const uploadRecipe = (data) => {
  console.log("API: Uploading recipe with data:", data);
  return API.post("/recipes", data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("API: Error uploading recipe", error);
      throw error;
    });
};

export const likeRecipe = async (recipeId, token) => {
  try {
    await API.post(
      `/api/like-recipe/${recipeId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
  } catch (error) {
    console.error("Error liking recipe:", error);
  }
};

export const unlikeRecipe = async (recipeId, token) => {
  try {
    const response = await API.delete(
      `/api/unlike-recipe/${recipeId}`, // Ensure backend supports DELETE for unliking
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error unliking recipe:", error);
    throw error;
  }
};

export const fetchLikedRecipes = async (token) => {
  try {
    const response = await API.get("/api/liked-recipes", {
      headers: { Authorization: token },
    });
    return response.data || []; // Ensure only liked recipes are returned
  } catch (error) {
    console.error("Error fetching liked recipes:", error);
    return [];
  }
};

export const fetchRecipes = () => {
  console.log("API: Fetching all recipes");
  return API.get("/recipes")
    .then((response) => {
      console.log("API: Recipes fetched successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("API: Error fetching all recipes:", error);
      throw error;
    });
};
