import {StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';

function AppButton({text, color, onPress, ...rest}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Button
        uppercase={false}
        labelStyle={{
          color: '#fff',
          fontSize: 12,
          fontFamily: 'Poppins-Medium',
          justifyContent: 'center',
        }}
        mode="contained"
        style={{
          height: 45,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 2,
        }}
        theme={{colors: {primary: color}}}
        {...rest}>
        {text}
      </Button>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({});
