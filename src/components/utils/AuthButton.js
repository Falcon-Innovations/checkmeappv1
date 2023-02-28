import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function AuthButton({ title, color, onPress = () => {} }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default AuthButton;

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins_Bold',
  },
});
