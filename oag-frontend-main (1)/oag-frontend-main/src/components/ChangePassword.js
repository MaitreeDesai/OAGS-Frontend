import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const { currentPassword, confirmPassword } = data;
      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const response = await axios.post('http://localhost:8000/changepassword', {
        "password": confirmPassword,
        "oldpassword": currentPassword
      }, config);
     
      const msg1 = response.data.message;
      toast.success(msg1); 
      localStorage.removeItem('user');
      navigate("/");
    } catch (error) {
      const error1 = error.response.data.error;
      toast.error(error1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 border rounded bg-light"
          >
            <h3 className="text-center mb-4">Change Password</h3>

            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Current Password"
                  id="currentPassword"
                  {...register("currentPassword", {
                    required: "*Current Password is Required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/,
                      message: "*Enter Valid Password",
                    },
                  })}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="btn btn-outline-secondary input-group-text"
                >
                  <FontAwesomeIcon
                    icon={showCurrentPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {errors.currentPassword && (
                <div className="text-danger mt-2">
                  {errors.currentPassword.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="New Password"
                  id="newPassword"
                  {...register("newPassword", {
                    required: "*Password is Required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/,
                      message:
                        "*Password must be six characters, with one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="btn btn-outline-secondary input-group-text"
                >
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {errors.newPassword && (
                <div className="text-danger mt-2">
                  {errors.newPassword.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "*Confirm Password is Required",
                    validate: (value) => {
                      if (watch("newPassword") !== value) {
                        return "*Password & Confirm Password are different";
                      }
                    },
                  })}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="btn btn-outline-secondary input-group-text"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="text-danger mt-2">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                className="btn btn-danger me-2"
                type="submit"
                style={{ fontWeight: "bold" }}
              >
                Change Password
              </button>

              <button
                className="btn btn-danger"
                type="button"
                onClick={() => navigate("/")} 
                style={{ fontWeight: "bold" }}
              >
                Back to Home Page
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;