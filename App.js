import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import {navigationRef} from './src/shared/NavigationService';
import Splash from './src/views/Splash/SplashScreen';
import LoginScreen from './src/views/Login/LoginScreen';
import CustomersListScreen from './src/views/Home/Customers/CustomersListScreen';
import ReportsScreen from './src/views/Home/Reports/ReportsScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator initialRouteName="Splash">
          <MainStack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="Customers"
            component={MyDrawer}
            options={{headerShown: false}}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    );
  }
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Customers" component={CustomersListScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
    </Drawer.Navigator>
  );
}

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
