import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  PermissionsAndroid,
  BackHandler,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {clearData, retrieveData} from '../../shared/AuthCheck';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: '',
      animating: true,
    };
  }
  
  async componentDidMount() {

      setTimeout( () => {
        this.setState({
          animating: false,
        });
        this.props.navigation.replace('Customers');
     },3000);
    

    // retrieveData().then((userData) => {
    //   console.log('Enter');
    //   if (userData !== null) {
    //     this.props.navigation.replace('Clients');
    //   } else {
    //     console.log('No token');
    //     this.props.navigation.replace('Login');
    //   }
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image
          style={{flex: 1}}
          source={require('../../images/splash.jpg')}
          resizeMode="contain"
        />
        <ActivityIndicator
          animating={this.state.animating}
          color="#bdccd1"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    position: 'absolute',
  },
});
