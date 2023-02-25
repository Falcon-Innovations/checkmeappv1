import { Dimensions, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS, SIZES } from '../../utility';

function Input({
  label,
  iconName,
  error,
  pin,
  onSubmitEditing,
  inputRef,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(pin);

  const renderInputStyles = () => {
    if (error) {
      return COLORS.primary;
    }
    if (isFocused) {
      return COLORS.borderColorFocused;
    }
    return COLORS.borderColor;
  };

  const inputStyles = renderInputStyles();

  return (
    <>
      <TextInput
        mode="outlined"
        style={[styles.inputContainer, inputStyles]}
        ref={inputRef}
        activeOutlineColor={error ? COLORS.danger : COLORS.primary}
        outlineColor={error ? COLORS.danger : '#D3D3D3'}
        secureTextEntry={hidePassword}
        placeholderStyle={styles.placeholder}
        autoCorrect={false}
        label={label}
        placeholderTextColor={COLORS.textColor}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        right={
          pin && (
            <TextInput.Icon
              onPress={() => setHidePassword(!hidePassword)}
              icon={hidePassword ? 'eye' : 'eye-off'}
              color="#D3D3D3"
            />
          )
        }
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmitEditing}
        styles={styles.textInput}
        {...props}
      />

      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </>
  );
}

export default Input;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  inputContainer: {
    fontSize: 14,
    marginTop: 12,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: SIZES.borderRadius,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: COLORS.textColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    width,
  },
  placeholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.textColor,
  },

  errorMessage: {
    color: COLORS.primary,
    fontFamily: 'Poppins_Regular',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 1,
  },
});
