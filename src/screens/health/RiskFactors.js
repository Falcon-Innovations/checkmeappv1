import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { AppStatusBar, CustomStatusBar, SimpleLoader } from '../../components';
import { COLORS, config, SIZES, IMAGES } from '../../utility';
import RiskCard from '../../components/RiskCard';
import useDataFetching from '../../hooks/useFetchData';

function RiskFactors() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, data, fetchData] = useDataFetching(
    `${config.app.api_url}/riskFactors`,
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
      <CustomStatusBar text={t('risk')} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            paddingVertical: 8,
            alignItems: 'center',
            paddingHorizontal: SIZES.screenWidth * 0.06,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              lineHeight: 22,
              color: COLORS.textColor,
            }}>
            {t('headingRisk')}
          </Text>
          <Image
            source={{
              uri: IMAGES?.riskfactorsBanner,
            }}
            style={{
              width: SIZES.screenWidth - 40,
              height: 100,
              alignSelf: 'center',
              marginTop: 12,
            }}
            resizeMode="cover"
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SIZES.screenWidth * 0.06,
            paddingTop: SIZES.screenHeight * 0.02,
          }}>
          {loading ? (
            <SimpleLoader />
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {data?.data?.docs?.length < 1 ? (
                <View>
                  <Text style={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}>
                    Please just a little patience we are adding the risk factors
                    shortly
                  </Text>
                </View>
              ) : (
                <View style={{ marginVertical: 20 }}>
                  {data?.data?.docs?.map((item) => (
                    <RiskCard
                      key={item?._id}
                      title={item?.title}
                      description={item?.description}
                      color={item?.color}
                      image={{ uri: item?.image }}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default RiskFactors;
