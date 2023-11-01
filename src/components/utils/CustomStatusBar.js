import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import Icons from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utility';

function CustomStatusBar({ text }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back-sharp" color="#8A8A8A" size={28} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 12,
            color: COLORS.textColor,
          }}>
          {text}
        </Text>
        <TouchableOpacity>
          <Icons name="more-vertical" color="#8A8A8A" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomStatusBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },

  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
