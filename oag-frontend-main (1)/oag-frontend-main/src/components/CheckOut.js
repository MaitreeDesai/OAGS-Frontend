import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    city: "",
    pinCode: "",
    state: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartAndUser = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);

        const token = userData.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const cartResponse = await axios.get("http://localhost:8000/getCart", config);
        if (cartResponse.data && Array.isArray(cartResponse.data.cart)) {
          setCartItems(cartResponse.data.cart);
          const total = cartResponse.data.cart.reduce(
            (acc, item) => acc + (item.product_id.price || 0) * (item.product_qty || 0),
            0
          );
          setTotalAmount(total);
        }
      } catch (error) {
        toast.error("Failed to fetch cart items");
        console.error(error);
      }
    };

    fetchCartAndUser();
  }, []);

  const validateForm = (e) => {
    e.preventDefault();

    const streetAddress = e.target.streetAddress.value;
    const city = e.target.city.value;
    const state = e.target.state.value;
    const pinCode = e.target.pinCode.value;
    const phone = e.target.phone.value;

    let formErrors = {
      city: "",
      pinCode: "",
      state: "",
      phone: "",
    };

    if (!city) {
      formErrors.city = "City is required *";
    } else if (city !== "Bardoli") {
      formErrors.city = "City must be Bardoli *";
    }

    if (!pinCode) {
      formErrors.pinCode = "Pin Code is required *";
    } else if (!/^[0-9]{6}$/.test(pinCode)) {
      formErrors.pinCode = "Pin code must be 6 digits *";
    }

    if (!state) {
      formErrors.state = "State is required *";
    } else if (state !== "Gujarat") {
      formErrors.state = "State must be Gujarat *";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) {
      formErrors.phone = "Phone number is required *";
    } else if (!phoneRegex.test(phone)) {
      formErrors.phone = "Phone number must be 10 digits *";
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setErrors(formErrors);

    if (!Object.values(formErrors).some((err) => err)) {
      handleSubmitShipping(e);
    }
  };

  const handleSubmitShipping = async (e) => {
    const token = user?.token;

    const shippingData = {
      streetAddress: e.target.streetAddress.value,
      city: e.target.city.value,
      state: e.target.state.value,
      pinCode: e.target.pinCode.value,
      phone: e.target.phone.value,
      user: user?.id,
      paymentMethod,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/shipping",
        shippingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Shipping information and payment method saved successfully!");
      console.log("Shipping response:", response.data);
    } catch (error) {
      console.error("Error saving shipping information:", error);
      toast.error("Failed to save shipping information");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Order Summary</h1>
      <div className="row">
        <div className="col-md-8">
          <h2>Order Summary</h2>
          <div className="list-group">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.product_id._id}
                >
                  <div className="d-flex">
                    <img
                      src={`${
                        process.env.REACT_APP_API_BASE_URL + item.product_id.image
                      }`}
                      className="img-fluid rounded"
                      alt={item.product_id.name}
                      style={{ width: "50px", height: "50px", marginRight: "10px" }}
                    />
                    <div>
                      <strong>{item.product_id.name}</strong> <br />
                      <span>₹{item.product_id.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
          <h4 className="mt-3">Total: ₹{totalAmount.toFixed(2)}</h4>
          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate("/Cart")}
          >
            Go Back
          </button>
        </div>

        <div className="col-md-4">
          <h2>Shipping Information</h2>
          <form onSubmit={validateForm}>
            <div className="mb-3">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Street Address"
                name="streetAddress"
                required
              />
              <input
                type="text"
                className="form-control mt-1"
                placeholder="City"
                name="city"
                required
              />
              <div className="text-danger">{errors.city}</div>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="State"
                name="state"
                required
              />
              <div className="text-danger">{errors.state}</div>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Pin Code"
                name="pinCode"
                required
              />
              <div className="text-danger">{errors.pinCode}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                name="phone"
                required
              />
              <div className="text-danger">{errors.phone}</div>
            </div>

            <h2>Payment Method</h2>
            <div className="mb-3">
              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Online Payment">Online Payment</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success mt-3">
                Save Shipping & Payment Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;