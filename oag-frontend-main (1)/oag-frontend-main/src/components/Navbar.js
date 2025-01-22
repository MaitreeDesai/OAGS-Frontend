import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginRegister from "./LoginRegister";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify"; 

export const NavBar = ({ departments, cart, getCartByUserId, products, addToCart }) => {
  const [activeClass, setActiveClass] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [login, setLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [error, setError] = useState(""); 
  const [searched, setSearched] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const showHideModal = () => {
    setModalShow(false);
  };

  const loginClicked = () => {
    setModalShow(true);
    setLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const handleMenuClicked = () => {
    setActiveClass(!activeClass);
  };

  const handleChangePasswordClick = () => {
    navigate('/ChangePassword');
  };

  const handleProfileViewClick = () => {
    navigate('/ProfileView');
  };

  const handleSearch = async () => {
    setSearched(true);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/search?searchTerm=${searchTerm}`);
      const data = await response.json();
      if (response.ok) {
        setFilteredProducts(data.products);
        setError("");
      } else {
        setError(data.message);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while searching for products.");
    }
    setLoading(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm(""); 
    setFilteredProducts([]); 
    setSearched(false); 
  };

  const handleAddToCart = async (product) => {
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

  return (
    <div className="main_nav_container bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar">
              <div className="logo_container">
                <Link to="/">
                  <span style={{ color: 'white' }}>Art</span><span>Gallery</span>
                </Link>
              </div>
              <div className="navbar_menu">
                <div className="search_container">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    placeholder="Search product here..."
                    className="search_input"
                  />
                  <div className="search_icon" onClick={handleSearch}>
                    <GrSearch />
                  </div>
                  {searched && (
                    <button className="clear_search_button" onClick={handleClearSearch}>
                      Clear Search
                    </button>
                  )}
                </div>
              </div>

              {error && <div className="error_message">{error}</div>}
              {loading && <div>Loading...</div>} 

              <div className="user_icons">
                <div
                  className="icon_container"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  <FaRegCircleUser />
                </div>
                {isLoggedIn && menuDisplay && (
                  <div className="dropdown_menu">
                    <button className="dropdown_item" onClick={handleProfileViewClick}>
                      Profile View
                    </button>
                    <button className="dropdown_item" onClick={handleChangePasswordClick}>
                      Change Password
                    </button>
                    <button className="dropdown_item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
                {isLoggedIn && (
                  <Link to="/Cart" className="cart_icon">
                    <span>
                      <FaShoppingCart />
                    </span>
                  </Link>
                )}
              </div>

              <div className="auth_links">
                {!isLoggedIn && (
                  <Link
                    to={"/login"}
                    className="auth_button px-3 py-1 rounded-full text-black bg-white hover:bg-gray-200"
                    onClick={loginClicked}
                  >
                    Login
                  </Link>
                )}
              </div>

              <div
                className="hamburger_container"
                onClick={handleMenuClicked}
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {modalShow && (
        <LoginRegister show={modalShow} login={login} onHide={showHideModal} />
      )}

      <div className="search_results">
        {searched && filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found for your search.</p>
          </div>
        ) : (
          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-md-3" key={product._id}>
                <div className="card">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${product.image}`}
                    className="img-fluid rounded product-image"
                    alt={product.title}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-price">${product.price}</p>
                    <button
                      className="btn btn-danger border-0 mt-2 w-100"
                      onClick={() => handleAddToCart({
                        product_id: product._id,
                        price: product.price,
                      })}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;