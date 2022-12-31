import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';
import {COLORS, SIZES} from '../../utility';

const Input = ({
  label,
  iconName,
  error,
  pin,
  onSubmitEditing,
  inputRef,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(pin);
  return (
    <>
      <TextInput
        mode="outlined"
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.primary
              : isFocused
              ? COLORS.borderColorFocused
              : COLORS.borderColor,
          },
        ]}
        ref={inputRef}
        activeOutlineColor={error ? COLORS.danger : COLORS.primary}
        outlineColor={'#D3D3D3'}
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
};

export default Input;
const width = Dimensions.get('window').width;
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
    fontFamily: 'Poppins_Regular',
    fontSize: 18,
    width: width,
  },
  placeholder: {
    fontFamily: 'Poppins_Regular',
    fontSize: 18,
    color: COLORS.textColor,
  },

  errorMessage: {
    color: COLORS.primary,
    fontFamily: 'Poppins_Regular',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 1,
  },
});
