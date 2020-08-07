/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Alert, ToastAndroid, BackHandler} from 'react-native';

const handleAndroidBackButton = (callback) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    
    callback();
    return true;
  });
};
/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
  
  BackHandler.removeEventListener('hardwareBackPress', () => {});
  
};

let counter = 0;

const exitAlert = () => {
  if (counter === 0) {
    ToastAndroid.show('Press back again to exit the app', ToastAndroid.SHORT);
    counter++;
    setTimeout(() => {
      counter = 0;
    }, 3000);
  } else {
    BackHandler.exitApp();
  }
};

export {handleAndroidBackButton, removeAndroidBackButtonHandler, exitAlert};

// ToastAndroid.show('Press back again to exit the app', ToastAndroid.SHORT);
