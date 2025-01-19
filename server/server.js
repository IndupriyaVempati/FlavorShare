const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve images from the 'uploads' folder

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  instructions: String,
  image: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // New field to store liked user IDs
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Multer: Setting destination for file uploads");
    cb(null, "uploads/"); // Directory where the files will be stored
  },
  filename: (req, file, cb) => {
    console.log(
      `Multer: Saving file with name ${Date.now()}-${file.originalname}`
    );
    cb(null, Date.now() + "-" + file.originalname); // Name of the file
  },
});

const upload = multer({ storage });

// API Endpoints

// 1. User Registration
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Error during registration" });
  }
});

// 2. User Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error during login" });
  }
});

// 3. Protected Route Example (Requires Authentication)
app.get("/api/protected", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    res.status(200).json({ message: "Protected data accessed" });
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

// 4. Upload Recipe
app.post("/recipes", upload.single("image"), async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Image path to be stored

  try {
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      image: imagePath,
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to upload recipe" });
  }
});

// 5. Get All Recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Like a Recipe
app.post("/api/like-recipe/:id", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const recipeId = req.params.id;

    // Find the recipe and add user to likedBy if not already liked
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (!recipe.likedBy.includes(userId)) {
      recipe.likedBy.push(userId);
      await recipe.save();
    }

    res.status(200).json({ message: "Recipe liked successfully" });
  } catch (err) {
    console.error("Error liking recipe:", err);
    res.status(500).json({ message: "Error liking recipe" });
  }
});

// Get Liked Recipes for Logged-in User
app.get("/api/liked-recipes", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch recipes liked by the user
    const likedRecipes = await Recipe.find({ likedBy: userId });
    res.status(200).json(likedRecipes);
  } catch (err) {
    console.error("Error fetching liked recipes:", err);
    res.status(500).json({ message: "Error fetching liked recipes" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
