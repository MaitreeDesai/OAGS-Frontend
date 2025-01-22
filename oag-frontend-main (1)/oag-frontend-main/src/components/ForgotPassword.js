import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/forgot-password`,
        { email: data.email }
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
          <h3 className="card-title text-center mb-4 text-danger">
            Forgot Password
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control bg-light text-dark ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter your registered email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                autoComplete="off"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <button
              className="btn btn-danger w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <div className="mt-3 text-center">
            <button
              className="btn btn-danger w-100" 
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};