import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const CategoryBanner = () => {
  const [listCategory, setlistCategory] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/listCategory`
      );
      console.log("response", response?.data?.categories);
      setlistCategory(response?.data?.categories);
    } catch (error) {
      toast.error(error.message);
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
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-5">Our Categories</h2>
      {listCategory?.map((category) => (
        <div
          key={category.category_name}
          className="border rounded shadow p-4 mb-5"
        >
          <h3 className="text-center text-uppercase bg-dark text-white p-3 rounded">
            {category?.category_name}
          </h3>
          <div className="row g-4">
            {category?.products?.slice(0, 4).map((product, index) => (
              <div className="col-md-3" key={index}>
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
            ))}
          </div>
          <div className="text-center mt-3">
            <Link
              to={`/exploreProduct/${category._id}`}
              className="btn btn-danger text-white font-weight-bold"
              style={{ padding: "10px 20px", fontSize: "1.1rem" }}
            >
              Explore more products in {category.category_name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryBanner;