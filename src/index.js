import React from 'react';
import CookieStorage from 'redux-persist-cookie-storage';
import { createStore } from 'redux';
import { AppRegistry } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';

import AppReducer from './state/AppReducer';
import AppWithNavigationState from './navigators/AppNavigator';

const store = createStore(AppReducer, undefined, autoRehydrate());

persistStore(store, {
    storage: new CookieStorage({
        expiration: {
            'default': 365 * 86400 // Cookies expire after one year
        }
    })
});

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('LifteeApp', () => Root);
AppRegistry.runApplication('LifteeApp', { rootTag: document.getElementById('root') });
