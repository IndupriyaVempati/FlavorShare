import React, { useEffect, useState } from "react";
import {
  fetchRecipes,
  likeRecipe,
  unlikeRecipe,
  fetchLikedRecipes,
} from "../api";

const RecipeList = ({ updateLikedRecipes }) => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState(new Set());
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Added search term

  // ✅ Fetch Recipes and Liked Recipes
  useEffect(() => {
    fetchRecipes()
      .then((res) => setRecipes(res))
      .catch((err) => console.error(err));

    const token = localStorage.getItem("token");
    fetchLikedRecipes(token)
      .then((liked) => setLikedRecipes(new Set(liked.map((r) => r._id))))
      .catch((err) => console.error("Error fetching liked recipes:", err));
  }, []);

  // ✅ Handle Like
  const handleLike = async (recipeId) => {
    const token = localStorage.getItem("token");

    try {
      await likeRecipe(recipeId, token);
      alert("✅ Recipe liked!");

      setLikedRecipes((prev) => new Set(prev).add(recipeId));

      if (updateLikedRecipes) updateLikedRecipes();
    } catch (err) {
      console.error("Error liking recipe:", err);
    }
  };

  // ✅ Handle Unlike
  const handleUnlike = async (recipeId) => {
    const token = localStorage.getItem("token");

    try {
      await unlikeRecipe(recipeId, token);
      alert("❌ Recipe unliked!");

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

  // ✅ Handle Expand/Collapse
  const handleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  // ✅ FILTER Recipes based on Search
  const filteredRecipes = recipes.filter((recipe) => {
    const lowerSearch = searchTerm.toLowerCase();
    return recipe.title.toLowerCase().includes(lowerSearch);
  });

  return (
    <div className="container">
      {/* ✅ Heading with Search Bar */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="text-center">🌍 World of RECIPES!</h2>

        {/* ✅ Search Bar */}
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Search recipes by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ✅ Display Recipes */}
      <div className="row">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm rounded-3">
                {/* ✅ SMALLER IMAGE SIZE */}
                {recipe.image && (
                  <img
                    src={`http://localhost:5000${recipe.image}`}
                    alt={recipe.title}
                    className="card-img-top"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                )}

                {/* ✅ CARD BODY */}
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{recipe.title}</h5>

                  {/* ✅ Read More / Collapse */}
                  {expandedCard === recipe._id ? (
                    <>
                      <p>
                        <strong>Ingredients:</strong> {recipe.ingredients}
                      </p>
                      <p>
                        <strong>Instructions:</strong> {recipe.instructions}
                      </p>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleExpand(recipe._id)}
                      >
                        📕 Collapse
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleExpand(recipe._id)}
                      >
                        📖 Read More
                      </button>
                    </>
                  )}

                  {/* ✅ Like / Unlike Button */}
                  <div className="mt-3">
                    {likedRecipes.has(recipe._id) ? (
                      <button
                        onClick={() => handleUnlike(recipe._id)}
                        className="btn btn-danger btn-sm mx-1"
                      >
                        ❤️ Unlike
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLike(recipe._id)}
                        className="btn btn-primary btn-sm mx-1"
                      >
                        💖 Like
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center mt-4">😞 No Recipes Found...</h5>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
