import React, { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';

import '../../../assets/i18n/i18n';
import { COLORS, IMAGES, SIZES } from '../../utility';
import { AppButton, PhoneInputField, Loader } from '../../components';
import { Context as UserContext } from '../../contexts/userContext';

function Login() {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState(i18n.language);

  const { sendOTP } = React.useContext(UserContext);
  const [inputs, setInputs] = useState({
    phone: '',
  });
  const phoneInput = useRef(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // change language
  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => Promise.reject(err));
  };

  const handleSignIn = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.phone) {
      handleErrors('Please input phone number', 'phone');
      isValid = false;
    } else if (inputs.phone.length < 9) {
      handleErrors('Please enter valid phone number', 'phone');
      isValid = false;
    }
    if (isValid) {
      setLoading(true);
      await sendOTP({ phoneNumber: inputs.phone });
      setLoading(false);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const { authImage } = IMAGES;

  return (
    <>
      <StatusBar hidden={false} backgroundColor={COLORS.primary} />
      {loading ? (
        <View style={styles.viewContainer}>
          <Loader visible />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView
            style={styles.viewContainer}
            contentContainerStyle={{
              justifyContent: 'center',
              paddingTop: SIZES.screenHeight * 0.02,
            }}>
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
                      : { fontFamily: 'Poppin-Medium', color: '#3c1361' }
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '60%',
              }}>
              <Text
                style={[
                  styles.welcomeText,
                  { color: COLORS.primary, fontFamily: 'Poppins-Bold' },
                ]}>
                {t('welcome1')}
              </Text>
              <Text
                style={[
                  styles.welcomeText,
                  {
                    fontFamily: 'Poppins-Medium',
                    fontSize: 12,
                    color: COLORS.textColor,
                  },
                ]}>
                {t('welcome2')}
              </Text>
            </View>
            <View style={styles.formContainer}>
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
                text={t('login')}
                color={
                  !inputs.phone || inputs.phone.length < 12
                    ? '#d3d3d3'
                    : COLORS.primary
                }
                onPress={handleSignIn}
                disabled={loading || !inputs.phone || inputs.phone.length < 12}
              />
            </View>

            <View
              style={{
                alignItems: 'center',
                paddingVertical: 10,
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: SIZES.screenHeight * 0.02,
              }}>
              <Text style={{ color: COLORS.textColor }}>{t('noAccount')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
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
                  {t('signup')}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  img: {
    width: SIZES.screenWidth * 0.35,
    height: SIZES.screenWidth * 0.35,
    alignSelf: 'flex-start',
  },
  viewContainer: {
    paddingHorizontal: 15,
  },

  imageContainer: {},

  welcomeText: {
    marginRight: 6,
    fontSize: 14,
    flexWrap: 'wrap',
  },

  formContainer: {
    marginTop: 20,
  },
  resendBtn: {
    color: '#EB4864',
    fontSize: 18,
    marginLeft: 20,
  },
  loginView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  haveAnAccount: {
    fontSize: 13,
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
