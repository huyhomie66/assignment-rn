import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React, { useCallback, useEffect } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Header } from 'react-native-elements';
import AuthScreen from '../screen/Auth';
import OrderList from '../screen/OrderList';
import { getItem, removeItem } from '../utils/AsycStorage';
import { navigate } from '../utils/NavigationService';
import OrderScreen from '../screen/Order';

const HeaderCustom = ({ title }) => (
  <Header
    containerStyle={{
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <TouchableOpacity>{/* <Text>Logout</Text> */}</TouchableOpacity>
    <Text
      style={{
        fontWeight: 'bold',
      }}
    >
      {title}
    </Text>

    <TouchableOpacity
      onPress={async () => {
        navigate('AuthScreen');
        await removeItem('rootScreen');
      }}
    >
      <Text>Logout</Text>
    </TouchableOpacity>
  </Header>
);

const RootStack = createStackNavigator({
  OrderList: {
    screen: OrderList,
    navigationOptions: ({ navigation }) => ({
      header: <HeaderCustom title="Order List" />,
    }),
  },
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Order',
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
      style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
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
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
