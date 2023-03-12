/* eslint-disable react/jsx-no-useless-fragment */
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  View,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppStatusBar, BlogCard, CustomStatusBar } from '../../components';
import { COLORS, SIZES } from '../../utility';
import Error from '../../components/utils/Error';
import { useArticles } from '../../api/blog';

function Placeholder() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item
          width={SIZES.screenWidth * 0.4}
          height={SIZES.screenWidth * 0.3}
        />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

function AllBlogs() {
  const { data, isLoading, error, refetch, isError } = useArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const articles = data?.data?.data?.docs;
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    const newData = articles?.filter((article) =>
      article?.title?.toLowerCase()?.includes(query?.toLowerCase()),
    );
    setFilteredArticles(newData);
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
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  const noResult = searchQuery?.length > 3 && filteredArticles?.length === 0;

  return (
    <>
      {isError ? (
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{ paddingTop: 20, paddingBottom: 8, marginHorizontal: 15 }}>
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
          <Text style={{ paddingVertical: 12, fontFamily: 'Poppins-Regular' }}>
            Everything you need to know about breast cancer and female health
            can be found here
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 20 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }>
          {isLoading && <Placeholder />}
          {filteredArticles?.map((item) => (
            <BlogCard key={item.title} item={item} onShare={onShare} />
          ))}
          {noResult ? (
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: COLORS.textColor,
                }}>
                No blog has been added to the system yet. Please be patient
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default AllBlogs;
