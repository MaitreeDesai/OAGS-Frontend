import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const ResetPassword = () => {
  const { token } = useParams(); 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/reset-password`,
      {
        token,
        password: data.password
      }
    );
    toast.success(response.data.message);
    navigate("/login");
  } catch (error) {
    toast.error(error.response.data.error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card border-danger shadow-lg" style={{ width: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-danger">Reset Password</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 position-relative">
              <input
                type={isPasswordVisible ? "text" : "password"} 
                className={`form-control bg-light text-dark ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "Must contain at least 6 characters, one uppercase letter, one number, and one special character"
                  }
                })}
                autoComplete="off"
              />
              <span
                onClick={() => setIsPasswordVisible(!isPasswordVisible)} 
                style={{ position: 'absolute', top: '50%', right: '10px', cursor: 'pointer', transform: 'translateY(-50%)' }}
              >
                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
              </span>
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>
            <button
              className="btn btn-danger w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};