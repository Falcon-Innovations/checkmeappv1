/* eslint-disable consistent-return */
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import useFetch from '../hooks/useFetch';
import client from './client';

const url = 'https://backend.falcon-innov.com/api/v1/articles';

export const useBlogs = () => {
  const { loading, data, error } = useFetch(url);
  return { loading, data, error };
};

export const voteBlog = async (articleId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await client.patch(
      `${url}/${articleId}/vote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    Alert.alert(
      'Error',
      error?.response?.data?.message
        ? `${error?.response?.data?.message}`
        : 'Something went wrong, please try again later.',
    );
  }
};

export const likeArticle = async ({ articleId }) => {
  const token = await AsyncStorage.getItem('token');
  return client.patch(
    `${url}/like/${articleId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useLikeBlog = () => {
  return useMutation({
    onError: (err) => {
      console.log(err);
      Alert.alert('Something went wrong');
    },
    onSuccess: () => {
      console.log('Sucess');
    },
    mutationFn: likeArticle,
  });
};
