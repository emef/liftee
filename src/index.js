import React from 'react';
import { createStore } from 'redux';
import { AppRegistry } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { Provider } from 'react-redux';

import AppReducer from './state/AppReducer';
import AppWithNavigationState from './navigators/AppNavigator';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, AppReducer)
const store = createStore(persistedReducer);
const persistor = persistStore(store)

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('LifteeApp', () => Root);
AppRegistry.runApplication('LifteeApp', { rootTag: document.getElementById('root') });
