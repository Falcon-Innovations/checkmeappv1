import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utility';

const BodyPart = ({item, setBodyPart, bodyPart}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setBodyPart(item);
      }}
      style={[
        styles.tabView,
        {
          backgroundColor: bodyPart === item ? COLORS.primary : 'transparent',
          borderColor: bodyPart === item ? 'transparent' : '#F8D8D9',
        },
      ]}>
      <View>
        <Text
          style={[
            styles.title,
            {
              color: bodyPart === item ? COLORS.white : 'gray',
            },
          ]}>
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BodyPart;

const styles = StyleSheet.create({
  tabView: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 0.7,
    borderRadius: 4,
    marginRight: 10,
  },
  title: {
    textTransform: 'capitalize',
  },
});
