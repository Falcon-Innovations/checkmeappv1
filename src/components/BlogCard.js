import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import React, { useContext } from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../utility';
import { useLikeBlog, useUnLikeBlog } from '../api/blog';
import { Context as AuthContext } from '../contexts/userContext';

function BlogCard({ item, onShare }) {
  const navigation = useNavigation();
  const { mutate, isLoading } = useLikeBlog();
  const { mutate: unlike, isLoading: isUnlikeLoading } = useUnLikeBlog();
  const { state } = useContext(AuthContext);
  const userId = state?.user?._id;
  const hasLiked = item?.likes?.some((id) => id === userId);
  const handlePressLike = () => {
    if (hasLiked) {
      unlike({ articleId: item?._id });
      return;
    }
    mutate({ articleId: item?._id });
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BlogDetails', item)}
      key={item._id}
      style={styles.row}>
      <View>
        <ImageBackground
          imageStyle={{ borderRadius: 8 }}
          resizeMode="cover"
          source={{ uri: item.photo }}
          style={{
            width: SIZES.screenWidth * 0.4,
            height: SIZES.screenWidth * 0.3,
          }}
        />
      </View>
      <View style={{ paddingLeft: 20, marginRight: 14 }}>
        <Text style={styles.time}>{moment(item.createdAt).format('ll')}</Text>
        <Text numberOfLines={3} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.action}>
          <View style={styles.actionContainer} />
          <TouchableOpacity onPress={onShare}>
            <Icon
              name="ios-share-outline"
              size={24}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading || isUnlikeLoading}
            onPress={handlePressLike}>
            <Icon
              name={hasLiked ? 'heart' : 'heart-outline'}
              color={hasLiked ? COLORS.primary : undefined}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default BlogCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  time: {
    color: 'gray',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    marginBottom: 8,
    width: SIZES.screenWidth * 0.4,
  },
  title: {
    flexWrap: 'wrap',
    width: SIZES.screenWidth * 0.48,
    paddingRight: 5,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.textColor,
    fontSize: 15.5,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
