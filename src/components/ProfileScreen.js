import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Actions from '../state/Actions';
import icon from '../img/icon_Profile.png';

export const ProfileScreen = connect(
    ({ profile }) => ({ profile }),
    dispatch => ({
        onUpdateSetting: (name, value) =>
            dispatch(Actions.UpdateSetting(name, value))
    })
)(({ profile, onUpdateSetting }) => {
    const trainingMaxSettings = Object.keys(profile.trainingMaxes).map((name) => (
        <TrainingMaxSetting
           key={name}
           name={name}
           currentValue={profile.trainingMaxes[name]}
           onUpdateSetting={onUpdateSetting} />
    ));

    return (
        <View style={styles.profileContainer}>
          <View style={styles.settingGroupContainer}>
            { trainingMaxSettings }
          </View>
        </View>
    );
});

const TrainingMaxSetting = ({name, currentValue, onUpdateSetting}) => {
    return (
        <View style={styles.settingContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.valueText}>{currentValue}</Text>
        </View>
    );
};

ProfileScreen.navigationOptions = {
    title: 'Profile',
    icon: icon
};

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#393939'
    },

    settingGroupContainer: {
        marginTop: 50,
        backgroundColor: '#2b2b2b'
    },

    settingContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#272727',
        flexDirection: 'row'
    },

    nameText: {
        color: 'white',
        flex: 0.4,
        textAlign: 'right',
        paddingRight: 10
    },

    valueText: {
        color: 'white',
        flex: 0.6
    }
});
