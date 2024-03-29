import React from 'react';
import { View, Text, NativeModules } from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import { COLORS } from '../../utility';
import AppButton from '../utils/AppButton';

export function ErrorFallback() {
  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icons name="emoji-sad" size={64} color={COLORS.primary} />
        <Text
          style={{
            marginVertical: 10,
          }}>
          Oops! Something went wrong
        </Text>
        <AppButton
          text="Try again"
          color={COLORS.primary}
          onPress={() => NativeModules.DevSettings.reload()}
        />
      </View>
    </View>
  );
}

export const DEFAULT_MESSAGE = 'Ooops, something went wrong';
