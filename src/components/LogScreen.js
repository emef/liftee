import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import icon from '../img/icon_Log.png';

export const LogScreen = () => (
    <View style={styles.logContainer}>
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <Tab name="Weekly" active={true} style={styles.tabLeft}/>
          <Tab name="Daily" style={styles.tabRight}/>
        </View>
      </View>
      <View style={styles.itemContainer}>
        items
      </View>
    </View>
);

const Tab = ({ name, active, style, onTabPressed }) => {
    const tabStyle = active
              ? [style, styles.tab, styles.tabActive]
              : [style, styles.tab];

    return (
        <TouchableHighlight style={tabStyle}>
          <Text style={styles.tabText}>{ name }</Text>
        </TouchableHighlight>
    );
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
