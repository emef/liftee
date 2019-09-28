const Actions = {
    Nav: route => {
        return {
            type: 'NAV',
            nav: route
        };
    },

    StartSession: (sets, dayIndex) => {
        return {
            type: 'START_SESSION',
            sets: sets,
            dayIndex: dayIndex
        };
    },

    CompleteSession: {
        type: 'COMPLETE_SESSION'
    },

    CompleteSet: (index, set) => {
        return {
            type: 'COMPLETE_SET',
            index: index,
            set: set
        };
    },

    UpdateTrainingMax: (name, value) => {
        return {
            type: 'UPDATE_TRAINING_MAX',
            name: name,
            value: value
        };
    },

    SwitchLogTab: (tab) => {
        return {
            type: 'SWITCH_LOG_TAB',
            tab: tab
        };
    },

    SetProgram: (program_name) => {
        return {
            type: 'SET_PROGRAM',
            program_name: program_name
        };
    },

    ResetTimer: {
        type: 'RESET_TIMER'
    }
};

export default Actions;
