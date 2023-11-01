import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import { AppStatusBar, CustomStatusBar } from '../../components';
import { COLORS } from '../../utility';

function Settings() {
  const [isModalVisible, setModalVisible] = useState(false);

  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState(i18n.language);

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => {
        throw new Error(err);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const settings = [
    {
      title: t('changeLang'),
      screen: toggleModal,
    },
  ];

  return (
    <>
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <CustomStatusBar text={t('settings')} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{ marginHorizontal: 15, paddingVertical: 20 }}>
          <View>
            {settings.map((setting) => (
              <TouchableOpacity
                onPress={setting.screen}
                key={setting.title}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#F1B9D6',
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13 }}>
                    {setting.title}
                  </Text>
                  <Icon
                    name="md-chevron-forward-sharp"
                    size={28}
                    color="#8A8A8A"
                  />
                </View>
              </TouchableOpacity>
            ))}
            <Modal isVisible={isModalVisible} animationType="slide">
              <View style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                  }}>
                  <Pressable
                    onPress={() => changeLanguage('en')}
                    style={{
                      backgroundColor:
                        currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
                      padding: 20,
                    }}>
                    <Text
                      style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}>
                      {t('enLang')}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => changeLanguage('fr')}
                    style={{
                      backgroundColor:
                        currentLanguage === 'fr' ? '#33A850' : '#d3d3d3',
                      padding: 20,
                    }}>
                    <Text
                      style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}>
                      {t('frLang')}
                    </Text>
                  </Pressable>
                </View>
                <View style={{ paddingVertical: 10, alignSelf: 'center' }}>
                  <Button
                    color={COLORS.primary}
                    title={t('changeLanguage')}
                    onPress={toggleModal}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Settings;
