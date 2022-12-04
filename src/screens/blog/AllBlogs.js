import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppStatusBar, CustomStatusBar} from '../../components';
import {COLORS, config, SIZES} from '../../utility';
import moment from 'moment';
import {voteBlog} from '../../api/blog';
import useDataFetching from '../../hooks/useFetchData';
import Error from '../../components/utils/Error';

const renderItem = ({item, index}) => {
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
            fontFamily: 'Poppins_Regular',
            fontSize: 12,
            marginBottom: 8,
            width: SIZES.screenWidth * 0.4,
          }}>
          {moment(item.createdAt).format('ll')}
        </Text>
        <Text
          numberOfLines={3}
          style={{
            width: SIZES.screenWidth * 0.49,
            paddingRight: 5,
            fontFamily: 'Poppins_SemiBold',
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

const AllBlogs = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [like, setLike] = useState(false);
  const onChangeSearch = query => setSearchQuery(query);

  // const { loading, data, error } = useBlogs();

  const [loading, error, data, fetchData] = useDataFetching(
    `${config.app.api_url}/api/v1/articles`,
  );
  useEffect(() => {
    const updateData = navigation.addListener('focus', () => {
      fetchData();
    });
    return updateData;
  }, [navigation]);

  const onLike = async id => {
    await voteBlog(id);
    setLike(!like);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check Me Blog | Download Check Me App and Visit Check Me blog for a healthy life style. \n To download go to Google Play Store and search for Check Me`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  console.warn(data);

  return (
    <>
      {error ? (
        <View
          style={{
            margin: 20,
            backgroundColor: COLORS.danger,
            borderRadius: 8,
            paddingLeft: 10,
          }}>
          <Error error={error} />
        </View>
      ) : null}
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <CustomStatusBar text={'News Feed'} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 15, paddingTop: 20}}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }>
          <View style={{marginVertical: 20, marginHorizontal: 10}}>
            <Searchbar
              placeholder="Search News"
              placeholderTextColor="#D2D1D1"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{
                elevation: 0,
                borderWidth: 0.5,
                borderColor: '#EB3E95',
              }}
              inputStyle={{
                fontSize: 14,
                fontFamily: 'Poppins_Regular',
              }}
              iconColor="#D2D1D1"
            />
          </View>
          {loading ? (
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item
                  width={SIZES.screenWidth * 0.4}
                  height={SIZES.screenWidth * 0.3}
                />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item width={120} height={20} />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={80}
                    height={20}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          ) : (
            <>
              {data?.data?.docs?.length > 0 ? (
                <FlatList
                  data={data?.data?.docs}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                />
              ) : (
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins_Regular',
                      color: COLORS.textColor,
                    }}>
                    No blog has been added to the system yet. Please be patient
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AllBlogs;

const styles = StyleSheet.create({});
