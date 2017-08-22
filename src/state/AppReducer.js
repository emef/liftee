import { combineReducers } from 'redux';
import template from './2suns.js';

const navReducer = (nav = 'Home', action) => {
    switch(action.type) {
    case 'NAV':
        return action.nav;

    default:
        return nav;
    }
};

const programReducer = (program, action) => {
    switch (action.type) {
    case 'NEXT_DAY':
        return Object.assign({}, program, {
            currentDay: (program.currentDay + 1) % template.days.length
        });

    default:
        return {
            name: '2suns',
            template: template,
            currentDay: 0
        };
    }
};

const sessionReducer = (session = null, action) => {
    switch (action.type) {
    case 'START_SESSION':
        return {
            sets: action.sets,
            lastCompleted: 0
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
            lastCompleted: action.index
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

const AppReducer = combineReducers({
    nav: navReducer,
    program: programReducer,
    session: sessionReducer,
    profile: profileReducer
});

export default AppReducer;
