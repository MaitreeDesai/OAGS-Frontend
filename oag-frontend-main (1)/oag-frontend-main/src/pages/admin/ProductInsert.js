import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductInsert() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();  // Use the useNavigate hook

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
          artistData.users.filter((user) => user.role.name === "Artist")
        );
      } catch (error) {
        console.error("Error fetching categories/products/artists", error);
      }
    };

    fetchData();
  }, []);

  const handleUnpublish = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/deleteProduct/${id}`,  
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        alert("Product deleted successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error deleting product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product.");
    }
  };

  // Go back button handler
  const handleGoBack = () => {
    navigate(-1);  // Navigate to the previous page
  };

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col">
          <button
            className="btn btn-secondary btn-lg"
            onClick={handleGoBack} // Trigger the go back function
          >
            Go Back
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Artist</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL + product.image}`}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category_id}</td>
                <td>{product.artist_id}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleUnpublish(product._id)}
                  >
                    Unpublish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductInsert;