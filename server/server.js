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
app.use(
  cors({
    origin: ["http://localhost:3000", "https://flavorshare.vercel.app"],
  })
);
app.use("/uploads", express.static("uploads"));

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
  age: Number, // ✅ Added Age
  profileImg: String, // ✅ Added Profile Image
});

const User = mongoose.model("User", userSchema);

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  instructions: String,
  image: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

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
    const newUser = new User({ name, email, password: hashedPassword });

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
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error during login" });
  }
});

// 3. Upload Recipe
app.post("/recipes", upload.single("image"), async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

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

// 4. Get All Recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// 5. Like a Recipe
app.post("/api/like-recipe/:id", verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

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

// 6. Unlike a Recipe
app.delete("/api/unlike-recipe/:id", verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const index = recipe.likedBy.indexOf(userId);
    if (index !== -1) {
      recipe.likedBy.splice(index, 1);
      await recipe.save();
    }

    res.status(200).json({ message: "Recipe unliked successfully" });
  } catch (err) {
    console.error("Error unliking recipe:", err);
    res.status(500).json({ message: "Error unliking recipe" });
  }
});

// 7. Get Liked Recipes for Logged-in User
app.get("/api/liked-recipes", verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const likedRecipes = await Recipe.find({ likedBy: userId });
    res.status(200).json(likedRecipes);
  } catch (err) {
    console.error("Error fetching liked recipes:", err);
    res.status(500).json({ message: "Error fetching liked recipes" });
  }
});

// 8. Unlike a Recipe
app.post("/api/unlike-recipe/:id", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Remove user from likedBy array
    recipe.likedBy = recipe.likedBy.filter((id) => id.toString() !== userId);
    await recipe.save();

    res.status(200).json({ message: "Recipe unliked successfully" });
  } catch (err) {
    console.error("Error unliking recipe:", err);
    res.status(500).json({ message: "Error unliking recipe" });
  }
});
//get-user
app.get("/api/user/get-user", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      age: user.age,
      profileImg: user.profileImg,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user details" });
  }
});

// ✅ Update User Settings API
app.post(
  "/api/user/update-settings",
  verifyToken,
  upload.single("profileImg"),
  async (req, res) => {
    try {
      const userId = req.userId;
      const { name, age } = req.body;
      const profileImg = req.file ? `/uploads/${req.file.filename}` : null;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // ✅ Update Fields
      user.name = name || user.name;
      user.age = age || user.age;
      if (profileImg) user.profileImg = profileImg;

      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  }
);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
