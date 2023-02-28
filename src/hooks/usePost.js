import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../utility';

const usePost = (url, method = 'POST') => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const postAxiosData = async (data) => {
    try {
      const token = await AsyncStorage.getItem('token');
      setLoading(true);

      await fetch(`${config.app.api_url}/${url}`, {
        method,
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          setLoading(false);
          if (
            res.statusCode !== null &&
            res.statusCode !== undefined &&
            res.statusCode >= 300
          ) {
            Alert.alert('Oups!', 'Something went wrong please try again.');
          } else if (res.data && res.status === 'success') {
            Alert.alert('success!', res.message, [
              {
                title: 'Ok',
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]);
            setResult(res);
          }
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert('Oups!', 'Something went wrong please try again.');
          throw new Error(err);
        });
    } catch (err) {
      Alert.alert('Oups!', 'Something went wrong please try again.');
      setLoading(false);
    }
    return result;
  };
  return [loading, postAxiosData];
};

export default usePost;
