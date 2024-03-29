/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { COLORS, config, SIZES } from '../../utility';
import {
  AppStatusBar,
  ComingSoonMessage,
  CustomStatusBar,
} from '../../components';
import SimpleLoader from '../../components/utils/SimpleLoader';
import Error from '../../components/utils/Error';
import useDataFetching from '../../hooks/useFetchData';

function Specialists() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  // const { loading, data, error, fetchData } = useSpecialists();

  // const { loading, data, error } = useFetch(url);
  const [loading, error, data, fetchData] = useDataFetching(
    `${config.app.api_url}/specialists`,
  );
  useEffect(() => {
    const updateData = navigation.addListener('focus', () => {
      fetchData();
    });
    return updateData;
  }, [navigation]);

  return (
    <>
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <CustomStatusBar />
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, marginHorizontal: 10, paddingVertical: 10 }}>
          <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
            <Searchbar
              placeholder="Search Specialists"
              placeholderTextColor="#D2D1D1"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{
                elevation: 0,
                borderWidth: 0.5,
                borderColor: COLORS.borderCardColor,
              }}
              inputStyle={{
                fontSize: 14,
                fontFamily: 'Poppins_Regular',
              }}
              iconColor="#D2D1D1"
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchData} />
            }>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 13,
                  color: '#333333',
                }}>
                {t('specialistTitle')}
              </Text>
              {loading || error ? (
                <>
                  {loading === true && (
                    <View
                      style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <SimpleLoader color={COLORS.primary} />
                    </View>
                  )}
                  {error && (
                    <View
                      style={{
                        margin: 20,
                        backgroundColor: COLORS.danger,
                        borderRadius: 8,
                        paddingLeft: 10,
                      }}>
                      <Error error={error} />
                    </View>
                  )}
                </>
              ) : (
                <>
                  {data?.data?.docs?.length > 0 ? (
                    <View style={styles.card}>
                      {data?.data?.docs?.map((item) => (
                        <TouchableOpacity
                          key={item._id}
                          style={styles.cardContent}
                          onPress={() =>
                            navigation.navigate('SpecialistDetails', item)
                          }>
                          <View style={{ paddingHorizontal: 4 }}>
                            <View>
                              <Image
                                source={{ uri: item.avatar }}
                                style={styles.imge}
                                resizeMode="cover"
                              />
                            </View>
                            <View style={{ marginTop: 8 }}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontFamily: 'Poppins_SemiBold',
                                  fontSize: 14,
                                  color: COLORS.primary,
                                  marginBottom: 2,
                                }}>
                                {` ${item.firstName} ${item.lastName}`}
                              </Text>
                              <Text
                                style={{
                                  width: SIZES.screenWidth * 0.3,
                                  fontFamily: 'Poppins_Regular',
                                  fontSize: 12,
                                  color: '#AEADAD',
                                }}
                                numberOfLines={1}>
                                {item.speciality}
                              </Text>
                              <Text
                                style={{
                                  width: SIZES.screenWidth * 0.3,
                                  fontFamily: 'Poppins_Regular',
                                  fontSize: 13,
                                  color: COLORS.textColor,
                                }}
                                numberOfLines={1}>
                                {item.town}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}

                      {/* ) : (

                  )}
                </> */}
                    </View>
                  ) : (
                    <View>
                      <ComingSoonMessage text={t('message')} />
                    </View>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Specialists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
    paddingTop: SIZES.screenHeight * 0.02,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingBottom: SIZES.screenHeight * 0.03,
    justifyContent: 'center',
  },
  cardContent: {
    marginHorizontal: 7,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#FAFAFA',
    width: SIZES.screenWidth * 0.43,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 20,
    elevation: 2,
    alignItems: 'center',
  },
  imge: {
    width: SIZES.screenWidth * 0.38,
    height: SIZES.screenWidth * 0.38,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
