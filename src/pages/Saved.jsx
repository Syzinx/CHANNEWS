import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromSaved } from '../store';
import NewsCard from '../components/NewsCard';

const Saved = () => {
  // Mengambil data savedArticles dari state Redux
  const savedArticles = useSelector((state) => state.saved);

  const dispatch = useDispatch();

  const handleRemove = (article) => {
    dispatch(removeFromSaved(article));
  };

  return (
    <div>
      <h1>Saved Articles</h1>
      {savedArticles.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {savedArticles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              onSaveToggle={() => handleRemove(article)}
              isSaved={true}
            />
          ))}
        </div>
      ) : (
        <p>Belum ada artikel yang disimpan.</p>
      )}
    </div>
  );
};

export default Saved;
