import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icons from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import moment from 'moment';
import {Context as UserContext} from '../../contexts/userContext';
import {
  AppButton,
  AppStatusBar,
  CustomStatusBar,
  Input,
  ImagePickerModal,
} from '../../components';
import {COLORS} from '../../utility';
import TextAreaInput from '../../components/inputs/TextAreaInput';
import Loader from '../../components/utils/Loader';

const EditProfile = () => {
  const {state, updateProfile, updateMyAvatar} = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [inputs, setInputs] = useState({
    fullname: null,
    phone: null,
    email: null,
    bio: null,
    birthDate: null,
  });

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    await updateProfile({
      email: inputs.email ?? state?.user?.email,
      name: inputs.fullname ?? state?.user?.name,
      bio: inputs.bio ?? state?.user?.bio,
      birthDate: inputs.birthDate ?? state?.user?.birthDate,
    });
    setLoading(false);
  };

  const onDateChange = val => {
    setInputs(prevState => {
      return {
        ...prevState,
        birthDate: val,
      };
    });
  };

  const formatDate = date => {
    return date ? moment(date).format('ll') : null;
  };

  const maxDate = moment().subtract(7, 'years');

  // const pickImage = async () => {
  //   let permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert('Permission to access camera roll is required!');
  //     return;
  //   }

  //   let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (pickerResult.cancelled === true) {
  //     return;
  //   } else {
  //     const uri = pickerResult?.uri;
  //     setLoading(true);
  //     await updateMyAvatar({file: uri});
  //     setLoading(false);
  //     // setSelectedImage({ localUri: pickerResult.uri });
  //   }
  // };

  const onImageLibraryPress = useCallback(() => {
    setVisible(false);

    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = useCallback(() => {
    setVisible(false);
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const image = pickerResponse?.assets && pickerResponse.assets[0];

  const updateProfileImage = async () => {
    const uri =
      Platform.OS === 'android'
        ? image?.uri
        : image?.uri.replace('file://', '');
    setLoading(true);
    await updateMyAvatar({file: uri});
    setLoading(false);
    setSelectedImage({localUri: image?.uri});
  };

  console.log(state?.user);
  return (
    <>
      <AppStatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <CustomStatusBar text={'Edit Profile'} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        {loading && <Loader visible={true} />}
        <KeyboardAwareScrollView
          extraHeight={100}
          contentContainerStyle={{paddingBottom: 35}}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          style={{marginHorizontal: 15, paddingTop: 20}}>
          <View style={{alignSelf: 'center', flexDirection: 'row'}}>
            <ImageBackground
              imageStyle={{borderRadius: 60}}
              source={
                state?.user?.avatar
                  ? {uri: state?.user?.avatar}
                  : {
                      uri: 'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910045/user_xpovba.png',
                    }
              }
              style={{
                width: 80,
                height: 80,
              }}
              resizeMode="cover">
              <TouchableOpacity
                onPress={() => setVisible(true)}
                activeOpacity={0.6}
                style={styles.iconContainer}>
                <Icon name="ios-camera-outline" size={15} color="#fff" />
              </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity onPress={updateProfileImage}>
              <Text>Update Image</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <Text style={styles.title}>Full Name</Text>
              <Input
                placeholder="Enter your name"
                keyboardType="default"
                defaultValue={state?.user?.name}
                onChangeText={text => handleOnChange(text, 'fullname')}
              />
            </View>
            <View>
              <Text style={styles.title}>Email Address</Text>
              <Input
                placeholder="Enter your email"
                keyboardType="default"
                defaultValue={state?.user?.email}
                onChangeText={text => handleOnChange(text, 'email')}
              />
            </View>

            <View style={styles.container}>
              <Text style={styles.title}>Date of Birth</Text>
              <View style={styles.dateContainer}>
                <View style={styles.dateView}>
                  <Text>
                    {formatDate(inputs?.birthDate) ??
                      formatDate(state?.user?.birthDate)}
                  </Text>
                  <TouchableOpacity onPress={toggleModal}>
                    <Icons name="calendar" size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
              <Modal isVisible={isModalVisible} animationType="slide">
                <View style={{backgroundColor: '#fff', borderRadius: 8}}>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                    }}>
                    <CalendarPicker
                      width={deviceWidth - 50}
                      onDateChange={onDateChange}
                      selectedDayColor={COLORS.primary}
                      selectedDayTextColor="#FFFFFF"
                      maxDate={maxDate}
                      textStyle={{
                        fontFamily: 'Poppins_Regular',
                        color: '#000000',
                      }}
                    />
                  </View>
                  <View style={{paddingVertical: 10, alignSelf: 'center'}}>
                    <Button
                      color={COLORS.primary}
                      title="Set Date"
                      onPress={toggleModal}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View>
              <Text style={styles.title}>Tell us about you</Text>
              <TextAreaInput
                defaultValue={state?.user?.bio}
                onChangeText={text => handleOnChange(text, 'bio')}
              />
            </View>
            <View style={{marginTop: 20}}>
              <AppButton
                text="Update Info"
                color={COLORS.primary}
                disabled={loading}
                onPress={handleUpdateProfile}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <ImagePickerModal
          isVisible={visible}
          onClose={() => setVisible(false)}
          onImageLibraryPress={onImageLibraryPress}
          onCameraPress={onCameraPress}
        />
      </SafeAreaView>
    </>
  );
};

const deviceWidth = Dimensions.get('window').width;
export default EditProfile;

const styles = StyleSheet.create({
  iconContainer: {
    paddingVertical: 6,
    paddingHorizontal: 7,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    position: 'absolute',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  dateContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 15,

    borderColor: '#DBD9D9',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  title: {
    fontFamily: 'Poppins_Regular',
    marginBottom: 6,
    marginLeft: 4,
  },
});