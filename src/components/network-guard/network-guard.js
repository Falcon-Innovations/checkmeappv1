import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import {COLORS} from '../../utility';
import AppButton from '../utils/AppButton';
import NetInfo from '@react-native-community/netinfo';

export const NetworkGuard = ({children}) => {
  const [networkState, setNetworkState] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState(state);
    });
    // Unsubscribe
    return unsubscribe();
  }, [networkState]);

  console.log(networkState, ' From Network Guard');

  if (!networkState?.isConnected && !networkState?.isInternetReachable) {
    return (
      <View style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icons name="cloud-off" size={64} color={COLORS.primary} />
          <Text
            style={{
              marginVertical: 10,
            }}>
            Oops! It seems like you are not connected
          </Text>
          <AppButton
            text="Try again"
            color={COLORS.primary}
            onPress={() => NetInfo.refresh()}
          />
        </View>
      </View>
    );
  }

  return <>{children}</>;
};
