import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaBox, FaShoppingCart, FaTags } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="container-fluid p-0">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "black" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Admin Dashboard
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
          
            {isLoggedIn && (
              <button
                className="btn btn-outline-danger ms-auto"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center mb-4">Dashboard Overview</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body text-center">
                <h5 className="card-title">
                  <FaUser /> Users
                </h5>
                <p className="card-text">Manage user accounts</p>
                <Link to="/userManagement" className="btn btn-light">
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-danger mb-3">
              <div className="card-body text-center">
                <h5 className="card-title">
                  <FaTags /> Categories
                </h5>
                <p className="card-text">Manage product categories</p>
                <Link to="/categories" className="btn btn-light">
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-body text-center">
                <h5 className="card-title">
                  <FaBox /> Products
                </h5>
                <p className="card-text">Manage product listings</p>
                <Link to="/insert-product" className="btn btn-light">
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning mb-3">
              <div className="card-body text-center">
                <h5 className="card-title">
                  <FaShoppingCart /> Orders
                </h5>
                <p className="card-text">View all orders</p>
                <Link to="/orderView" className="btn btn-light">
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;