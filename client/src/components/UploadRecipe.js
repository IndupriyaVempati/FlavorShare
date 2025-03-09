import React, { useState } from "react";
import { uploadRecipe } from "../api";
import "./UploadRecipe.css";

const UploadRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Check if any field is empty
    if (!title || !ingredients || !instructions || !image) {
      setError("⚠️ All fields are mandatory!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      await uploadRecipe(formData, token);
      alert("✅ Recipe uploaded successfully!");
      setTitle("");
      setIngredients("");
      setInstructions("");
      setImage(null);
    } catch (err) {
      console.error("Error uploading recipe:", err);
      setError("❌ Failed to upload recipe. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2 className="text-center my-4">🍲 Upload Your Recipe</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="upload-form">
        {/* ✅ Title Field */}
        <div className="form-group">
          <label>🍛 Recipe Title</label>
          <input
            type="text"
            placeholder="Enter Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* ✅ Ingredients Field */}
        <div className="form-group">
          <label>📝 Ingredients</label>
          <textarea
            rows="3"
            placeholder="List ingredients separated by commas"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        {/* ✅ Instructions Field */}
        <div className="form-group">
          <label>📖 Instructions</label>
          <textarea
            rows="4"
            placeholder="Write step-by-step instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        {/* ✅ Image Upload */}
        <div className="form-group">
          <label>📸 Upload Recipe Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* ✅ Submit Button */}
        <button type="submit" className="upload-btn">
          🚀 Upload Recipe
        </button>
      </form>
    </div>
  );
};

export default UploadRecipe;
