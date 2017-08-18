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

    CompleteSet: (index) => {
        return {
            type: 'COMPLETE_SET',
            index: index
        };
    },

    UpdateTrainingMax: (name, value) => {
        return {
            type: 'UPDATE_TRAINING_MAX',
            name: name,
            value: value
        };
    }
};

export default Actions;
