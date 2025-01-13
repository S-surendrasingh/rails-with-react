import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (
          response.data &&
          response.data.status &&
          response.data.status.data
        ) {
          const { token, user } = response.data.status.data;
          if (token && user) {
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userEmail", user.email);
            navigate("/home");
          } else {
            setError("Login failed. Missing token or user.");
          }
        } else {
          setError("Invalid response format.");
        }
      })
      .catch((error) => {
        setError("Invalid email or password");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-4">
        <form onSubmit={handleLogin} className="p-4 border rounded-3 shadow-sm">
          <h3 className="text-center mb-4">Sign In</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign In
          </button>

          <div className="d-flex justify-content-between">
            <Link to="#">Forgot password?</Link>
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
