import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ExploreCategory = () => {
  const { category_id } = useParams();
  const [products, setProducts] = useState([]);

  const fetchCategoryProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/exploreProduct/${category_id}`
      );
      setProducts(response?.data?.products);
    } catch (error) {
      toast.error(error.message || "Failed to fetch category products");
    }
  };

  const addToCart = async (product) => {
    try {
      const user = localStorage.getItem("user");

      if (!user) {
        toast.error("Login is required to add items to the cart.");
        return;
      }

      const token = JSON.parse(user).token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { product_id, price } = product;
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/addToCart`,
        { product_id, product_qty: 1, price },
        config
      );
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category_id]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-5">Products in this Category</h2>

      <div className="row g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-3" key={product._id}>
              <div className="card h-100 border-light shadow-sm">
                <img
                  src={`${
                    process.env.REACT_APP_API_BASE_URL + product?.image
                  }`}
                  className="card-img-top"
                  alt={product?.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-center">{product?.title}</h5>
                  <p className="card-text text-center">
                    {product?.description}
                  </p>
                  <p className="card-text text-center">
                    <strong>Price: ₹{product?.price.toLocaleString()}</strong>
                  </p>
                  <div className="text-center">
                    <button
                      className="btn btn-danger border-0 mt-2 w-100"
                      onClick={() =>
                        addToCart({
                          product_id: product._id,
                          price: product.price,
                        })
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found for this category.</p>
        )}
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default ExploreCategory;