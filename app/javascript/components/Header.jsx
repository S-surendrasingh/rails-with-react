import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("userLoggedIn", "false");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    localStorage.setItem("userLoggedIn", "true");
    setIsLoggedIn(true);
  };

  return (
    <header className="bg-primary text-white p-3">
      <nav>
        <ul className="d-flex justify-content-center list-unstyled mb-0">
          <li className="mx-3">
            <Link to="/home" className="text-white text-decoration-none">
              Home
            </Link>
          </li>
          <li className="mx-3">
            <Link to="/about" className="text-white text-decoration-none">
              About
            </Link>
          </li>
          <li className="mx-3">
            <Link to="/contact" className="text-white text-decoration-none">
              Contact us
            </Link>
          </li>
          <li className="mx-3">
            <Link to="/career" className="text-white text-decoration-none">
              Career
            </Link>
          </li>

          {!isLoggedIn ? (
            <li className="mx-3">
              <Link
                to="/login"
                onClick={handleLogin}
                className="text-white text-decoration-none"
              >
                LogIn
              </Link>
            </li>
          ) : (
            <li className="mx-3">
              <Link
                to="/logout"
                onClick={handleLogout}
                className="text-white text-decoration-none"
              >
                LogOut
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
