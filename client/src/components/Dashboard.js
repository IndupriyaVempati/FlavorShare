import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove from localStorage
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>
      <div className="list-group">
        <Link
          to="/dashboard/explore"
          className="list-group-item list-group-item-action"
        >
          Explore Recipes
        </Link>
        <Link
          to="/dashboard/upload"
          className="list-group-item list-group-item-action"
        >
          Upload a Recipe
        </Link>
        <Link
          to="/dashboard/likedrecipes"
          className="list-group-item list-group-item-action"
        >
          View Your Liked Recipes
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
