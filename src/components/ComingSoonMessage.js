import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES} from '../utility';
import AppButton from './utils/AppButton';

const ComingSoonMessage = ({text}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={{marginTop: 20}}>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/dftozcqnt/image/upload/v1672852152/Breast_cancer_awareness-pana_rwhcvb.png',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={{color: COLORS.textColor, textAlign: 'center'}}>{text}</Text>
      <View style={{marginTop: SIZES.screenHeight * 0.06}}>
        <AppButton
          text={t('specBtn')}
          color={COLORS.primary}
          onPress={() => navigation.navigate('Blogs')}
        />
      </View>
    </View>
  );
};

export default ComingSoonMessage;

const styles = StyleSheet.create({
  image: {
    width: SIZES.screenWidth * 0.5,
    height: 120,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: SIZES.screenHeight * 0.04,
  },
});
