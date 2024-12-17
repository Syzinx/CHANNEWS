import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState([]);

  const apiKey = "XzWi6VFd3zQV3d6MrVNxCowMyvSa16wZ";

  // Fetch data dari API New York Times
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://api.nytimes.com/svc/search/v2/articlesearch.json",
          {
            params: {
              "api-key": apiKey,
              sort: "relevance",
              q: "news", 
              page: 1,
            },
          }
        );
        setArticles(response.data.response.docs.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, []);

  // Auto Slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % articles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [articles]);

  return (
    <div id="heroCarousel" className="carousel slide">
      <div className="carousel-inner">
        {articles.map((article, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentSlide ? "active" : ""}`}
          >
            {/* Gambar artikel dengan penyesuaian untuk resolusi terbaik */}
            <img
              src={
                article.multimedia?.length > 0
                  ? `https://static01.nyt.com/${
                      article.multimedia.find((media) => media.subtype === "superJumbo")?.url ||
                      article.multimedia.find((media) => media.subtype === "large")?.url ||
                      article.multimedia[0]?.url
                    }`
                  : "https://via.placeholder.com/1920x1080"
              }
              className="d-block w-100"
              alt={article.headline.main}
            />
            {/* Caption */}
            <div className="carousel-caption d-md-block">
              <h5>{article.headline.main}</h5>
              <p>{article.abstract}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol navigasi */}
      <button
        className="carousel-control-prev"
        type="button"
        onClick={() =>
          setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? articles.length - 1 : prevSlide - 1
          )
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={() =>
          setCurrentSlide((prevSlide) => (prevSlide + 1) % articles.length)
        }
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        {articles.map((_, index) => (
          <div
            key={index}
            className={`progress-bar ${
              index === currentSlide ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
