const Actions = {
    Nav: route => {
        return {
            type: 'NAV',
            nav: route
        };
    },

    StartSession: (sets) => {
        return {
            type: 'START_SESSION',
            sets: sets
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
    }
};

export default Actions;
