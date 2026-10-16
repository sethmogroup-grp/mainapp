import { useEffect, useState } from 'react';

/**
 * Loads one editable home-page section from the API.
 * Starts with the bundled defaults so the section renders instantly,
 * then swaps in whatever the admin saved.
 */
const useSectionData = (fetcher, defaults) => {
  const [data, setData] = useState(defaults);

  useEffect(() => {
    let alive = true;

    fetcher()
      .then((result) => {
        if (alive && result && typeof result === 'object') setData(result);
      })
      .catch((error) => {
        // Keep showing the defaults if the API is unreachable
        console.error('Failed to load home section:', error);
      });

    return () => {
      alive = false;
    };
  }, [fetcher]);

  return data;
};

export default useSectionData;
