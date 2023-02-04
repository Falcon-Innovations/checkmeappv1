import {StyleSheet, StatusBar, View, Platform} from 'react-native';

import React from 'react';
import {SIZES} from '../../utility';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? SIZES.screenHeight * 0.06 : StatusBar.currentHeight;

function AppStatusBar({backgroundColor, ...props}) {
  return (
    <View style={[{height: STATUSBAR_HEIGHT}, {backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default AppStatusBar;

const styles = StyleSheet.create({});
