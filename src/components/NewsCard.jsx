import React from "react";
import MyCustomImage from "../assets/cadangan.png"; // Gambar dari asset lokal

const NewsCard = ({ article, onSaveToggle, isSaved }) => {
  const placeholderImage = MyCustomImage || "https://via.placeholder.com/200";

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img
          src={article.image || placeholderImage}
          className="card-img-top"
          alt={article.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.snippet}</p>
          <div className="mt-auto d-flex justify-content-between">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Read More
            </a>
            <button
              className={`btn ${isSaved ? "btn-danger" : "btn-outline-primary"}`}
              onClick={onSaveToggle}
            >
              {isSaved ? "Remove" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
