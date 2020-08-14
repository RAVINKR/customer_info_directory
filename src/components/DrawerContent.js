import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../shared/Loader';

export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      loading: false,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...this.props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <Image
                source={require('../images/user-info.jpg')}
                resizeMode="cover"
                style={styles.imageStyle}
              />
            </View>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Icon
                    name="account-group-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Customers"
                onPress={() => {
                  this.setState(
                    {
                      isActive: true,
                    },
                    () => {
                      this.props.navigation.navigate('Customers');
                    },
                  );
                }}
                // activeTintColor={
                //   this.state.isActive === true ? '#fb0005' : '#f4f4f4'
                // }
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="file-chart" color={color} size={size} />
                )}
                label="Reports"
                onPress={() => {
                  this.setState(
                    {
                      isActive: true,
                    },
                    () => {
                      this.props.navigation.navigate('Reports');
                    },
                  );
                }}
                // activeTintColor={
                //   this.state.isActive === true ? '#fb0005' : '#f4f4f4'
                // }
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              this.setState(
                {
                  loading: true,
                },
                () => {
                  setTimeout(() => {
                    this.setState(
                      {
                        loading: false,
                      },
                      () => {
                        this.props.navigation.navigate('Login');
                      },
                    );
                  }, 2000);
                },
              );
            }}
          />
        </Drawer.Section>
        {this.state.loading === true && <Loader />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 2,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  imageStyle: {
    alignSelf: 'center',
    width: wp('78%'),
    height: hp('30%'),
    borderTopColor: '#f4f4f4',
  },
});
