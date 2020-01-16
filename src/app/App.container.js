import React from 'react';

import App from './App';
import {setTopLevelNavigator} from '../utils/NavigationService';

const AppContainer = () => {
  return (
    <App
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

export default AppContainer;
