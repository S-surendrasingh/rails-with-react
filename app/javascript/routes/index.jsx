import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Header from "../components/Header";
import About from "../components/About";
import Carrer from "../components/Carrer";
import Contact from "../components/Contact";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Logout from "../components/Logout";

function index() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/carrer" element={<Carrer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default index;
