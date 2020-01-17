import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import React, {useCallback, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import AuthScreen from '../screen/Auth';
import OrderList from '../screen/OrderList';
import {getItem} from '../utils/AsycStorage';
import {navigate} from '../utils/NavigationService';
import OrderScreen from '../screen/Order';

const RootStack = createStackNavigator({
  OrderList: {
    screen: OrderList,
    navigationOptions: ({navigation}) => ({
      title: 'OrderList',
    }),
  },
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: ({navigation}) => ({
      title: 'OrderList',
    }),
  },
});

const LoadingScreen = () => {
  const checkAuth = useCallback(async () => {
    const result = await getItem('rootScreen');

    if (result) {
      navigate('OrderList');
    } else {
      navigate('AuthScreen');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <ActivityIndicator
      size="large"
      style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}
    />
  );
};

const AppNavigator = createSwitchNavigator(
  {
    AuthScreen: AuthScreen,
    RootStack: RootStack,
    LoadingScreen: LoadingScreen,
  },
  {
    initialRouteName: 'LoadingScreen',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
