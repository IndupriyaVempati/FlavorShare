import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate, Navigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { Carousel, Card, Button, Row, Col } from "react-bootstrap";
import RecipeList from "./RecipeList";
import UploadRecipe from "./UploadRecipe";

import Register from "./Register";
import Login from "./Login";
import LikedRecipes from "./LikedRecipes";
import Sfood from "../images/northindianfood.webp";
import Nfood from "../images/southindianfood.jpg";
import Jfood from "../images/junkfood.jpg";
import Dashboard from "./Dashboard";
import "./Home.css";



const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  // Handle Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div>
      {/* ====================== NAVBAR ====================== */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          {/* Brand Logo */}
          <Link
            className="navbar-brand d-flex align-items-center brand-logo"
            to="/"
          >
            <FaUtensils className="me-2 icon-glow" size={30} />
            <span className="fs-4 brand-text">FlavorShare</span>
          </Link>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Home Link */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${window.location.pathname === "/" ? "active-link" : ""
                    }`}
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* If NOT Authenticated */}
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${window.location.pathname === "/register"
                          ? "active-link"
                          : ""
                        }`}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${window.location.pathname === "/login"
                          ? "active-link"
                          : ""
                        }`}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}

              {/* If Authenticated */}
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${window.location.pathname === "/dashboard"
                          ? "active-link"
                          : ""
                        }`}
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link logout-btn btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Carousel */}

                <div className="carousel-container">
                  <Carousel interval={3000} fade>
                    {/* North Indian Food */}
                    <Carousel.Item>
                      <img
                        className="d-block w-100 food-image"
                        src={Sfood}
                        alt="North Indian Food"
                      />
                      <div className="food-caption">
                        <h3>🍲 Delicious North Indian Food</h3>
                        <p>
                          Explore the rich and authentic flavors of North India.
                        </p>
                      </div>
                    </Carousel.Item>

                    {/* South Indian Food */}
                    <Carousel.Item>
                      <img
                        className="d-block w-100 food-image"
                        src={Nfood}
                        alt="South Indian Food"
                      />
                      <div className="food-caption">
                        <h3>🍛 Yummy South Indian Delights</h3>
                        <p>Spicy, savory, and flavorful dishes to savor!</p>
                      </div>
                    </Carousel.Item>

                    {/* Junk Food */}
                    <Carousel.Item>
                      <img
                        className="d-block w-100 food-image"
                        src={Jfood}
                        alt="Junk Food"
                      />
                      <div className="food-caption">
                        <h3>🍔 Scrumptious Junk Food</h3>
                        <p>Your guilty pleasure, comfort food at its finest.</p>
                      </div>
                    </Carousel.Item>
                  </Carousel>
                </div>

                {/* Welcome Section */}
                <div className="text-center my-5 text-white">
                  <h1 className="gradient-text animate-fade-in text-white">
                    🍲 Welcome to FlavorShare 🍲
                  </h1>
                  <p className="description animate-fade-in-delay text-white">
                    Discover mouth-watering recipes, explore new flavors, and enjoy the art of cooking like never before!
                  </p>
                </div>

                <h2 className="text-center mt-5 mb-4 text-white">Top Cooking Tips</h2>

                <Row xs={1} md={2} lg={3} className="g-4">
                  {/* ================ CARD 1 ================ */}
                  <Col>
                    <Card className="h-100 shadow-lg dashy">
                      <Card.Body>
                        <Card.Title>How to Perfect Your Curry</Card.Title>
                        <Card.Text>
                          Learn the secrets to creating a perfectly balanced
                          curry every time. Pro tips for flavor layering.
                        </Card.Text>

                        {/* EXPANDABLE SECTION */}
                        <div id="curry-more" style={{ display: "none" }}>
                          <hr />
                          <p>
                            <b>Extra Tips:</b> Always roast your spices in low
                            flame to extract maximum aroma.
                          </p>
                          <p>
                            <b>Ingredients:</b>
                          </p>
                          <ul>
                            <li>2 Onions (chopped)</li>
                            <li>3 Tomatoes (chopped)</li>
                            <li>2 tbsp Oil</li>
                            <li>Spices (as per taste)</li>
                          </ul>
                        </div>

                        {/* DYNAMIC BUTTON */}
                        <Button
                          style={{
                            backgroundColor: "#ff4500",
                            borderColor: "#ff4500",
                            color: "white",
                          }}
                          onClick={() => {
                            const content =
                              document.getElementById("curry-more");
                            const button = document.getElementById("curry-btn");
                            if (content.style.display === "none") {
                              content.style.display = "block";
                              button.innerText = "Read Less";
                            } else {
                              content.style.display = "none";
                              button.innerText = "Read More";
                            }
                          }}
                          id="curry-btn"
                        >
                          Read More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* ================ CARD 2 ================ */}
                  <Col>
                    <Card className="h-100 shadow-lg dashy">
                      <Card.Body>
                        <Card.Title>Quick Knife Skills</Card.Title>
                        <Card.Text>
                          Save time in the kitchen with essential knife skills.
                          Chop like a pro!
                        </Card.Text>

                        {/* EXPANDABLE SECTION */}
                        <div id="knife-more" style={{ display: "none" }}>
                          <hr />
                          <p>
                            <b>Pro Tip:</b> Always use a sharp knife for fast
                            chopping.
                          </p>
                          <p>
                            <b>Recommended Tools:</b>
                          </p>
                          <ul>
                            <li>Sharp Knife</li>
                            <li>Cutting Board</li>
                            <li>Fresh Vegetables</li>
                          </ul>
                        </div>

                        {/* DYNAMIC BUTTON */}
                        <Button
                          style={{
                            backgroundColor: "#ff4500",
                            borderColor: "#ff4500",
                            color: "white",
                          }}
                          onClick={() => {
                            const content =
                              document.getElementById("knife-more");
                            const button = document.getElementById("knife-btn");
                            if (content.style.display === "none") {
                              content.style.display = "block";
                              button.innerText = "Read Less";
                            } else {
                              content.style.display = "none";
                              button.innerText = "Read More";
                            }
                          }}
                          id="knife-btn"
                        >
                          Read More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* ================ CARD 3 ================ */}
                  <Col>
                    <Card className="h-100 shadow-lg dashy">
                      <Card.Body>
                        <Card.Title>Perfect Rice Every Time</Card.Title>
                        <Card.Text>
                          Struggling with sticky rice? Learn the best method.
                        </Card.Text>

                        {/* EXPANDABLE SECTION */}
                        <div id="rice-more" style={{ display: "none" }}>
                          <hr />
                          <p>
                            <b>Pro Tip:</b> Always rinse rice before cooking for
                            fluffy grains.
                          </p>
                          <p>
                            <b>Ingredients:</b>
                          </p>
                          <ul>
                            <li>1 cup Basmati Rice</li>
                            <li>2 cups Water</li>
                            <li>Salt (optional)</li>
                          </ul>
                        </div>

                        {/* DYNAMIC BUTTON */}
                        <Button
                          style={{
                            backgroundColor: "#ff4500",
                            borderColor: "#ff4500",
                            color: "white",
                          }}
                          onClick={() => {
                            const content =
                              document.getElementById("rice-more");
                            const button = document.getElementById("rice-btn");
                            if (content.style.display === "none") {
                              content.style.display = "block";
                              button.innerText = "Read Less";
                            } else {
                              content.style.display = "none";
                              button.innerText = "Read More";
                            }
                          }}
                          id="rice-btn"
                        >
                          Read More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Food Facts Section */}
                <h2 className="text-center mt-5 mb-4 text-white">
                  Interesting Food Facts
                </h2>
                <Row xs={1} md={2} lg={3} className="g-4">
                  <Col>
                    <Card className="h-100 shadow-lg dashy">
                      <Card.Body>
                        <Card.Title>Did You Know?</Card.Title>
                        <Card.Text>
                          Honey never spoils. Archaeologists have found pots of
                          honey in ancient tombs that are over 3,000 years old
                          and still safe to eat!
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100 shadow-lg dashy">
                      <Card.Body>
                        <Card.Title>Did You Know?</Card.Title>
                        <Card.Text>
                          The world’s most expensive coffee comes from beans
                          that have been eaten and excreted by civet cats!
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100 shadow-lg dashy">
                      <Card.Body>
                        <Card.Title>Did You Know?</Card.Title>
                        <Card.Text>
                          Carrots were originally purple before the orange
                          variety was cultivated in the 17th century.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* Inspirational Quotes Section */}
                <div className="text-center my-5">
                  {/* <h3 className="mb-4">Food Quotes</h3> */}
                  <blockquote
                    className="blockquote"
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "1rem",
                      borderRadius: "10px",
                    }}
                  >
                    <p>"The secret ingredient is always love."</p>
                    <footer className="blockquote-footer">Anonymous</footer>
                  </blockquote>
                  <blockquote
                    className="blockquote"
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "1rem",
                      borderRadius: "10px",
                    }}
                  >
                    <p>"Food is not just eating energy. It's an experience."</p>
                    <footer className="blockquote-footer">Guy Fieri</footer>
                  </blockquote>
                </div>
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          {/* Protected Routes - Only accessible if logged in */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          >
            <Route path="explore" element={<RecipeList />} />
            {/* <Route path="/dashboard/upload" element={<UploadRecipe />} /> */}
            {/* <Route path="/dashboard/explore" element={<ExploreRecipes />} /> */}
            <Route path="upload" element={<UploadRecipe />} />
            <Route path="likedrecipes" element={<LikedRecipes />} />
          </Route>
        </Routes>
      </main>

      {/* Footer */}
      <footer className="custom-footer mt-5">
        <div className="footer-container">
          {/* Logo Section */}
          <div className="footer-logo">
            <h3>🍳 FlavorShare</h3>
            <p>Delicious Recipes Just a Click Away!</p>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p className="text-white">&copy; 2025 FlavorShare. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
