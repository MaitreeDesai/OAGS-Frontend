import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function ArtistDashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/listCategory`
        );
        const categoryData = await categoryResponse.json();
        setCategories(categoryData.categories);

        const productResponse = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/listProduct`
        );
        const productData = await productResponse.json();
        setProducts(productData.products);

        const artistResponse = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/userlist`
        );
        const artistData = await artistResponse.json();
        setArtists(
          artistData.users.filter(
            (user) => user.role._id === "66ababf4f618f04d7c296d0d"
          )
        );
      } catch (error) {
        console.error("Error fetching categories/products/artists", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const productData = {
        artist_id: data.artist,
        title: data.name,
        description: data.description,
        price: data.price,
        image: data.image[0] ? `/Images/${data.image[0].name}` : "",
        category_id: data.category,
        quantity: data.quantity,
      };

      const response = await axios.post(
        "http://localhost:8000/product",
        productData
      );
      toast.success("Product registered successfully");
      reset();
      navigate("/artistdashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col d-flex justify-content-center">
          <button
            className="btn btn-warning btn-lg text-white"
            style={{
              borderRadius: "30px",
              padding: "12px 30px",
              fontWeight: "bold",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Category</label>
            <select
              {...register("category", {
                required: "Category is required",
              })}
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category._id}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="invalid-feedback">{errors.category.message}</div>
            )}
          </div>
          <div className="col-md-6">
            <label>Product Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter product name"
              {...register("name", {
                required: "Product name is required",
              })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Artist</label>
            <select
              {...register("artist", {
                required: "Artist is required",
              })}
              className={`form-select ${errors.artist ? "is-invalid" : ""}`}
            >
              <option value="">Select Artist</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist._id}
                </option>
              ))}
            </select>
            {errors.artist && (
              <div className="invalid-feedback">{errors.artist.message}</div>
            )}
          </div>

          <div className="col-md-6">
            <label>Price</label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              placeholder="Enter price"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price must be greater than zero",
                },
              })}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price.message}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Quantity</label>
            <input
              type="number"
              className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
              placeholder="Enter quantity"
              {...register("quantity", {
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
                max: {
                  value: 7,
                  message: "Quantity must be less than or equal to 7",
                },
              })}
            />
            {errors.quantity && (
              <div className="invalid-feedback">{errors.quantity.message}</div>
            )}
          </div>
          <div className="col-md-6">
            <label>Product Image</label>
            <input
              type="file"
              {...register("image", {
                required: "Product image is required",
                validate: {
                  acceptedFormats: (fileList) => {
                    const file = fileList?.[0];
                    const validFormats = ["image/jpeg", "image/jpg", "image/png"];
                    return file && validFormats.includes(file.type)
                      ? true
                      : "Only jpg, jpeg, and png formats are allowed";
                  },
                },
              })}
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image.message}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label>Description</label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              placeholder="Enter product description"
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 50,
                  message: "Description must not exceed 50 characters",
                },
              })}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description.message}</div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-info btn-sm me-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ArtistDashboard;