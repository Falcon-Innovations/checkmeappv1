import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { COLORS, SIZES } from '../utility';

const VideoSlider = ({item}) => {
  return (
    <TouchableOpacity onPress={() => handleOnPress(item)}>
      <ImageBackground
        resizeMode="contain"
        source={{ uri: item?.snippet?.thumbnails?.medium?.url }}
        borderRadius={6}
        style={{
          width: SIZES.screenWidth * 0.5,
          height: SIZES.screenHeight * 0.17,
        }}>
        <View style={styles.overlay}>
          <View
            style={{
              marginTop: 22,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="play-circle" size={40} color="#fff" />
          </View>
          <View style={styles.content}>
            <Text style={styles.textStyle}>{item?.snippet?.title}</Text>
            <Text style={styles.date}>{item?.snippet?.publishedAt}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default VideoSlider

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: 'rgba(40,40,40,0.377)',
    paddingHorizontal: 10,
    paddingVertical:10,
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
  },
  date:{
    fontFamily:"Poppins-Regular",
    fontSize:8,
    color:COLORS.primary
  },
  content: {
    marginTop: 4,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
});