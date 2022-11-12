import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const VideoComponent = () => {
  return (
    <View>
      <Video
        source={{
          uri: 'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665915548/brest-examine_epafej.jpg',
        }}
        style={{width: 200, height: 150}}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        volume={1.0}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
    </View>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({});
