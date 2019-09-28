import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View } from 'react-native';
import { connect } from 'react-redux';

import Actions from '../state/Actions';
import Programs from '../state/Programs';
import icon from '../img/icon_Profile.png';

export const ProfileScreen = connect(
  ({ profile, program }) => ({ profile, program }),
    dispatch => ({
        onUpdateTrainingMax: (name, value) =>
          dispatch(Actions.UpdateTrainingMax(name, value)),
        onSetProgram: (program_name) => dispatch(Actions.SetProgram(program_name))
    })
  )(({ profile, program, onUpdateTrainingMax, onSetProgram }) => {
    const trainingMaxSettings = Object.keys(profile.trainingMaxes).map((name) => (
        <TrainingMaxSetting
           key={name}
           name={name}
           currentValue={profile.trainingMaxes[name]}
           onUpdateTrainingMax={onUpdateTrainingMax} />
    ));

    return (
        <View style={styles.profileContainer}>
          <SectionHeader text="Program Selector" />
          <ProgramSelector curProgram={program.name} onSetProgram={onSetProgram} />

          <SectionHeader text="Current Lifts" />
          <View style={styles.settingGroupContainer}>
            { trainingMaxSettings }
          </View>
        </View>
    );
});

const ProgramSelector = ({curProgram, onSetProgram}) => {
  const programButtons = Programs.getAllPrograms().map((name) => {
    if (name === curProgram) {
      return (
          <Button key={name} onPress={() => {}} disabled title={name + " (selected)"} />
      );
    } else {
      return (
          <Button key={name} onPress={() => onSetProgram(name)} title={name} color='#2b2b2b' />
      )
    }
  });

  return (
      <View>
        {programButtons}
      </View>
  )
};

const TrainingMaxSetting = ({name, currentValue, onUpdateTrainingMax}) => {
    let textInput = null;

    const onTextInputRef = (ref) => {
        textInput = ref;
    };

    const onChangeText = (newValue) => onUpdateTrainingMax(name, newValue);
    const currentValueString = currentValue.toString();

    return (
        <TouchableHighlight onPress={() => textInput.focus()}>
          <View style={styles.settingContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <TextInput
               ref={onTextInputRef}
               onChangeText={onChangeText}
               style={styles.valueText}
               editable={true}
               defaultValue={currentValueString}
               keyboardType="numeric" />
          </View>
        </TouchableHighlight>
    );
};

const SectionHeader = ({text}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{text}</Text>
    </View>
);

ProfileScreen.navigationOptions = {
    title: 'Profile',
    icon: icon
};

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#393939'
    },

    sectionHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '2em',
      marginTop: 40
    },

    sectionHeaderText: {
      fontSize: '1em',
      color: '#fc4c02'
    },

    programButton: {
      fontFamily: 'Helvetica-Light',
    },

    settingGroupContainer: {
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
