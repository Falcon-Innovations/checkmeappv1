import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IMAGES, SIZES } from '../../utility';

function SocialBtn({ onPress = () => {} }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
      }}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={[styles.socials, { marginRight: 20 }]}
          source={IMAGES.facebookLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.socials} source={IMAGES.googleLogo} />
      </TouchableOpacity>
    </View>
  );
}

export default SocialBtn;

const styles = StyleSheet.create({
  socials: {
    width: SIZES.screenWidth * 0.09,
    height: SIZES.screenWidth * 0.09,
  },
});
