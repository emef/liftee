import React from 'react';
import { findNodeHandle, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CanvasJS from '../external/canvasjs.min';

import icon from '../img/icon_Home.png';

export const HomeScreen = connect(
    ({ program, log }) => ({ program, log }),
    dispatch => ({})
)(({ program, log }) => {

  const prs = {};

  for (const entry of log) {
    const entry_full_date = new Date(entry.completedAt);
    const entry_date = new Date(
      entry_full_date.getFullYear(), entry_full_date.getMonth(), entry_full_date.getDate());

    if (prs[entry.name] === undefined) {
      prs[entry.name] = {};
    }

    if (prs[entry.name][entry_date] === undefined) {
      prs[entry.name][entry_date] = entry;
    }

    const last_entry = prs[entry.name][entry_date];

    if (entry.weight > last_entry.weight) {
      prs[entry.name][entry_date] = entry;
    }
  }

  const charts = [];
  for (const lift in prs) {
    charts.push(
        <Chart key={lift} title={lift} prs={prs[lift]} />
    );
  }

  return (
      <ScrollView style={styles.container}>
        { charts }
      </ScrollView>
    );

});

const Chart = ({title, prs}) => {
  const data_points = []
  for (const date in prs) {
    const entry = prs[date];
    data_points.push({
      x: new Date(entry.completedAt),
      y: entry.weight
    });
  }

  const options = {
		animationEnabled: false,
    interactivityEnabled: false,
    backgroundColor: 'transparent',
		axisX: {
			includeZero: false,
      labelFontFamily: 'Helvetica Light',
      labelFontColor: '#e5e5e5'
		},
		axisY: {
			includeZero: false,
      labelFontFamily: 'Helvetica Light',
      labelFontColor: '#e5e5e5'
		},
		data: [{
			type: "splineArea",
			xValueFormatString: "MM/YYYY",
			yValueFormatString: "#,##0.## bn kW⋅h",
			showInLegend: false,
			dataPoints: data_points
		}]
	}

  const ref = (component) => {
    const dom = findNodeHandle(component);
    if (dom) {
      let chart = new CanvasJS.Chart(dom, options);
      chart.render();
    };
  };

  return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle} >{title}</Text>
        <View style={styles.chart} ref={ref} />
      </View>
  );
};


HomeScreen.navigationOptions = {
    title: 'Home',
    icon: icon
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  chartContainer: {
    marginTop: 40
  },

  chartTitle: {
    color: '#fc4c02',
    textAlign: 'center',
    fontSize: '1.2em'
  },

  chart: {
    height: 200,
    backgroundColor: '#393939'
  }

});
