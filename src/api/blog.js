/* eslint-disable consistent-return */
import { useMutation, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import client from './client';
import { queryClient } from '../../App';

const url = 'https://check-me-backend-cameroun.herokuapp.com/api/v1/articles';

export const getArticles = () => {
  return client.get('api/v1/articles');
};

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    onSuccess: (data) => {
      return data?.data;
    },
    queryFn: () => getArticles(),
  });
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

export const unlikeArticle = async ({ articleId }) => {
  const token = await AsyncStorage.getItem('token');
  return client.patch(
    `${url}/unlike/${articleId}`,
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
      queryClient.invalidateQueries('articles');
    },
    mutationFn: likeArticle,
  });
};

export const useUnLikeBlog = () => {
  return useMutation({
    onError: (err) => {
      console.log(err);
      Alert.alert('Something went wrong, please try again');
    },
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
    },
    mutationFn: unlikeArticle,
  });
};
