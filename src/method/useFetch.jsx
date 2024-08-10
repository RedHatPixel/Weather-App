import { useState, useEffect, useCallback } from "react";

const useFetch = (initialUrl = "", initialParams = {}) => {
  const [url, setUrl] = useState(initialUrl);
  const [params, setParams] = useState(initialParams);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${url}?${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setData(null);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateUrlAndParams = (newUrl, newParams) => {
    setUrl(newUrl);
    setParams(newParams);
  };

  return { data, loading, error, updateUrlAndParams };
};

export default useFetch;
