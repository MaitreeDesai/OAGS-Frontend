import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            <div className="logo_container">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="text-white">Art</span>
                <span className="text-danger">Gallery</span>
              </Link>
              <p className="mt-2" style={{ color: '#b0b0b0' }}>
                "Where Artistry Meets Exclusivity"
              </p>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
            <h5 style={{ color: '#dc3545' }}>Art by Price</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light hover:text-red">Under Rs 25,000</a></li>
              <li><a href="#" className="text-light hover:text-red">Rs 25,000 - Rs 1 Lac</a></li>
              <li><a href="#" className="text-light hover:text-red">Rs 1 Lac - Rs 3 Lac</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
            <h5 style={{ color: '#dc3545' }}>Art Category</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light hover:text-red">Drawing</a></li>
              <li><a href="#" className="text-light hover:text-red">Sculpture</a></li>
              <li><a href="#" className="text-light hover:text-red">Digital Art</a></li>
             {/* <li><a href="#" className="text-light hover:text-red">Ceramic</a></li>
              <li><a href="#" className="text-light hover:text-red">Prints</a></li>
              <li><a href="#" className="text-light hover:text-red">Paintings</a></li>*/}
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
          <h5 style={{ color: '#dc3545' }}>Artists</h5>
            <ul className="list-unstyled">
            <li><a href="/artistreg" className="text-light hover:text-red">Registration</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4 mb-4 d-flex justify-content-between align-items-start">
            <div>
              <h5 style={{ color: '#dc3545' }}>About</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light hover:text-red">The Team</a></li>
                <li><a href="#" className="text-light hover:text-red">Contact Us</a></li>
                <li><a href="#" className="text-light hover:text-red">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="social-media-section ms-5">
              <h5 className="mb-3" style={{ color: '#dc3545'}}>Social Media</h5>
              <ul className="list-unstyled d-flex justify-content-start mb-0">
                <li className="me-3"><a href="https://facebook.com" className="text-light"><FaFacebookF /></a></li>
                <li className="me-3"><a href="https://twitter.com" className="text-light"><FaTwitter /></a></li>
                <li className="me-3"><a href="https://instagram.com" className="text-light"><FaInstagram /></a></li>
                <li><a href="https://pinterest.com" className="text-light"><FaPinterestP /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;