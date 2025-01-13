import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = (event) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
    axios
      .delete("http://localhost:3000/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userLoggedIn");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button
        className="btn btn-danger align-items-center"
        onClick={handleLogout}
      >
        LogOut
      </button>
    </div>
  );
};

export default Logout;
