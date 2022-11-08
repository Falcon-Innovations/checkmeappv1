import React from 'react';
import {ImageBackground} from 'react-native';
import {SIZES} from '../../utility';

export const CustomImageBackground = ({imgSrc}) => {
  return (
    <ImageBackground
      imageStyle={{borderRadius: 8}}
      style={{
        width: '100%',
        height: SIZES.screenHeight * 0.2,
        alignSelf: 'center',
      }}
      source={{uri: imgSrc}}
      resizeMode="cover"
      // defaultSource={}
    />
  );
};
