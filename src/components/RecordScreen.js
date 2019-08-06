import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Switch,
    Text,
    TouchableHighlight,
    View } from 'react-native';
import { connect } from 'react-redux';

import Actions from '../state/Actions';
import SetsGenerator from '../state/SetsGenerator';
import SnapScrollView from './SnapScrollView.js';
import icon from '../img/icon_Record.png';
import iconCancel from '../img/icon_Cancel.png';
import iconOk from '../img/icon_Ok.png';

const { width } = Dimensions.get('window');

export const RecordScreen = connect(
    ({ session, program, profile }) => ({ session, program, profile }),
    dispatch => {
        return {
            onStartSession: (sets) => dispatch(Actions.StartSession(sets)),
            onCompleteSet: (index, set) => dispatch(Actions.CompleteSet(index, set)),
            onCompleteSession: () => dispatch(Actions.CompleteSession)
        };
    }
)(({ session, program, profile, onCompleteSet, onCompleteSession, onStartSession }) => {
    const onPressStartRecord = (dayIndex) => {
        const sets = SetsGenerator.generate(
            program.template[dayIndex],
            profile.trainingMaxes);

        onStartSession(sets);
    };


    if (!session) {
        return (
            <Workouts
               program={program}
               onPressStartRecord={onPressStartRecord} />
        );
    } else {
        return (
            <RecordSession
               session={session}
               onCompleteSet={onCompleteSet}
               onCompleteSession={onCompleteSession} />
        );
    }
});

const Workouts = ({ program, onPressStartRecord }) => {
    const workouts = program.template.map((day, i) => {
        return (
            <DayView
               key={i}
               day={day}
               onPressStartRecord={() => onPressStartRecord(i)} />
        );
    });

    return (
        <SnapScrollView
           itemWidth={width}
           index={0}
           style={styles.workoutsContainer}>
          { workouts }
        </SnapScrollView>

    );
};

const DayView = ({ day, onPressStartRecord }) => {
    const lifts = day.lifts.map((lift, i) => {
        return (
            <Text key={i} style={styles.lift}>
              {lift.name}: {lift.sets.length} sets
            </Text>
        );
    });

    return (
        <View style={styles.dayContainer}>
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>
              { day.name }
            </Text>
            <View style={styles.liftsContainer}>
              { lifts }
              <Text style={styles.lift}>
                Asst: { day.assistance }
              </Text>
            </View>
          </View>
          <View style={styles.startContainer}>
            <TouchableHighlight style={styles.startBtn} onPress={onPressStartRecord}>
              <Text style={styles.startBtnText}>START</Text>
            </TouchableHighlight>
          </View>
        </View>
    );
};

const RecordSession = ({ session, onCompleteSet, onCompleteSession }) => {
    const setViews = session.sets.map(function(set, i) {
        return (
            <SetView
               key={i}
               set={set}
               onValueChange={() => onCompleteSet(i, set)} />
        );
    });

    const allDone = session.sets.every((set) => set.completed);
    const iconFinish = allDone ? iconOk : iconCancel;

    return (
        <View style={styles.recordContainer}>
          <ClockView lastCompletedAt={session.lastCompletedAt}/>

          <SnapScrollView itemWidth={width} index={session.lastCompleted}>
            { setViews }
          </SnapScrollView>

          <TouchableHighlight
             style={styles.finishContainer}
             onPress={onCompleteSession}>
            <Image source={iconFinish} style={styles.iconFinish} />
          </TouchableHighlight>
        </View>
    );
};

const SetView = ({ set, onValueChange }) => {
    return (
        <View style={styles.setContainer}>
          <View style={styles.set}>
            <Text style={styles.setName}>
              {set.name}
            </Text>
            <Text style={styles.setWeight}>
              {set.weight} x {set.reps}{set.amrap && "+"}
            </Text>
            <Switch
               style={styles.switch}
               onValueChange={onValueChange}
               value={set.completed}/>
          </View>
        </View>
    );
};

class ClockView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCompletedAt: props.lastCompletedAt,
      lastRendered: (new Date()).getTime()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentWillReceiveProps(newProps){
    this.setState({lastCompletedAt: newProps.lastCompletedAt});
  }

  tick() {
    this.setState({
      lastRendered: (new Date()).getTime()
    });
  }

  render() {
    const now = (new Date()).getTime();
    const delta = now - this.state.lastCompletedAt;
    const seconds = Math.floor(delta / 1000) % 60;
    const minutes = Math.floor(delta / (1000 * 60));
    const secondsStr = seconds < 10 ? "0" + seconds : seconds.toString();
    const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();

    return (
        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>{minutesStr}:{secondsStr}</Text>
        </View>
    );
  }
}


RecordScreen.navigationOptions = {
    title: 'Record',
    icon: icon
};

const styles = StyleSheet.create({
  recordContainer: {
    flex: 1,
    backgroundColor: '#393939',
    width: width
  },

  clockContainer: {
    flex: 0.3,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc4c02'
  },

  clockText: {
    fontFamily: 'Impact',
    fontSize: '3em',
    color: '#e5e5e5',
  },

  setContainer: {
    flex: 1,
    width: width,
    justifyContent: 'center',
  },

  set: {
    height: 100,
    alignItems: 'center'
  },

  setName: {
    color: '#e5e5e5',
    fontSize: '3em',
    fontFamily: 'AppleSDGothicNeo-UltraLight'
  },

  setWeight: {
    color: '#e5e5e5',
    fontSize: '2em',
    fontFamily: 'AppleSDGothicNeo-UltraLight'
  },

  switch: {
    marginTop: 20
  },

  finishContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconFinish: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },

  workoutsContainer: {
    flex: 1,
    width: width,
    backgroundColor: '#393939'
  },

  dayContainer: {
    flex: 1,
    width: width
  },

  liftsContainer: {
    alignItems: 'flex-start',
    marginTop: 50
  },

  lift: {
    color: '#e5e5e5'
  },

  previewContainer: {
    flex: 1,
    width: width,
    alignItems: 'center',
    paddingTop: 100
  },

  previewTitle: {
    color: '#e5e5e5',
    fontSize: '3em',
    fontFamily: 'AppleSDGothicNeo-UltraLight'
  },

  startContainer: {
    flex: 0.2,
    width: width,
    alignItems: 'center'
  },

  startBtn: {
    borderWidth: 1,
    borderColor: '#1da962',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },

  startBtnText: {
    color: '#1da962',
    fontSize: '1.5em',
    fontFamily: 'AppleSDGothicNeo-UltraLight'
  }

});
