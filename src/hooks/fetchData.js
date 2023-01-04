import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  useContext,
} from 'react';

export const exerciseOptions = {
  method: 'GET',
  //   url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
  headers: {
    'X-RapidAPI-Key': 'db6cef3833msh06c87936efa1562p1abc48jsn947bf029127a',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const exerciseOption = {
  method: 'GET',
  //   url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
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
    console.log(error);
  }
};

export const useFetching = (url, options) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');

    setLoading(true);

    try {
      const data = await fetch(url, options);
      const result = await data.json();

      if (result) {
        setData(result);
        // console.log('result', result);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    // TODO: delete cash
  }, [url]);

  return [loading, error, data, fetchData];
};
