import "./Dashboard.css";
import React from "react";
import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
 

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="header">
        <div className="header-left">
          <div>
            <p className="greeting">Welcome Back,</p>
          </div>
        </div>

        <div className="header-right">
          <h2>🍲 Your Personal Recipe Hub</h2>
          <p>Explore, Upload, and Save your favorite recipes!</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="dashboard-main">
        <Link to="/dashboard/explore" className="card card-link">
          <h3>🔍 Explore Recipes</h3>
          <p>Discover delicious recipes shared by others.</p>
        </Link>

        <Link to="/dashboard/upload" className="card card-link">
          <h3>🍳 Upload a Recipe</h3>
          <p>Share your own special recipes with the world.</p>
        </Link>

        <Link to="/dashboard/likedrecipes" className="card card-link">
          <h3>❤️ View Liked Recipes</h3>
          <p>See the recipes you loved the most.</p>
        </Link>
      </div>

      {/* 🚀 THIS IS WHERE OUTLET WILL WORK */}
      <div className="outlet-content">
        <Outlet />
      </div>

      
    </div>
  );
};

export default Dashboard;
