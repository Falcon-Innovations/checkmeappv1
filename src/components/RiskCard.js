import {
  Button,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { COLORS, SIZES } from '../utility';

function RiskCard({ title, description, color, image }) {
  const { t } = useTranslation();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: SIZES.screenWidth * 0.05,
        paddingVertical: 12,
        backgroundColor: color,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: SIZES.screenHeight * 0.03,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignSelf: 'flex-start',
            width: '80%',
            paddingHorizontal: 6,
          }}>
          <Text
            numberOfLines={1}
            style={{
              marginBottom: Platform.OS === 'ios' ? 12 : 8,
              fontSize: 15,
              fontFamily: 'Poppins-Medium',
            }}>
            {title}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              fontFamily: 'Poppins-Regular',
              marginBottom: 8,
              color: COLORS.textColor,
            }}>
            {description}
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: COLORS.primary,
                fontSize: 14,
              }}>
              {t('readMore')}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            resizeMode="contain"
            source={image}
            style={{
              width: SIZES.screenWidth * 0.18,
              height: SIZES.screenWidth * 0.16,
            }}
          />
        </View>
      </View>
      <Modal
        style={{
          justifyContent: 'center',
          paddingVertical: SIZES.screenHeight * 0.06,
        }}
        isVisible={isModalVisible}
        animationType="slide">
        <View style={{ backgroundColor: '#fff', borderRadius: 8 }}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: SIZES.screenHeight * 0.06 }}
            style={{
              paddingHorizontal: SIZES.screenWidth * 0.06,
              paddingTop: SIZES.screenHeight * 0.04,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: SIZES.screenHeight * 0.04,
              }}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  width: '75%',
                  paddingHorizontal: 6,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: '#3C1053',
                    fontSize: Platform.OS === 'ios' ? 18 : 15,
                  }}>
                  {title}
                </Text>
              </View>

              <Image
                resizeMode="contain"
                source={image}
                style={{
                  width: SIZES.screenWidth * 0.18,
                  height: SIZES.screenWidth * 0.16,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'left',
                  lineHeight: 24,
                  color: COLORS.textColor,
                }}>
                {description}
              </Text>
            </View>
          </ScrollView>
          <View style={{ paddingVertical: 10, alignSelf: 'center' }}>
            <Button
              color={COLORS.primary}
              title={t('close')}
              onPress={toggleModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default RiskCard;
