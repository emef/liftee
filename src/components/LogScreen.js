import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View } from 'react-native';
import { connect } from 'react-redux';

import icon from '../img/icon_Log.png';

export const LogScreen = connect(
    ({log}) => ({log}),
    dispatch => ({})
)(({log}) => {

  return (
      <LogFlatList log={log} />
  );
});

const LogFlatList = ({log}) => {
  const renderItem = (item) => {
    const logItemStyle = (item.index % 2 === 0) ? styles.logItem : styles.logItemAlternate;
    const set = item.item;
    const date = new Date(set.completedAt);
    const month = (date.getMonth() < 10 ? "0" : "") + date.getMonth();
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    const dateStr = date.getFullYear() + "/" + month + "/" + day;
    const fixedWeight = set.weight || 0;
    return (
      <View>
        <View style={logItemStyle}>
          <Text style={styles.logItemComponent}>{dateStr}</Text>
          <Text style={styles.logItemComponent}>{set.name}</Text>
          <Text style={styles.logItemComponent}>{set.reps} x {fixedWeight}</Text>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  };

  return (
      <FlatList data={log.reverse()} renderItem={renderItem} />
  );
}

LogScreen.navigationOptions = {
  title: 'Log',
  icon: icon
};

const styles = StyleSheet.create({
  logItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#393939'
  },

  logItemAlternate: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },

  logItemComponent: {
    flex: 1,
    fontSize: '1em',
    paddingLeft: 10,
    paddingRight: 10,
    color: '#e5e5e5',
    fontFamily: 'Helvetica-Light',
    textAlign: 'center'
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#393939',
  }
});
