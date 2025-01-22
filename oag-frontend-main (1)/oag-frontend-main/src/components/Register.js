import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange" 
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/register', {
        ...data,
        role: "Customer"
      });
      toast.success("Registration successfully");      
      reset(); 
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false); 
    }
  };  
  
  return (
    <section className="h-100 bg-dark d-flex align-items-center justify-content-center">
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-lg-8">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-md-6 d-none d-md-block">
                  <img 
                    src={require('../assets/images/register_img.jpg')}
                    alt="Sample photo" 
                    className="img-fluid"
                    style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem', height: '100%' }} 
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Registration</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <input 
                              type="text" 
                              id="FirstName" 
                              name="firstname"
                              className="form-control"
                              placeholder='First Name'
                              {...register("firstname", { 
                                required: '*First name is required',
                                pattern: {
                                  value: /^[A-Za-z]+$/,
                                  message: "*First name must contain only alphabetic characters.",
                                }, 
                              })}
                              autoComplete="off"
                            />
                            {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <input 
                              type="text" 
                              id="LastName" 
                              name="lastname"
                              className="form-control"
                              placeholder='Last Name'
                              {...register("lastname", { 
                                required: '*Last name is required',
                                pattern: {
                                  value: /^[A-Za-z]+$/,
                                  message: "*Last name must contain only alphabetic characters.",
                                },  
                              })}
                              autoComplete="off"
                            />
                            {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="form-outline">
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
                                message: "*Entered value does not match email format",
                              },
                            })}
                            autoComplete="off"
                          />
                          {errors.email && <span className="error-message">{errors.email.message}</span>}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="form-outline">
                          <input
                            type={isPasswordVisible ? "text" : "password"} 
                            className="form-control"
                            placeholder="Password"
                            id="Password"
                            name="password"
                            {...register("password", {
                              required: "*Password is required",
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/,
                                message: "*Password must have at least six characters, one uppercase, one lowercase, one number, and one special character",
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

                          {errors.password && <span className="error-message">{errors.password.message}</span>}
                        </div>
                      </div>

                      <div className="d-flex justify-content-center align-items-center pt-3">
                        <button 
                          className="btn btn-outline-danger"
                          type="submit"
                          style={{ fontWeight: 'bold' }}
                          disabled={loading} 
                        >
                          {loading ? 'Registering...' : 'Register'}
                        </button>
                      </div>

                      <div className="d-flex flex-column align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already have an account?</p>
                        <Link to={"/login"}>Login</Link> 
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