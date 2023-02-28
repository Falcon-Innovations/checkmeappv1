import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../utility';

function SocialButton({
  onPress,
  icon,
  title,
  backgroundColor,
  iconColor,
  textColor,
}) {
  return (
    <View style={styles.appButtonContainer}>
      <Icon.Button
        name={icon}
        backgroundColor={backgroundColor}
        onPress={onPress}
        style={styles.appButton}
        iconStyle={{ color: iconColor }}>
        <Text style={[styles.appButtonText, { color: textColor }]}>
          {title}
        </Text>
      </Icon.Button>
    </View>
  );
}

export default SocialButton;

const styles = StyleSheet.create({
  appButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,

    borderColor: COLORS.primary,
  },
  appButtonText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  appButtonContainer: {
    paddingVertical: 6,
  },
});
