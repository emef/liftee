import React from 'react';
import { StyleSheet, View } from 'react-native';

import icon from '../img/icon_Log.png';

export const LogScreen = () => (
  <View style={styles.home}>
    home
  </View>
);

LogScreen.navigationOptions = {
  title: 'Log',
  icon: icon
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  next: {
    flex: 1,
    backgroundColor: 'skyblue'
  }
});
