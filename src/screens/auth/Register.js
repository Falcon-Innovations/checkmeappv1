import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { COLORS, IMAGES, SIZES } from '../../utility';
import { Input, AppButton, PhoneInputField } from '../../components';
import { Context as UserContext } from '../../contexts/userContext';
import Loader from '../../components/utils/Loader';

import '../../../assets/i18n/i18n';

function Register() {
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const refInputTwo = useRef();
  const phoneInput = useRef(null);

  const { signUp } = React.useContext(UserContext);

  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState(i18n.language);

  const [inputs, setInputs] = useState({
    fullname: '',
    phone: '',
    pin: '',
    kfirmPin: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // emailValidation
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // formValidation
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.fullname) {
      handleErrors('Please enter your  fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleErrors('Please enter phone number', 'phone');
      isValid = false;
    } else if (inputs.phone.length < 9) {
      handleErrors('Please enter valid phone number', 'phone');
      isValid = false;
    }

    if (!inputs.email) {
      handleErrors('Please enter an email', 'email');
      isValid = false;
    } else if (!isValidEmail(inputs.email)) {
      handleErrors('Please enter valid email address', 'email');
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };

  // changeLanguage
  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => {
        throw new Error(err);
      });
  };

  const register = async () => {
    setLoading(true);
    await signUp({
      telephone: inputs.phone,
      name: inputs.fullname,
      email: inputs.email,
    });
    setLoading(false);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const { authImage } = IMAGES;

  if (loading) {
    return (
      <View style={styles.viewContainer}>
        <Loader visible />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.viewContainer}
        contentContainerStyle={{ paddingTop: SIZES.screenHeight * 0.02 }}>
        <View
          style={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop:
              Platform.OS === 'ios'
                ? SIZES.screenHeight * 0.01
                : SIZES.screenHeight * 0.04,
          }}>
          <TouchableOpacity
            onPress={() => changeLanguage('en')}
            style={[
              currentLanguage === 'en' ? styles.active : styles.unActive,
              { marginRight: 8 },
            ]}>
            <Text
              style={
                currentLanguage === 'en'
                  ? { fontFamily: 'Poppins-Medium', color: '#fff' }
                  : { fontFamily: 'Poppins-Medium', color: '#3c1361' }
              }>
              EN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeLanguage('fr')}
            style={[
              currentLanguage === 'fr' ? styles.active : styles.unActive,
              { alignItems: 'center' },
            ]}>
            <Text
              style={
                currentLanguage === 'fr'
                  ? { fontFamily: 'Poppins-Medium', color: '#fff' }
                  : { fontFamily: 'Poppins-Medium', color: '#3c1361' }
              }>
              FR
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 8 }}>
          <Image
            resizeMode="contain"
            source={{ uri: authImage }}
            style={styles.img}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.welcomeText,
              { color: COLORS.primary, fontFamily: 'Poppins-Bold' },
            ]}>
            {t('registerWelcome')}
          </Text>
          <Text
            style={[
              styles.welcomeText,
              { fontFamily: 'Poppins-Medium', color: COLORS.textColor },
            ]}>
            {t('registerWelcome2')}
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            // maxLength={35}
            label="Full name"
            placeholder={t('placeholder1')}
            keyboardType="default"
            error={errors.fullname}
            onFocus={() => handleErrors(null, 'fullname')}
            onChangeText={(text) => handleOnChange(text, 'fullname')}
            inputRef={inputRef}
            onSubmitEditing={() => inputRef.current.focus()}
          />
          <Input
            // maxLength={35}
            placeholder={t('placeholder2')}
            keyboardType="email-address"
            label="Email Address"
            error={errors.email}
            onFocus={() => handleErrors(null, 'email')}
            onChangeText={(text) => handleOnChange(text, 'email')}
            onSubmitEditing={() => refInputTwo.current.focus()}
            inputRef={refInputTwo}
          />
          <PhoneInputField
            phoneInput={phoneInput}
            placeholder={t('placeholder3')}
            phoneNumber={inputs.phone}
            error={errors.phone}
            onChange={(text) => {
              handleOnChange(text, 'phone');
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <AppButton
            text={t('register')}
            color={
              !inputs.phone || inputs.phone.length < 12
                ? '#d3d3d3'
                : COLORS.primary
            }
            disabled={
              loading ||
              !inputs.fullname ||
              !inputs.phone ||
              inputs.phone.length < 12
            }
            onPress={validate}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 10,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ color: COLORS.textColor }}> {t('haveAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
                color: COLORS.primary,
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
                marginLeft: 10,
              }}>
              {t('signin')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewContainer: {
    paddingHorizontal: 15,
  },

  img: {
    width: SIZES.screenWidth * 0.35,
    height: SIZES.screenWidth * 0.35,
    alignSelf: 'flex-start',
  },
  welcomeText: {
    marginRight: 6,
    fontSize: 14,
  },
  formContainer: {
    marginTop: 8,
  },
  haveAnAccount: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  unActive: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: COLORS.primary,
    borderColor: '#3c1361',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
