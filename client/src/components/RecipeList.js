import React, { useEffect, useState } from "react";
import { fetchRecipes, likeRecipe, fetchLikedRecipes } from "../api";

const RecipeList = ({ updateLikedRecipes }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes()
      .then((res) => setRecipes(res))
      .catch((err) => console.error(err));
  }, []);

  const handleLike = async (recipeId) => {
    const token = localStorage.getItem("token");

    try {
      await likeRecipe(recipeId, token);
      alert("Recipe liked!");

      // ✅ Update liked recipes immediately
      if (updateLikedRecipes) {
        updateLikedRecipes();
      }
    } catch (err) {
      console.error("Error liking recipe:", err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Recipe List</h2>
      <div className="row">
        {recipes.map((recipe) => (
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
                <button
                  onClick={() => handleLike(recipe._id)}
                  className="btn btn-primary"
                >
                  Like
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
