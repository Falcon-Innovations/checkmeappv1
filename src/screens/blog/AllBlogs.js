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
import NetInfo from '@react-native-community/netinfo';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import moment from 'moment';
import {AppStatusBar, BlogCard, CustomStatusBar} from '../../components';
import {COLORS, config, SIZES} from '../../utility';
import {voteBlog} from '../../api/blog';
import useDataFetching from '../../hooks/useFetchData';
import Error from '../../components/utils/Error';
import NoInternetModal from '../../components/NoInternetModal';

function AllBlogs() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [like, setLike] = useState(false);
  const onChangeSearch = query => setSearchQuery(query);

  // check network hooks
  const [isOffline, setOfflineStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // const { loading, data, error } = useBlogs();

  const [loading, error, data, fetchData] = useDataFetching(
    `${config.app.api_url}/articles`,
  );

  useEffect(() => {
    const updateData = navigation.addListener('focus', () => {
      fetchData();
    });
    return updateData;
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setLoading(false);
      setOfflineStatus(offline);
    });
    fetchData();

    return () => removeNetInfoSubscription();
  }, []);

  const onLike = async id => {
    await voteBlog(id);
    setLike(!like);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Check Me Blog | Download Check Me App and Visit Check Me blog for a healthy life style. \n Download from play store at  \nhttps://play.google.com/store/apps/details?id=com.checkmeapp',
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
      <CustomStatusBar text="News Feed" />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{paddingTop: 20, paddingBottom: 8, marginHorizontal: 15}}>
          <Searchbar
            placeholder="Search"
            placeholderTextColor="#D2D1D1"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{
              elevation: 0,
              borderWidth: 0.5,
              borderColor: '#EB3E95',
            }}
            inputStyle={{
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
            }}
            iconColor="#D2D1D1"
          />
          <Text style={{paddingVertical: 12, fontFamily: 'Poppins-Regular'}}>
            Everything you need to know about breast cancer and female health
            can be found here
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15, paddingTop: 20}}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }>
          {loading ? (
            <SkeletonPlaceholder>
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
                <>
                  {data?.data?.docs?.map((item, index) => (
                    <BlogCard key={index} item={item} onShare={onShare} />
                  ))}
                </>
              ) : (
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: COLORS.textColor,
                    }}>
                    No blog has been added to the system yet. Please be patient
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
        <NoInternetModal
          show={isOffline}
          onRetry={() => fetchData()}
          isRetrying={loading}
        />
      </SafeAreaView>
    </>
  );
}

export default AllBlogs;

const styles = StyleSheet.create({});
