import React, { useState, useEffect } from 'react';
import { getNews } from '../services/contentServices';
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await getNews();
        setArticles(data.articles || []);
      } catch (err) {
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  return (
    <div className="news-page">
      {/* Banner header */}
      <header className="news-page-banner">
        <h1 className="news-page-title">Press Releases and News</h1>
        <p className="news-page-subtitle">Recent News and Events</p>
        <div className="news-page-divider">
          <span className="divider-line" />
          <span className="divider-accent" />
          <span className="divider-line" />
        </div>
        <span className="news-page-arrow">&rarr;</span>
      </header>

      {/* Articles grid */}
      <section className="news-page-grid-section">
        {loading && <p className="news-page-status">Loading articles...</p>}

        {!loading && articles.length === 0 && (
          <p className="news-page-status">No articles have been published yet.</p>
        )}

        <div className="news-page-grid">
          {articles.map((article) => (
            <article
              key={article._id}
              className="news-page-card"
              onClick={() => setSelected(article)}
            >
              {article.image && (
                <div className="news-page-card-img-wrapper">
                  <img src={article.image} alt={article.title} loading="lazy" />
                </div>
              )}
              <div className="news-page-card-body">
                <span className="news-page-card-category">{article.category}</span>
                <h3 className="news-page-card-title">{article.title}</h3>
                <p className="news-page-card-date">{article.date}</p>
                <p className="news-page-card-excerpt">{article.excerpt}</p>
                <span className="news-page-card-readmore">Read More &rarr;</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Article modal */}
      {selected && (
        <div className="news-modal-overlay" onClick={() => setSelected(null)}>
          <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="news-modal-close" onClick={() => setSelected(null)}>&times;</button>
            {selected.image && <img src={selected.image} alt={selected.title} className="news-modal-img" />}
            <div className="news-modal-body">
              <span className="news-page-card-category">{selected.category}</span>
              <h2>{selected.title}</h2>
              <p className="news-page-card-date">{selected.date}</p>
              <p>{selected.content || selected.excerpt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
