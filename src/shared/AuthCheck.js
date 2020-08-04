import React, {Component} from 'react';
import {Platform, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const retrieveData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData !== null) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  } catch (error) {
    return {};
  }
};

export const clearData = async () => {
  AsyncStorage.removeItem('userData')
    .then(() => {
      AsyncStorage.removeItem('userToken');
      return true;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getNotchHight = () => {
  let notchHeight = 0;
  console.log('OS,' + Platform.OS);
  if (Platform.OS === 'ios') {
    if (StatusBar.currentHeight === 20) {
      notchHeight = 25;
    } else {
      notchHeight = StatusBar.currentHeight + 34;
    }
  } else if (Platform.OS === 'android') {
    if (StatusBar.currentHeight > 25) {
      notchHeight = 0;
    } else {
      notchHeight = StatusBar.currentHeight;
    }
  }
  return notchHeight;
};
