import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import SendSMS from 'react-native-sms';

import {AppButton, AppStatusBar, CustomStatusBar} from '../../components';
import {COLORS, IMAGES, SIZES} from '../../utility';
import {Context as AuthContext} from '../../contexts/userContext';
import {Platform} from 'react-native';

const Help = () => {
  const {t} = useTranslation();

  const {state} = React.useContext(AuthContext);
  const [mobileNumber, setMobileNumber] = useState('+237694914857');
  const [whatsAppMsg, setWhatsAppMsg] = useState(
    `Greetings team Check Me. I am a user of Check Me mobile application. My name is ${state?.user?.name}. Please how do i book an appointment for my breast cancer counseling and screening (REPLACE WITH YOUR MESSAGE)`,
  );

  //whatsapp
  const initiateWhatsAppSMS = () => {
    // Check for perfect 10 digit length
    if (mobileNumber < 9) {
      alert(
        `This number ${mobileNumber} isn't on whatsapp or it is wrong  for now.`,
      );
      return;
    }
    // Using 91 for India
    // You can change 91 with your country code
    let url = 'whatsapp://send?text=' + whatsAppMsg + '&phone=' + mobileNumber;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp is installed on your device');
      });
  };

  //Call
  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${mobileNumber}`;
    } else {
      number = `tel:${mobileNumber}`;
    }
    Linking.openURL(number);
  };

  return (
    <>
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <CustomStatusBar text={t('help')} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 30,
          }}>
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
            }}>
            {t('thnkU')}{' '}
            <Text
              style={{
                fontSize: 14,
                color: COLORS.primary,
                fontFamily: 'Poppins-Bold',
              }}>
              Check Me
            </Text>
            {t('thankUnessage')}
          </Text>
          <Image
            source={{
              uri: IMAGES.helpImage,
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{marginTop: 10}}>
            <AppButton
              text={'WhatsApp +237 694 914 857'}
              color={COLORS.primary}
              onPress={initiateWhatsAppSMS}
            />
          </View>
          <View style={{marginTop: 20}}>
            <AppButton
              text={`${t('call')} +237 694 914 857`}
              color={'#9C91AA'}
              onPress={openDialScreen}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: SIZES.screenWidth,
    height: SIZES.screenHeight * 0.45,
    alignSelf: 'center',
  },
});
