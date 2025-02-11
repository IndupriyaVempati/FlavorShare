import React, { useEffect, useState } from "react";
import { fetchRecipes, likeRecipe, unlikeRecipe, fetchLikedRecipes } from "../api";

const RecipeList = ({ updateLikedRecipes }) => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState(new Set());

  useEffect(() => {
    fetchRecipes()
      .then((res) => setRecipes(res))
      .catch((err) => console.error(err));

    // Fetch liked recipes on mount
    const token = localStorage.getItem("token");
    fetchLikedRecipes(token)
      .then((liked) => setLikedRecipes(new Set(liked.map((r) => r._id))))
      .catch((err) => console.error("Error fetching liked recipes:", err));
  }, []);

  const handleLike = async (recipeId) => {
    const token = localStorage.getItem("token");

    try {
      await likeRecipe(recipeId, token);
      alert("Recipe liked!");

      setLikedRecipes((prev) => new Set(prev).add(recipeId));

      if (updateLikedRecipes) updateLikedRecipes();
    } catch (err) {
      console.error("Error liking recipe:", err);
    }
  };

  const handleUnlike = async (recipeId) => {
    const token = localStorage.getItem("token");

    try {
      await unlikeRecipe(recipeId, token);
      alert("Recipe unliked!");

      setLikedRecipes((prev) => {
        const updated = new Set(prev);
        updated.delete(recipeId);
        return updated;
      });

      if (updateLikedRecipes) updateLikedRecipes();
    } catch (err) {
      console.error("Error unliking recipe:", err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">World of RECIPES!</h2>
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

                {likedRecipes.has(recipe._id) ? (
                  <button
                    onClick={() => handleUnlike(recipe._id)}
                    className="btn btn-danger"
                  >
                    Unlike
                  </button>
                ) : (
                  <button
                    onClick={() => handleLike(recipe._id)}
                    className="btn btn-primary"
                  >
                    Like
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
