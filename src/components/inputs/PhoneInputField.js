import {View, StyleSheet, Dimensions, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {COLORS} from '../../utility';

const PhoneInputField = ({
  phoneNumber,
  phoneInput,
  placeholder,
  onChange,
  error,
  ...rest
}) => {
  return (
    <>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="CM"
        layout="first"
        placeholder={placeholder}
        autoFocus={false}
        // withShadow
        containerStyle={[
          styles.phoneContainer,
          {borderColor: error ? COLORS.danger : '#D3D3D3'},
        ]}
        textContainerStyle={styles.textInput}
        onChangeFormattedText={onChange}
        {...rest}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </>
  );
};

export default PhoneInputField;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  phoneContainer: {
    width: width - 35,
    height: 55,
    marginBottom: 2,
    borderRadius: 8,
    // borderColor: '#DBD9D9',
    borderWidth: 1,
    marginTop: 15,
  },
  textInput: {
    paddingVertical: 0,
    width: width - 40,
    height: 50,
    backgroundColor: '#FFFFFF',
    fontSize: 18,
    paddingHorizontal: 20,
    borderRadius: 12,

    shadowColor: '#000',
  },
  errorMessage: {
    color: COLORS.primary,
    fontFamily: 'Poppins_Regular',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 1,
  },
});
