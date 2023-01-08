import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {Divider} from 'react-native-elements';
import {WebView} from 'react-native-webview';

import {COLORS, IMAGES, SIZES} from '../../utility';
import {
  Input,
  AppButton,
  PhoneInputField,
  SocialButton,
} from '../../components';
import {Context as UserContext} from '../../contexts/userContext';
import Loader from '../../components/utils/Loader';

import {useTranslation} from 'react-i18next';
import '../../../assets/i18n/i18n';

// RNNBottomSheet.init();

const Register = () => {
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const ref_input2 = useRef();
  const phoneInput = useRef(null);

  const {signUp} = React.useContext(UserContext);

  const {t, i18n} = useTranslation();
  const [currentLanguage, setLanguage] = useState(i18n.language);
  const [isModalVisible, setModalVisible] = useState(false);

  const [inputs, setInputs] = useState({
    fullname: '',
    phone: '',
    pin: '',
    kfirmPin: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

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

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
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
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleErrors = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const authImage = IMAGES.authImage;

  //bottomsheet for web view

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: SIZES.screenHeight,
        paddingHorizontal: 15,
        paddingVertical: 10,
        // flex: 2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>{t('condition')}</Text>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}>
          <Icon name="close" size={20} />
        </TouchableOpacity>
      </View>
      <Divider
        style={{marginTop: 5}}
        orientation="horizontal"
        width={0.5}
        height={5}
        color={'#d3d3d3'}
      />

      <WebView
        source={{
          uri: 'https://checkme-app.falcon-innov.com/privacy.html',
        }}
      />
    </View>
  );

  const sheetRef = React.createRef(null);
  const fall = new Animated.Value(1);

  return (
    <>
      {loading ? (
        <View style={styles.viewContainer}>
          <Loader visible={true} />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView
            style={styles.viewContainer}
            contentContainerStyle={{paddingTop: SIZES.screenHeight * 0.02}}>
            <View
              style={{
                alignSelf: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop:
                  Platform.OS == 'ios'
                    ? SIZES.screenHeight * 0.01
                    : SIZES.screenHeight * 0.04,
              }}>
              <TouchableOpacity
                onPress={() => changeLanguage('en')}
                style={[
                  currentLanguage === 'en' ? styles.active : styles.unActive,
                  {marginRight: 8},
                ]}>
                <Text
                  style={
                    currentLanguage === 'en'
                      ? {fontFamily: 'Poppins_Medium', color: '#fff'}
                      : {fontFamily: 'Poppins_Medium', color: '#3c1361'}
                  }>
                  EN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeLanguage('fr')}
                style={[
                  currentLanguage === 'fr' ? styles.active : styles.unActive,
                  {alignItems: 'center'},
                ]}>
                <Text
                  style={
                    currentLanguage === 'fr'
                      ? {fontFamily: 'Poppins_Medium', color: '#fff'}
                      : {fontFamily: 'Poppins_Medium', color: '#3c1361'}
                  }>
                  FR
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: 10, paddingBottom: 8}}>
              <Image
                resizeMode="contain"
                source={{uri: authImage}}
                style={styles.img}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.welcomeText,
                  {color: COLORS.primary, fontFamily: 'Poppins_Bold'},
                ]}>
                {t('registerWelcome')}
              </Text>
              <Text
                style={[
                  styles.welcomeText,
                  {fontFamily: 'Poppins_Medium', color: COLORS.textColor},
                ]}>
                {t('registerWelcome2')}
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                // maxLength={35}
                label={'Full name'}
                placeholder={t('placeholder1')}
                keyboardType="default"
                error={errors.fullname}
                onFocus={() => handleErrors(null, 'fullname')}
                onChangeText={text => handleOnChange(text, 'fullname')}
                inputRef={inputRef}
                onSubmitEditing={() => inputRef.current.focus()}
              />
              <Input
                // maxLength={35}
                placeholder={t('placeholder2')}
                keyboardType="email-address"
                label={'Email Address'}
                error={errors.email}
                onFocus={() => handleErrors(null, 'email')}
                onChangeText={text => handleOnChange(text, 'email')}
                onSubmitEditing={() => ref_input2.current.focus()}
                inputRef={ref_input2}
              />

              <PhoneInputField
                phoneInput={phoneInput}
                placeholder={t('placeholder3')}
                phoneNumber={inputs.phone}
                error={errors.phone}
                onChange={text => {
                  handleOnChange(text, 'phone');
                }}
              />

              {/* <Input
                placeholder="Enter a password"
                error={errors.pin}
                pin
                onFocus={() => handleErrors(null, 'pin')}
                onChangeText={(text) => handleOnChange(text, 'pin')}
              />
              <Input
                placeholder="Confirm your password"
                error={errors.kfirmPin}
                pin
                onFocus={() => handleErrors(null, "kfirmpin")}
                onChangeText={(text) => handleOnChange(text, "kfirmpin")}
              /> */}
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Text style={{color: COLORS.textColor}}>{t('terms')}</Text>
              <TouchableWithoutFeedback
                onPress={() => sheetRef.current.snapTo(0)}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    textDecorationColor: '#000',
                    color: COLORS.primary,
                    fontFamily: 'Poppins_Medium',
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  {t('condition')}
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={{marginTop: 20}}>
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
            {/* <View
              style={{
                alignItems: 'center',
                marginVertical: 15,
                fontFamily: 'Poppins_Regular',
              }}>
              <Text>Or you can sign up with</Text>
            </View>

            <SocialButton
              icon="google"
              title="Login with Google"
              backgroundColor="#3b5998"
            /> */}

            <View
              style={{
                alignItems: 'center',
                paddingVertical: 10,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{color: COLORS.textColor}}> {t('haveAccount')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    textDecorationColor: '#000',
                    color: COLORS.primary,
                    fontFamily: 'Poppins_Medium',
                    fontSize: 15,
                    marginLeft: 10,
                  }}>
                  {t('signin')}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
          <BottomSheet
            ref={sheetRef}
            snapPoints={[SIZES.screenHeight * 0.9, 0]}
            borderRadius={10}
            initialSnap={1}
            renderContent={renderContent}
            callbackNode={fall}
            enabledGestureInteraction={true}
          />
        </SafeAreaView>
      )}
    </>
  );
};

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
  viewContainer: {
    paddingHorizontal: 15,
  },

  welcomeText: {
    marginRight: 6,
    fontSize: 14,
  },

  formContainer: {
    marginTop: 8,
  },
  haveAnAccount: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins_Regular',
  },
  unActive: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'ios' ? 8 : 6,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'ios' ? 8 : 6,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: COLORS.primary,
    borderColor: '#3c1361',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
