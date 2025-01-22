import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import axios from "axios";

const ProfileView = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  
  const fetchData = async () => {
    try {
      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get("http://localhost:8000/profile", config);
      setProfile(response.data.user);
    } catch (error) {
      toast.error("Failed to fetch profile data");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card shadow-sm" style={{ borderRadius: ".5rem", overflow: "hidden" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                    background: "linear-gradient(135deg, #000000, #ff0000)", 
                  }}
                >
                  <br />
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "100px", borderRadius: "50%" }}
                  />
                  <h5 className="mb-5" style={{ color: "white" }}>
                    {profile.firstname} {profile.lastname}
                  </h5>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6 className="text-muted">Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-12 mb-3">
                        <h5 style={{ color: "red" }}>First Name</h5>
                        <p className="text-muted font-weight-bold">{profile.firstname}</p>
                      </div>
                      <div className="col-12 mb-3">
                        <h5 style={{ color: "red" }}>Last Name</h5>
                        <p className="text-muted font-weight-bold">{profile.lastname}</p>
                      </div>
                      <div className="col-12 mb-3">
                        <h5 style={{ color: "red" }}>Email</h5>
                        <p className="text-muted font-weight-bold">{profile.email}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => navigate("/")} 
                        style={{ fontWeight: "bold" }}
                      >
                        Back to Home Page
                      </button>
                    </div>
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

export default ProfileView;