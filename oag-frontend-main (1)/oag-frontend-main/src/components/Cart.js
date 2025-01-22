import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartData = async () => {
    try {
      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get("http://localhost:8000/getCart", config);
      setCartItems(response.data.cart);
      calculateTotal(response.data.cart);
    } catch (error) {
      console.error(
        "Error fetching cart data:",
        error.response || error.message
      );
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.product_qty * item.price,
      0
    );
    setTotalPrice(total);
  };

  const increaseQuantity = async (item) => {
    const newQuantity = item.product_qty + 1;
    const newTotalPrice = totalPrice + item.price;

    const payload = {
      product_id: item.product_id._id,
      product_qty: 1,
      price: item.price,
    };

    try {
      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "http://localhost:8000/addToCart",
        payload,
        config
      );
      if (response.data) {
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.product_id._id === item.product_id._id
              ? { ...cartItem, product_qty: newQuantity }
              : cartItem
          )
        );

        setTotalPrice(newTotalPrice);
        console.log(
          `Increased quantity of ${item.product_id.title} to ${newQuantity}`
        );
      }
    } catch (error) {
      console.error(
        "Error updating quantity:",
        error.response || error.message
      );
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const decreaseQuantity = async (item) => {
    const newQuantity = item.product_qty - 1;
    const newTotalPrice = totalPrice - item.price;

    const payload = {
      product_id: item.product_id._id,
      product_qty: newQuantity,
    };

    try {
      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "http://localhost:8000/updateCart",
        payload,
        config
      );
      if (response.data) {
        if (newQuantity > 0) {
          setCartItems((prevItems) =>
            prevItems.map((cartItem) =>
              cartItem.product_id._id === item.product_id._id
                ? { ...cartItem, product_qty: newQuantity }
                : cartItem
            )
          );
        } else {
          setCartItems((prevItems) =>
            prevItems.filter(
              (cartItem) => cartItem.product_id._id !== item.product_id._id
            )
          );
        }

        setTotalPrice(newTotalPrice);
        console.log(
          `Decreased quantity of ${item.product_id.title} to ${newQuantity}`
        );
      }
    } catch (error) {
      console.error(
        "Error updating quantity:",
        error.response || error.message
      );
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#f8f9fa", padding: "20px 0", height: "100vh" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-start h-100">
          <div className="col-md-8">
            <div
              className="card shadow-lg mb-4 border-0"
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              <div className="card-header text-center bg-danger text-white">
                <h5 className="mb-0">Your Cart - {cartItems.length} Items</h5>
              </div>
              <div className="card-body">
                {cartItems.map((item, index) => (
                  <div
                    className="row align-items-center border-bottom py-3"
                    key={index}
                  >
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div className="hover-zoom ripple rounded">
                        <img
                          src={`${
                            process.env.REACT_APP_API_BASE_URL +
                            item.product_id.image
                          }`}
                          className="img-fluid rounded"
                          alt={item.product_id.title}
                        />
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <h6 className="text-dark">
                        <strong>{item.product_id.title}</strong>
                      </h6>
                      <div>
                        <button
                          className="btn btn-danger btn-sm me-1 mb-2"
                          title="Remove item"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                        <button
                          className="btn btn-warning btn-sm mb-2"
                          title="Move to wish list"
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div className="d-flex align-items-center mb-4">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => decreaseQuantity(item)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.product_qty}</span>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => increaseQuantity(item)}
                        >
                          +
                        </button>
                        <p className="text-start text-md-center ms-3 mb-0">
                          <strong>
                            ₹{item.price.toLocaleString()} x {item.product_qty}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="text-center">
                  <h6>
                    Total: <strong>₹{totalPrice.toLocaleString()}</strong>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg mb-4 border-0">
              <div className="card-header text-center bg-black">
                <h5 className="mb-0" style={{ color: "white" }}>
                  Order Summary
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products <span>₹{totalPrice.toLocaleString()}</span>
                  </li>
                  {/* <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping <span>Gratis</span>
                  </li> */}
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total Amount</strong>
                    </div>
                    <span>
                      <strong>₹{totalPrice.toLocaleString()}</strong>
                    </span>
                  </li>
                </ul>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-danger flex-fill me-2"
                    onClick={handleCheckout}
                  >
                    Go to Checkout
                  </button>

                  <Link to="/" className="btn btn-dark text-white flex-fill">
                    Back Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;