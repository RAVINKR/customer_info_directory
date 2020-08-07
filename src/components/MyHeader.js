import React from 'react';
import {Header} from 'react-native-elements';
import HamburgerMenu from './HamburgerMenu';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MyHeader = (props) => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: {color: '#fff', fontWeight: 'bold', fontSize: 20},
      }}
      statusBarProps={{barStyle: 'light-content'}}
      barStyle="light-content"
      containerStyle={{
        backgroundColor: '#acbabf',
        justifyContent: 'space-around',
        height: wp('25%'),
      }}
    />
  );
};

export default MyHeader;
