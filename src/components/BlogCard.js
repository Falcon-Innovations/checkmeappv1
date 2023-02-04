import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import moment from 'moment';
import {COLORS, SIZES} from '../utility';
import {useNavigation} from '@react-navigation/native';

const BlogCard = ({item, onShare}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BlogDetails', item)}
      key={item._id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
      }}>
      <View>
        <ImageBackground
          imageStyle={{borderRadius: 8}}
          resizeMode="cover"
          source={{uri: item.photo}}
          style={{
            width: SIZES.screenWidth * 0.4,
            height: SIZES.screenWidth * 0.3,
          }}></ImageBackground>
      </View>
      <View style={{paddingLeft: 20, marginRight: 14}}>
        <Text
          style={{
            color: 'gray',
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
            marginBottom: 8,
            width: SIZES.screenWidth * 0.4,
          }}>
          {moment(item.createdAt).format('ll')}
        </Text>
        <Text
          numberOfLines={3}
          style={{
            flexWrap: 'wrap',
            width: SIZES.screenWidth * 0.48,
            paddingRight: 5,
            fontFamily: 'Poppins-SemiBold',
            color: COLORS.textColor,
            fontSize: 15.5,
          }}>
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 18,
            }}></View>
          <TouchableOpacity onPress={onShare}>
            <Icon name="ios-share-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({});
