import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { COLORS, SIZES } from '../utility';

const VideoSlider = ({coverImg, title, date}) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        resizeMode="contain"
        source={{ uri: coverImg }}
        borderRadius={6}
        // imageStyle={{ opacity: 0.5 }}
        style={{
          width: SIZES.screenWidth * 0.5,
          height: SIZES.screenHeight * 0.17,
        }}>
        <View style={styles.overlay}>
          <View style={{marginTop:22, alignSelf:"center", justifyContent:"center"}}>
            <Icon name="play-circle" size={40} color="#fff"/>
          </View>
          <View style={styles.content}>
            <Text style={styles.textStyle}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
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