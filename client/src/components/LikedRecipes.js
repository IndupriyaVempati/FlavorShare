import React, { useState, useEffect } from "react";
import { fetchLikedRecipes } from "../api";
import RecipePDF from "./RecipePDF";
import "./LikedRecipes.css";

// Function to unlike a recipe
const unlikeRecipe = async (token, recipeId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/unlike-recipe/${recipeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.ok) {
      console.log("Recipe unliked successfully");
      return true;
    } else {
      console.error("Failed to unlike the recipe");
      return false;
    }
  } catch (error) {
    console.error("Error unliking the recipe:", error);
    return false;
  }
};

const LikedRecipes = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const token = localStorage.getItem("token");
  const [currentStep, setCurrentStep] = useState(0);
  const speech = new SpeechSynthesisUtterance();

  // ✅ Fetch Liked Recipes
  useEffect(() => {
    if (token) {
      fetchLikedRecipes(token).then((recipes) => setLikedRecipes(recipes));
    }
  }, [token]);

  // ✅ Handle Unlike
  const handleUnlike = async (recipeId) => {
    const success = await unlikeRecipe(token, recipeId);
    if (success) {
      setLikedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    }
  };

  const handleShareWhatsApp = () => {
    const message = `Hey! I found this amazing recipe:
    🍲 *${selectedRecipe.title}* 🍲
    Ingredients: ${selectedRecipe.ingredients}
    Instructions: ${selectedRecipe.instructions}
    `;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  // ✅ Handle View Details
  const handleViewDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentStep(0);
  };

  // ✅ Handle AI Read Step by Step
  const handleNextStep = () => {
    if (
      selectedRecipe &&
      currentStep < selectedRecipe.instructions.split(".").length
    ) {
      const step = selectedRecipe.instructions.split(".")[currentStep];
      speech.text = `Step ${currentStep + 1}: ${step}`;
      window.speechSynthesis.speak(speech);
      setCurrentStep(currentStep + 1);
    }
  };

  // ✅ Handle Repeat Step
  const handleRepeatStep = () => {
    const step = selectedRecipe.instructions.split(".")[currentStep - 1];
    speech.text = `Repeating Step ${currentStep}: ${step}`;
    window.speechSynthesis.speak(speech);
  };

  // ✅ Handle Stop Reading
  const handleStopReading = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 text-white">❤️ Your Liked Recipes :)</h2>

      <div className="row">
        {likedRecipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 mb-3">
            <div className="card small-card">
              <img
                src={`http://localhost:5000${recipe.image}`}
                alt={recipe.title}
                className="card-img-top small-img"
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>

                <button
                  className="btn btn-danger"
                  onClick={() => handleUnlike(recipe._id)}
                >
                  ❌ Unlike
                </button>

                <button
                  className="btn btn-info"
                  onClick={() => handleViewDetails(recipe)}
                >
                  📖 View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {selectedRecipe && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedRecipe.title}</h3>
            <h5>Ingredients:</h5>
            <ul>
              {selectedRecipe.ingredients.split(",").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h5>Instructions:</h5>
            <ol>
              {selectedRecipe.instructions.split(".").map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            {/* ✅ AI Buttons */}
            <button className="btn btn-success" onClick={handleNextStep}>
              ▶️ Next Step
            </button>
            <button className="btn btn-warning" onClick={handleRepeatStep}>
              🔁 Repeat Step
            </button>
            <button className="btn btn-dark" onClick={handleStopReading}>
              ⏹️ Stop Reading
            </button>
            {/* ✅ AI Help Section */}

            {/* ✅ PDF Download */}
            <RecipePDF recipe={selectedRecipe} />
            <button className="btn btn-success" onClick={handleShareWhatsApp}>
              📲 Share on WhatsApp
            </button>

            <button
              className="btn btn-danger"
              onClick={() => setSelectedRecipe(null)}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedRecipes;
