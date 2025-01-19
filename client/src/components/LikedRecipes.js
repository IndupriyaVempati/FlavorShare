import React, { useState, useEffect } from "react";
import { fetchLikedRecipes } from "../api";

const LikedRecipes = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

  useEffect(() => {
    const fetchUserLikedRecipes = async () => {
      try {
        const recipes = await fetchLikedRecipes(token); // Pass the token
        setLikedRecipes(recipes);
      } catch (err) {
        console.error("Error fetching liked recipes:", err);
      }
    };

    if (token) {
      fetchUserLikedRecipes();
    }
  }, [token]);

  return (
    <div className="container">
      <h2 className="text-center my-4">Your Liked Recipes</h2>
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
