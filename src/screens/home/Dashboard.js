/* eslint-disable no-unsafe-optional-chaining */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import { COLORS, IMAGES, SIZES } from '../../utility';
import { AppStatusBar, DashboardCard } from '../../components';
import { Context as AuthContext } from '../../contexts/userContext';

function Dashboard({ navigation }) {
  const { t } = useTranslation();
  const { state } = React.useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      BackHandler.exitApp();
    });
  }, [navigation]);

  useEffect(() => {
    const subscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        // Get the message body
        const messageBody = remoteMessage.notification.body;

        // Get the message title
        const messageTitle = remoteMessage.notification.title;

        // Get message image
        const avatar = remoteMessage.notification.android.imageUrl;

        // Append the message to the current messages state
        setMessages((prevMessages) => [
          ...prevMessages,
          { messageBody, messageTitle, avatar },
        ]);

        // Show an alert to the user
        Alert.alert(messageTitle, messageBody);
      },
    );

    return subscribe;
  }, [messages]);

  const { headerImage } = IMAGES;

  const dailyTips = [
    {
      id: 1,
      tip: t('weight'),
      image: IMAGES.weight,
    },
    {
      id: 2,
      tip: t('physicality'),
      image: IMAGES.sportS,
    },
    {
      id: 3,
      tip: t('fruits'),
      image: IMAGES.fruits,
    },
    {
      id: 4,
      tip: t('smoke'),
      image: IMAGES.smoke,
    },
    {
      id: 5,
      tip: t('breastFeed'),
      image: IMAGES.breastFeed,
    },
    {
      id: 6,
      tip: 'Avoid Birth Control Pills, Particularly After Age 35 or If You Smoke.',
      image: IMAGES.birthControl,
    },
    {
      id: 7,
      tip: t('hormoneControl'),
      image: IMAGES.hormone,
    },
  ];

  const randomTips = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  return (
    <>
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.greeting}>{t('welcome')}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileOverview')}
                style={styles.nameContainer}>
                <Text style={styles.name}>
                  {state?.user?.name.split(' ').shift().charAt(0) +
                    state?.user?.name.split(' ').pop().charAt(0)}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
              <View style={{ alignSelf: 'flex-start' }}>
                <Image
                  style={{
                    height: SIZES.screenHeight * 0.25,
                    width: SIZES.screenWidth * 0.45,
                  }}
                  source={{ uri: headerImage }}
                  resizeMode="contain"
                />
              </View>
              <View>
                <View style={{ marginBottom: 5, width: '90%' }}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#fff',
                      fontFamily: 'Poppins-Medium',
                      marginBottom: 5,
                    }}>
                    {t('test')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#fff',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {t('feeling')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#fff',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {t('takeTest')}
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: SIZES.screenHeight * 0.003,
                  }}>
                  <Button
                    mode="contained"
                    labelStyle={styles.testBtn}
                    onPress={() => navigation.navigate('SelfExamination')}
                    // onPress={handleLogout}
                    uppercase={false}
                    theme={{ colors: { primary: '#fff' } }}>
                    {t('btnTest')}
                  </Button>
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10, paddingTop: 15 }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  color: COLORS.textColor,
                }}>
                {t('heading')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 14,
                  width: '90%',
                  paddingBottom: 18,
                  paddingTop: 12,
                  backgroundColor: '#FBE4DD',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  borderRadius: 8,
                  marginTop: 10,
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor: '#F3F4FD',
                    width: 42,
                    height: 40,
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: 4,
                  }}>
                  <Image
                    source={{ uri: randomTips.image }}
                    style={{ width: 35, height: 35, alignSelf: 'flex-start' }}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    width: '90%',
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: COLORS.textColor,
                      fontWeight: '500',
                      fontSize: Platform.OS === 'ios' ? 15 : 12,
                    }}>
                    {randomTips.tip}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <DashboardCard />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    height: SIZES.screenHeight * 0.34,
    paddingHorizontal: 15,

    width: '100%',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SIZES.screenHeight * 0.01,
    marginHorizontal: 10,
  },
  nameContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  name: {
    color: COLORS.primary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  testBtn: {
    fontSize: 11,
    color: COLORS.primary,
    fontFamily: 'Poppins-Medium',
    justifyContent: 'center',
  },
  tips: {
    padding: 10,
    backgroundColor: '#FFE1E1',
    alignItems: 'center',
    borderRadius: SIZES.screenWidth,
  },
});
