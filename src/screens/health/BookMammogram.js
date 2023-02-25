import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppButton, AppStatusBar, CustomStatusBar } from '../../components';
import { COLORS, SIZES } from '../../utility';

function BookMammogram() {
  const navigation = useNavigation();
  return (
    <>
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <CustomStatusBar />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: 20,
            marginHorizontal: 15,
            paddingBottom: SIZES.screenHeight * 0.2,
          }}
          contentContainerStyle={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins_Medium',
              fontSize: 16,
              alignItems: 'center',
              textAlign: 'center',
              color: COLORS.textColor,
            }}>
            {'Book a mammogram '}
            <Text
              style={{ fontFamily: 'Poppins_Medium', color: COLORS.primary }}>
              {' appointment \n'}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_Medium',
                fontSize: 16,
                color: COLORS.textColor,
              }}>
              with your nearest hospital
            </Text>
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: SIZES.screenHeight * 0.09,
            }}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910061/Calendar_ipogu2.png',
              }}
              resizeMode="contain"
              style={{
                width: SIZES.screenWidth * 0.52,
                height: SIZES.screenWidth * 0.52,
              }}
            />
          </View>
          <View style={{ marginTop: SIZES.screenHeight * 0.1 }}>
            <Text
              style={{
                fontFamily: 'Poppins_Regular',
                fontSize: 14,
                alignItems: 'center',
                textAlign: 'center',
                paddingHorizontal: 20,
                color: COLORS.textColor,
              }}>
              A mammogram is an x-ray exam of your breast. It can spot signs of
              breast cancer that are too small to be felt by you or your doctor.
            </Text>
          </View>
          <View
            style={{
              marginTop: SIZES.screenHeight * 0.1,
              marginBottom: SIZES.screenHeight * 0.08,
            }}>
            <AppButton
              text="Get Started"
              color={COLORS.primary}
              //   disabled={loading}
              onPress={() => navigation.navigate('Hospitals')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default BookMammogram;
