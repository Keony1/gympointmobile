import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';

import CheckIns from './pages/CheckIns';
import HelpOrderList from './pages/New/HelpOrderList';
import HelpOrder from './pages/New/HelpOrder';
import NewHelpOrder from './pages/New/NewHelpOrder';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIns,
            New: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  HelpOrder,
                  NewHelpOrder,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#000',
                    headerLayoutPreset: 'center',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                      textAlign: 'center',
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Agendar',
                tabBarIcon: (
                  <Icon name="add-circle-outline" size={20} color="#000" />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#000',
              inactiveTintColor: '#000',
              style: {
                backgroundColor: '#fff',
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
