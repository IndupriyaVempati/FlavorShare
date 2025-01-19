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
import Nfood from "../images/southindianfood.jpeg";
import Jfood from "../images/junkfood.jpeg";
import Dashboard from "./Dashboard";
import "./Home.css";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for authentication status on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    localStorage.setItem("isAuthenticated", "false"); // Update the authentication status
    setIsAuthenticated(false); // Update the state to reflect the logout
    navigate("/"); // Redirect to the home page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <FaUtensils className="me-2" size={30} />
            <span className="fs-4">FlavorShare</span>
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>
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
      <div className="container my-5">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Carousel */}
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 img-fluid"
                      src={Sfood}
                      alt="North Indian Food"
                      style={{ height: "400px", objectFit: "contain" }}
                    />
                    <Carousel.Caption>
                      <h3>Delicious North Indian Food</h3>
                      <p>Explore the rich flavors of India!</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 img-fluid"
                      src={Nfood}
                      alt="South Indian Food"
                      style={{ height: "400px", objectFit: "contain" }}
                    />
                    <Carousel.Caption>
                      <h3>Yummy South Indian Delights</h3>
                      <p>Spicy and savory dishes to savor!</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 img-fluid"
                      src={Jfood}
                      alt="Junk Food"
                      style={{ height: "400px", objectFit: "contain" }}
                    />
                    <Carousel.Caption>
                      <h3>Scrumptious Junk Food</h3>
                      <p>The ultimate comfort food!</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>

                {/* Welcome Section */}
                <h1 className="text-center my-4">Welcome to FlavorShare</h1>
                <p className="text-center mb-5">
                  Discover the best recipes, explore new flavors, and enjoy
                  cooking like never before!
                </p>
                {/* Cooking Tips Section */}
                <h2 className="text-center mt-5 mb-4">Top Cooking Tips</h2>
                <Row xs={1} md={2} lg={3} className="g-4">
                  <Col>
                    <Card className="h-100 shadow-lg">
                      <Card.Body>
                        <Card.Title>How to Perfect Your Curry</Card.Title>
                        <Card.Text>
                          Learn the secrets to creating a perfectly balanced
                          curry every time. Pro tips for flavor layering.
                        </Card.Text>
                        <Button
                          style={{
                            backgroundColor: "#603f8b",
                            borderColor: "#603f8b",
                            color: "white",
                          }}
                        >
                          Read More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100 shadow-lg">
                      <Card.Body>
                        <Card.Title>Quick Knife Skills</Card.Title>
                        <Card.Text>
                          Save time in the kitchen with these essential knife
                          skills. Chop like a pro!
                        </Card.Text>
                        <Button
                          style={{
                            backgroundColor: "#603f8b",
                            borderColor: "#603f8b",
                            color: "white",
                          }}
                        >
                          Read More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100 shadow-lg">
                      <Card.Body>
                        <Card.Title>Perfect Rice Every Time</Card.Title>
                        <Card.Text>
                          Struggling with sticky rice? Here’s the method to cook
                          perfect, fluffy rice every time.
                        </Card.Text>
                        <Button
                          style={{
                            backgroundColor: "#603f8b",
                            borderColor: "#603f8b",
                            color: "white",
                          }}
                        >
                          Read More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Food Facts Section */}
                <h2 className="text-center mt-5 mb-4">
                  Interesting Food Facts
                </h2>
                <Row xs={1} md={2} lg={3} className="g-4">
                  <Col>
                    <Card className="h-100 shadow-lg">
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
                    <Card className="h-100 shadow-lg">
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
                    <Card className="h-100 shadow-lg">
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
            <Route path="upload" element={<UploadRecipe />} />
            <Route path="likedrecipes" element={<LikedRecipes />} />
          </Route>
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="m-0">
          <span className="fs-5">FlavorShare</span> | Delicious Recipes Just a
          Click Away!
        </p>
        <p className="m-0">
          Follow us on{" "}
          <a href="#" className="text-white">
            Instagram
          </a>
        </p>
        <p className="m-0">&copy; 2025 FlavorShare. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
