/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from '../shared/Colors';

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size={Platform.OS === 'ios' ? 'large' : 48}
          color={Colors.loader}
        />
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 999,
    // isModal: true,
    // isHUD: true,
    // hudColor: '#000000',
    // color: '#FFFFFF',
  },
});

export default Loader;
