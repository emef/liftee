import { combineReducers } from 'redux';
import Programs from './Programs.js';

const navReducer = (nav = 'Home', action) => {
    switch(action.type) {
    case 'NAV':
        return action.nav;

    default:
        return nav;
    }
};

const programReducer = (program, action) => {
    program = program || {
      name: Programs.getDefaultProgram(),
      template: Programs.getTemplate(Programs.getDefaultProgram()),
    };

    switch (action.type) {
    case 'SET_PROGRAM':
      return {
          name: action.program_name,
          template: Programs.getTemplate(action.program_name)
      };

    default:
      return program;
    }
};

const sessionReducer = (session = null, action) => {
    switch (action.type) {
    case 'START_SESSION':
        return {
            sets: action.sets,
            lastCompleted: 0,
            lastCompletedAt: (new Date()).getTime()
        };

    case 'COMPLETE_SESSION':
        return null;

    case 'COMPLETE_SET':
        if (session.sets[action.index].completed) {
            return session;
        }

        let sets = session.sets.slice();
        sets[action.index].completed = true;

        return Object.assign({}, session, {
            sets: sets,
            lastCompleted: action.index,
            lastCompletedAt: (new Date()).getTime()
        });

    default:
        return session;
    }
};

const profileReducer = (profile = null, action) => {
    profile = profile || {
        trainingMaxes: {
            Squat: 145,
            Bench: 170,  // 8/18
            Deadlift: 195,
            OHP: 100
        },

        editing: null
    };

    switch (action.type) {
    case 'UPDATE_TRAINING_MAX':
        const update = {};
        update[action.name] = action.value;
        const trainingMaxes = Object.assign({}, profile.trainingMaxes, update);

        return Object.assign({}, profile, {
            trainingMaxes,
            editing: null
        });

    case 'EDIT_TRAINING_MAX':
        return Object.assign({}, profile, {
            editing: action.lift
        });

    default:
        return profile;
    }
};

const logReducer = (log = [], action) => {
    switch (action.type) {
    case 'COMPLETE_SET':
        const logCopy = log.slice();
        const setCopy = Object.assign({}, action.set);

        setCopy.completedAt = (new Date()).getTime();
        logCopy.push(setCopy);

        return logCopy;

    default:
        return log;
    }
};

const logTabReducer = (logTab = "Weekly", action) => {
    switch (action.type) {
    case 'SWITCH_LOG_TAB':
        return action.tab;

    default:
        return logTab;
    }
};

const AppReducer = combineReducers({
    nav: navReducer,
    program: programReducer,
    session: sessionReducer,
    profile: profileReducer,
    log: logReducer,
    logTab: logTabReducer
});

export default AppReducer;
