import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues 
  } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && user.role && user.role.role_name === 'Admin') {
      navigate("/dashboard");
    } else if(user) {
      navigate("/");
    }      
  }, [isLoggedIn]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
  
      const response = await axios.post('http://localhost:8000/login', data);
      const user = response.data.user;
      const msg1 = response.data.message;
      toast.success(msg1);
  
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role && user.role.role_name === 'Admin') {
        navigate("/dashboard"); 
      } else if (user.role && user.role.role_name === 'Artist') {
        navigate("/artistdashboard"); 
      } else {
        navigate("/"); 
      }
  
    } catch (error) {
      const error1 = error.response?.data?.error || 'An unknown error occurred. Please try again.';
      toast.error(error1);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <section className="h-100 bg-dark d-flex align-items-center justify-content-center">
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-lg-8">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-flex align-items-center gradient-custom-2">
                  <img
                    src={require('../assets/images/login_Img.jpg')}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    alt="login"
                  />
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">Online Art Gallery</h4>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p>Please login to your account</p>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          id="UserName"
                          name="email"
                          {...register("email", {
                            required: "*Email is required",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "*Entered value does not match the email format",
                            },
                          })}
                          autoComplete="off"
                        />
                        
                        {errors.email && (
                          <span className="error-message">{errors.email.message}</span>
                        )}
                      </div>

                      <div className="form-outline mb-4 position-relative">
                        <input
                          type={isPasswordVisible ? "text" : "password"} 
                          className="form-control"
                          placeholder="Password"
                          id="Password"
                          name="password"
                          {...register("password", {
                            required: "*Password is Required",
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/,
                              message: "*Password must be six characters, with one uppercase letter, one lowercase letter, one number, and one special character",
                            },
                          })}
                          autoComplete="off"
                        />
                        
                        <span
                          onClick={() => setIsPasswordVisible(!isPasswordVisible)} 
                          style={{ position: 'absolute', top: '50%', right: '10px', cursor: 'pointer', transform: 'translateY(-50%)' }}
                        >
                          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                        </span>
                        
                        {errors.password && (
                          <span className="error-message">{errors.password.message}</span>
                        )}
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-outline-danger"
                          type="submit"
                          style={{ fontWeight: 'bold' }}
                        >
                          Log in
                        </button>
                        <br />
                        <Link to={"/forgot-password"}>Forgot password?</Link>
                      </div>

                      <div className="align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to={"/register"}>Create Account</Link>
                        <br></br>
                        <Link to={"/"}>Explore Us</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};