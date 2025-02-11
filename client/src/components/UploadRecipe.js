// // import React, { useState } from "react";
// // import { uploadRecipe } from "../api";

// // const UploadRecipe = () => {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     ingredients: "",
// //     instructions: "",
// //     image: null,
// //     category: "Veg", // Default to Veg
// //     cuisine: "Indian", // Default cuisine
// //     prepTime: "", // Preparation Time
// //     servingSize: "", // Serving Size
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleFileChange = (e) => {
// //     setFormData({ ...formData, image: e.target.files[0] });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const data = new FormData();
// //     data.append("title", formData.title);
// //     data.append("ingredients", formData.ingredients);
// //     data.append("instructions", formData.instructions);
// //     data.append("category", formData.category);
// //     data.append("cuisine", formData.cuisine);
// //     data.append("prepTime", formData.prepTime);
// //     data.append("servingSize", formData.servingSize);
// //     if (formData.image) data.append("image", formData.image);

// //     try {
// //       await uploadRecipe(data);
// //       alert("Recipe uploaded successfully!");
// //       setFormData({
// //         title: "",
// //         ingredients: "",
// //         instructions: "",
// //         image: null,
// //         category: "Veg",
// //         cuisine: "Indian",
// //         prepTime: "",
// //         servingSize: "",
// //       });
// //     } catch (error) {
// //       alert("Failed to upload recipe");
// //     }
// //   };

// //   return (
// //     <div className="container my-5">
// //       <h2 className="text-center mb-4">Upload a Recipe</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-3">
// //           <label htmlFor="title" className="form-label">
// //             Title
// //           </label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="title"
// //             name="title"
// //             value={formData.title}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label htmlFor="ingredients" className="form-label">
// //             Ingredients
// //           </label>
// //           <textarea
// //             className="form-control"
// //             id="ingredients"
// //             name="ingredients"
// //             rows="4"
// //             value={formData.ingredients}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>

// //         <div className="mb-3">
// //           <label htmlFor="instructions" className="form-label">
// //             Instructions
// //           </label>
// //           <textarea
// //             className="form-control"
// //             id="instructions"
// //             name="instructions"
// //             rows="4"
// //             value={formData.instructions}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>

// //         {/* Category Selection */}
// //         <div className="mb-3">
// //           <label htmlFor="category" className="form-label">
// //             Category
// //           </label>
// //           <select
// //             className="form-control"
// //             id="category"
// //             name="category"
// //             value={formData.category}
// //             onChange={handleChange}
// //             required
// //           >
// //             <option value="Veg">Veg</option>
// //             <option value="Non-Veg">Non-Veg</option>
// //             <option value="Vegan">Vegan</option>
// //           </select>
// //         </div>

// //         {/* Cuisine Selection */}
// //         <div className="mb-3">
// //           <label htmlFor="cuisine" className="form-label">
// //             Cuisine
// //           </label>
// //           <select
// //             className="form-control"
// //             id="cuisine"
// //             name="cuisine"
// //             value={formData.cuisine}
// //             onChange={handleChange}
// //             required
// //           >
// //             <option value="Indian">Indian</option>
// //             <option value="Italian">Italian</option>
// //             <option value="Chinese">Chinese</option>
// //             <option value="Mexican">Mexican</option>
// //             {/* Add more cuisines as needed */}
// //           </select>
// //         </div>

// //         {/* Preparation Time */}
// //         <div className="mb-3">
// //           <label htmlFor="prepTime" className="form-label">
// //             Preparation Time (in minutes)
// //           </label>
// //           <input
// //             type="number"
// //             className="form-control"
// //             id="prepTime"
// //             name="prepTime"
// //             value={formData.prepTime}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>

// //         {/* Image Upload */}
// //         <div className="mb-3">
// //           <label htmlFor="image" className="form-label">
// //             Image
// //           </label>
// //           <input
// //             type="file"
// //             className="form-control"
// //             id="image"
// //             name="image"
// //             onChange={handleFileChange}
// //           />
// //         </div>

// //         <button type="submit" className="btn btn-primary w-100">
// //           Upload Recipe
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UploadRecipe;


// import React, { useState } from "react";
// import { uploadRecipe } from "../api"; // Import the uploadRecipe function

// const UploadRecipe = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     ingredients: "",
//     instructions: "",
//     image: null,
//     category: "Veg", // Default to Veg
//     cuisine: "Indian", // Default cuisine
//     prepTime: "", // Preparation Time
//     servingSize: "", // Serving Size
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("ingredients", formData.ingredients);
//     data.append("instructions", formData.instructions);
//     data.append("category", formData.category);
//     data.append("cuisine", formData.cuisine);
//     data.append("prepTime", formData.prepTime);
//     data.append("servingSize", formData.servingSize);
//     if (formData.image) data.append("image", formData.image);

//     try {
//       await uploadRecipe(data); // Call the uploadRecipe function from api.js
//       alert("Recipe uploaded successfully!");
//       setFormData({
//         title: "",
//         ingredients: "",
//         instructions: "",
//         image: null,
//         category: "Veg",
//         cuisine: "Indian",
//         prepTime: "",
//         servingSize: "",
//       });
//     } catch (error) {
//       alert("Failed to upload recipe");
//     }
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="text-center mb-4">Upload a Recipe</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="title" className="form-label">
//             Title
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="ingredients" className="form-label">
//             Ingredients
//           </label>
//           <textarea
//             className="form-control"
//             id="ingredients"
//             name="ingredients"
//             rows="4"
//             value={formData.ingredients}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="instructions" className="form-label">
//             Instructions
//           </label>
//           <textarea
//             className="form-control"
//             id="instructions"
//             name="instructions"
//             rows="4"
//             value={formData.instructions}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Category Selection */}
//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">
//             Category
//           </label>
//           <select
//             className="form-control"
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="Veg">Veg</option>
//             <option value="Non-Veg">Non-Veg</option>
//             <option value="Vegan">Vegan</option>
//           </select>
//         </div>

//         {/* Cuisine Selection */}
//         <div className="mb-3">
//           <label htmlFor="cuisine" className="form-label">
//             Cuisine
//           </label>
//           <select
//             className="form-control"
//             id="cuisine"
//             name="cuisine"
//             value={formData.cuisine}
//             onChange={handleChange}
//             required
//           >
//             <option value="Indian">Indian</option>
//             <option value="Italian">Italian</option>
//             <option value="Chinese">Chinese</option>
//             <option value="Mexican">Mexican</option>
//             {/* Add more cuisines as needed */}
//           </select>
//         </div>

//         {/* Preparation Time */}
//         <div className="mb-3">
//           <label htmlFor="prepTime" className="form-label">
//             Preparation Time (in minutes)
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="prepTime"
//             name="prepTime"
//             value={formData.prepTime}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Image Upload */}
//         <div className="mb-3">
//           <label htmlFor="image" className="form-label">
//             Image
//           </label>
//           <input
//             type="file"
//             className="form-control"
//             id="image"
//             name="image"
//             onChange={handleFileChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           Upload Recipe
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadRecipe;

import React, { useState } from "react";
import { uploadRecipe } from "../api"; // Import the uploadRecipe function
import { useNavigate } from "react-router-dom";


const UploadRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: null,
    category: "Veg", // Default to Veg
    cuisine: "Indian", // Default cuisine
    prepTime: "", // Preparation Time
    servingSize: "", // Serving Size
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("ingredients", formData.ingredients);
    data.append("instructions", formData.instructions);
    data.append("category", formData.category);
    data.append("cuisine", formData.cuisine);
    data.append("prepTime", formData.prepTime);
    data.append("servingSize", formData.servingSize);
    if (formData.image) data.append("image", formData.image);

    try {
      await uploadRecipe(data); // Call the uploadRecipe function from api.js
      alert("Recipe uploaded successfully!");
      setFormData({
        title: "",
        ingredients: "",
        instructions: "",
        image: null,
        category: "Veg",
        cuisine: "Indian",
        prepTime: "",
        servingSize: "",
      });
      console.log("Recipe uploaded:", data);
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to upload recipe");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Share your recipe! ^_^</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">
            Ingredients
          </label>
          <textarea
            className="form-control"
            id="ingredients"
            name="ingredients"
            rows="4"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">
            Instructions
          </label>
          <textarea
            className="form-control"
            id="instructions"
            name="instructions"
            rows="4"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category Selection */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Vegan">Vegan</option>
          </select>
        </div>

        {/* Cuisine Selection */}
        <div className="mb-3">
          <label htmlFor="cuisine" className="form-label">
            Cuisine
          </label>
          <select
            className="form-control"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
          >
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
            {/* Add more cuisines as needed */}
          </select>
        </div>

        {/* Preparation Time */}
        <div className="mb-3">
          <label htmlFor="prepTime" className="form-label">
            Preparation Time (in minutes)
          </label>
          <input
            type="number"
            className="form-control"
            id="prepTime"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Upload Recipe
        </button>
      </form>
    </div>
  );
};

export default UploadRecipe;
