import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'db6cef3833msh06c87936efa1562p1abc48jsn947bf029127a',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const exerciseOption = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'db6cef3833msh06c87936efa1562p1abc48jsn947bf029127a',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
};

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
  return null;
};

export const useFetching = (url, options) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  // eslint-disable-next-line no-shadow
  const fetchData = useCallback(async () => {
    await AsyncStorage.getItem('token');

    setLoading(true);

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result) {
        setData(result);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url]);

  return [loading, error, data, fetchData];
};
