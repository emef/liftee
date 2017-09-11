import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View } from 'react-native';
import { connect } from 'react-redux';

import Actions from '../state/Actions';
import icon from '../img/icon_Log.png';

export const LogScreen = connect(
    ({log, logTab}) => ({log, logTab}),
    dispatch => ({
        onSwitchLogTab: (tab) => dispatch(Actions.SwitchLogTab(tab))
    })
)(({log, logTab, onSwitchLogTab}) => {
    const isWeeklyTab = logTab === "Weekly";
    const logItems = generateLogItems(log, isWeeklyTab);

    return (
        <View style={styles.logContainer}>
          <View style={styles.tabContainer}>
            <View style={styles.tabs}>
              <Tab
                 name="Weekly"
                 active={isWeeklyTab}
                 style={styles.tabLeft}
                 onSwitchLogTab={onSwitchLogTab} />
              <Tab
                 name="Daily"
                 active={!isWeeklyTab}
                 style={styles.tabRight}
                 onSwitchLogTab={onSwitchLogTab} />
            </View>
          </View>
          <ScrollView>{logItems}</ScrollView>
        </View>
    );
});

const Tab = ({name, active, style, onSwitchLogTab}) => {
    const tabStyle = active
              ? [style, styles.tab, styles.tabActive]
              : [style, styles.tab];

    const onPress = () => onSwitchLogTab(name);

    return (
        <TouchableHighlight style={tabStyle} onPress={onPress}>
          <Text style={styles.tabText}>{name}</Text>
        </TouchableHighlight>
    );
};

const generateLogItems = (log, isWeekly) => {
    console.log('generating items for', log);

    for (let set of log) {
        const dayIx = (set.completedAt / (1000 * 60 * 60 * 24)) | 0;
        const effectiveIx = isWeekly ? (dayIx / 7) | 0 : dayIx;
        console.log(effectiveIx);
    }

};

LogScreen.navigationOptions = {
  title: 'Log',
  icon: icon
};

const styles = StyleSheet.create({
    logContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#393939'
    },

    tabContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    itemContainer: {
        flex: 0.8
    },

    tabs: {
        flexDirection: 'row'
    },

    tab: {
        width: 80,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#2b2b2b',
        alignItems: 'center'
    },

    tabLeft: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    tabRight: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },

    tabActive: {
        backgroundColor: 'black'
    },

    tabText: {
        fontFamily: 'Helvetica-Light',
        fontSize: '0.8em',
        color: '#e5e5e5'
    }
});
