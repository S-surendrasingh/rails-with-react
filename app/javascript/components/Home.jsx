import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("Please log in to access the photo gallery.");
      navigate("/login");
      return;
    }

    axios
      .get("https://jsonplaceholder.typicode.com/photos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError("Session expired or invalid token. Please log in again.");
          navigate("/login");
        } else {
          setError("Error fetching photos");
        }
      });
  }, [navigate]);

  return (
    <div className="container">
      <h1>Photo Gallery</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {photos.map((photo) => (
          <div className="col-md-4" key={photo.id}>
            <div className="card mb-4">
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{photo.title}</h5>
                <a
                  href={photo.url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Image
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
