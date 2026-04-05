import { useEffect, useState } from 'react';

export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

export function useRealtimeSubscription(subscribeFunction, dependencies = []) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeFunction(setData);
    return () => unsubscribe();
  }, dependencies);

  return data;
}
