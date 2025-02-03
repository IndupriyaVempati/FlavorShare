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
    const response = await API.post(
      `/api/like-recipe/${recipeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API: Error liking recipe", error);
    throw error;
  }
};

export const fetchLikedRecipes = async (token) => {
  try {
    const response = await API.get("/api/liked-recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API: Error fetching liked recipes", error);
    throw error;
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
