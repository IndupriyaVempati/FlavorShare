import React, { useState, useEffect } from "react";
import { fetchLikedRecipes } from "../api";

// Function to unlike a recipe
const unlikeRecipe = async (token, recipeId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/unlike-recipe/${recipeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      console.log("Recipe unliked successfully");
      return true; // Return true if unliked successfully
    } else {
      console.error("Failed to unlike the recipe");
      return false; // Return false if something went wrong
    }
  } catch (error) {
    console.error("Error unliking the recipe:", error);
    return false;
  }
};

const LikedRecipes = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchLikedRecipes(token).then((recipes) => setLikedRecipes(recipes));
    }
  }, [token]);

  // Handle the unlike functionality
  const handleUnlike = async (recipeId) => {
    const success = await unlikeRecipe(token, recipeId);
    if (success) {
      // Remove the recipe from the likedRecipes state after unliking
      setLikedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Your Liked Recipes :)</h2>
      <div className="row">
        {likedRecipes.length > 0 ? (
          likedRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-4">
              <div className="card h-100">
                {recipe.image && (
                  <img
                    src={`http://localhost:5000${recipe.image}`}
                    alt={recipe.title}
                    className="card-img-top"
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.ingredients}</p>
                  <p className="card-text">{recipe.instructions}</p>
                  {/* Add Unlike Button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUnlike(recipe._id)}
                  >
                    Unlike
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No liked recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default LikedRecipes;
