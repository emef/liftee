import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View } from 'react-native';
import { connect } from 'react-redux';

import Actions from '../state/Actions';
import icon from '../img/icon_Profile.png';

export const ProfileScreen = connect(
    ({ profile }) => ({ profile }),
    dispatch => ({
        onUpdateTrainingMax: (name, value) =>
            dispatch(Actions.UpdateTrainingMax(name, value))
    })
)(({ profile, onUpdateTrainingMax }) => {
    const trainingMaxSettings = Object.keys(profile.trainingMaxes).map((name) => (
        <TrainingMaxSetting
           key={name}
           name={name}
           currentValue={profile.trainingMaxes[name]}
           onUpdateTrainingMax={onUpdateTrainingMax} />
    ));

    return (
        <View style={styles.profileContainer}>
          <View style={styles.settingGroupContainer}>
            { trainingMaxSettings }
          </View>
        </View>
    );
});

const TrainingMaxSetting = ({name, currentValue, onUpdateTrainingMax}) => {
    let textInput = null;

    const onTextInputRef = (ref) => {
        textInput = ref;
    };

    const onChangeText = (newValue) => onUpdateTrainingMax(name, newValue);

    return (
        <TouchableHighlight onPress={() => textInput.focus()}>
          <View style={styles.settingContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <TextInput
               ref={onTextInputRef}
               onChangeText={onChangeText}
               style={styles.valueText}
               editable={true}
               defaultValue={currentValue && currentValue.toString()}
               keyboardType="numeric" />
          </View>
        </TouchableHighlight>
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
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#393939',
        flexDirection: 'row'
    },

    nameText: {
        color: '#e5e5e5',
        fontFamily: 'Helvetica-Light',
        flex: 0.4,
        textAlign: 'right',
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },

    valueText: {
        color: '#e5e5e5',
        flex: 0.6,
        borderWidth: 0,
        borderLeftWidth: 1,
        borderLeftColor: '#393939',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Helvetica-Light'
    }
});
