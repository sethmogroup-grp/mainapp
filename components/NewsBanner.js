import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewsBanner } from '../services/contentServices';
import './NewsBanner.css';

const NewsBanner = () => {
  const [data, setData] = useState({
    title: 'Press Releases and News',
    subtitle: 'Recent News and Events',
    linkText: 'SEE ALL',
    linkUrl: '/news',
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await getNewsBanner();
        if (isMounted && result) setData(result);
      } catch (error) {
        console.error('Failed to load news banner:', error);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="news-banner-section">
      <Link to={data.linkUrl || '/news'} className="news-banner-link">
        <h2 className="news-banner-title">{data.title}</h2>
        <p className="news-banner-subtitle">{data.subtitle}</p>

        <div className="news-banner-divider">
          <span className="divider-line" />
          <span className="divider-accent" />
          <span className="divider-line" />
        </div>

        <span className="news-banner-arrow">&rarr;</span>
      </Link>
    </section>
  );
};

export default NewsBanner;
