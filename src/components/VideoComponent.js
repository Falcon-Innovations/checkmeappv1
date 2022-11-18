import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VideoPlayer from 'react-native-video-player';

const VideoComponent = ({source, thumbnail}) => {
  return (
    <View>
      <VideoPlayer
        video={source}
        videoWidth={width}
        videoHeight={180}
        autoplay={false}
        endWithThumbnail={true}
        thumbnail={thumbnail}
      />
    </View>
  );
};
const width = Dimensions.get('window').width;
export default VideoComponent;

const styles = StyleSheet.create({});
