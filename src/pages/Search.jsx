import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToSaved, removeFromSaved } from "../store";
import NewsCard from "../components/NewsCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const savedArticles = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setLoading(true);
    try {
      const res = await axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        {
          params: {
            q: query,
            "api-key": "XzWi6VFd3zQV3d6MrVNxCowMyvSa16wZ",
          },
        }
      );

      const results = res.data.response.docs.map((doc) => ({
        title: doc.headline.main,
        url: doc.web_url,
        snippet: doc.snippet,
        publishedDate: doc.pub_date,
        source: doc.source,
      }));
      setArticles(results);
    } catch (error) {
      console.error("Error fetching search results", error);
      alert("Terjadi kesalahan saat mencari data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

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
      <h1 className="mb-4 text-center">Cari Berita</h1>
      <div className="row mb-4">
        <div className="col-md-8 offset-md-2 col-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan kata kunci..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              Cari
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : articles.length > 0 ? (
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
      ) : (
        <div className="text-center">
          <p>Silakan masukkan kata kunci untuk memulai pencarian.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
