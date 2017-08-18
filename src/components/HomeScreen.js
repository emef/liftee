import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import icon from '../img/icon_Home.png';

export const HomeScreen = connect(
    ({ program }) => ({ program }),
    dispatch => ({})
)(({ program }) => {
  return (
        <View style={styles.home}>
          <ProgramStatus program={program.name} />
        </View>
    );
});

const ProgramStatus = ({ program }) => {
    return <Text>home</Text>;
};

HomeScreen.navigationOptions = {
    title: 'Home',
    icon: icon
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: 'white'
    }

});
