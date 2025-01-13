import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3000/signup", {
        user: { email, password, confirmPassword },
      })
      .then((response) => {
        console.log(response);
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        setMessage("Error: Could not create account. Please try again.");
        console.log(error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-4">
        <form
          onSubmit={handleSignIn}
          className="p-4 border rounded-3 shadow-sm"
        >
          <h3 className="text-center mb-4">Sign Up</h3>

          {message && (
            <div className="alert alert-info">{message}</div> // Show message
          )}

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
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Enter confirm password"
              name="confirmPassword"
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
            Sign Up
          </button>

          <div className="d-flex justify-content-between">
            <Link to="/login">Already have an account? LogIn</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
