import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppStatusBar, CustomStatusBar, SocialButton } from '../../components';
import { COLORS, IMAGES, SIZES } from '../../utility';

function Referal() {
  const { t } = useTranslation();

  // share
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${t('shareMessae1')}. \n ${t(
          'shareMessae2',
        )}  \nhttps://play.google.com/store/apps/details?id=com.checkmeapp`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <>
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <CustomStatusBar text={t('refer')} />
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
              Check Me.
            </Text>
            {t('referMessage')}
          </Text>
          <Image
            source={{
              uri: IMAGES.shareImage,
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ marginTop: 10 }}>
            <SocialButton
              backgroundColor={COLORS.primary}
              icon="share"
              iconColor={COLORS.white}
              title={t('share')}
              textColor={COLORS.white}
              onPress={onShare}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Referal;

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
