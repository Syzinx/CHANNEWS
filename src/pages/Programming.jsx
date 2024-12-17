import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { useSelector, useDispatch } from "react-redux";
import { addToSaved, removeFromSaved } from "../store";
import placeholderImage from "../assets/cadangan.png";


const Programming = () => {
  const [articles, setArticles] = useState([]);
  const savedArticles = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        params: {
          q: "programming OR coding OR developer",
          "api-key": "XzWi6VFd3zQV3d6MrVNxCowMyvSa16wZ",
        },
      })
      .then((res) => {
        const results = res.data.response.docs.map((doc) => ({
          title: doc.headline.main,
          url: doc.web_url,
          snippet: doc.snippet,
          publishedDate: doc.pub_date,
          image: doc.multimedia[0]
            ? `https://www.nytimes.com/${doc.multimedia[0].url}`
            : placeholderImage
        }));
        setArticles(results);
      });
  }, []);

  const handleSaveToggle = (article) => {
    const isSaved = savedArticles.some((saved) => saved.url === article.url);
    if (isSaved) {
      dispatch(removeFromSaved(article));
    } else {
      dispatch(addToSaved(article));
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-center">Artikel Pemrograman</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            onSaveToggle={() => handleSaveToggle(article)}
            isSaved={savedArticles.some((saved) => saved.url === article.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default Programming;
