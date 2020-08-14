//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import MyHeader from '../../../components/MyHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Header, Input, Button} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Styles from '../../../shared/Styles';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
  exitAlert,
} from '../../../shared/AndroidBackHandler.js';
import {insertNewCustomer} from '../../../storage/allSchemas';

class NewCustomerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userDatas: usersData,
      phoneNumber: '',
      phoneNumberErr: false,
      phoneNumberErrMsg: '',
      name: '',
      nameErr: false,
      nameErrMsg: '',
      place: '',
      placeErr: false,
      placeErrMsg: '',
      temperature: '',
      temperatureErr: false,
      temperatureErrMsg: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      handleAndroidBackButton(this.navigateBack);
    });
  }

  navigateBack = () => {
    this.props.navigation.navigate('Customers');
  };

  componentWillUnmount() {
    this._unsubscribe();
    removeAndroidBackButtonHandler();
  }

  _onChangePhone = (num) => {
    console.log('Mobile Number: ' + num);
    if (num.trim() !== '') {
      this.setState({
        phoneNumberErr: false,
        phoneNumber: num,
      });
    } else {
      this.setState({
        phoneNumber: num,
        phoneNumberErr: true,
        phoneNumberErrMsg: 'Please enter your mobile number',
      });
      this.refs.PhoneNumberInput.shake();
    }

    // this.state.userDatas.map((element) => {
    //   if (element.num === num) {
    //     this.setState({
    //       loading: false,
    //       name: element.name,
    //     });
    //   }
    // });
  };

  _onChangeName = (name) => {
    console.log('Name: ' + name);
    if (name.trim() !== '') {
      this.setState({
        nameErr: false,
        name: name,
      });
    } else {
      this.setState({
        name: name,
        nameErr: true,
        nameErrMsg: 'Please enter your name',
      });
      this.refs.NameInput.shake();
    }
  };

  _onChangePlace = (place) => {
    console.log('Place : ' + place);
    if (place.trim() !== '') {
      this.setState({
        placeErr: false,
        place: place,
      });
    } else {
      this.setState({
        place: place,
        placeErr: true,
        placeErrMsg: 'Please enter your place',
      });
      this.refs.PlaceInput.shake();
    }
  };

  _onChangeTemperature = (temp) => {
    console.log('Temperature: ' + temp);
    if (temp.trim() !== '') {
      this.setState({
        temperatureErr: false,
        temperature: temp,
      });
    } else {
      this.setState({
        temperatureErr: true,
        temperature: temp,
        temperatureErrMsg: 'Please enter your body temperature',
      });
      this.refs.TemperatureInput.shake();
    }
  };

  _addNewCustomer = () => {
    if (this._isValidated()) {
      const newCustomer = {
        id: Math.floor(Date.now() / 1000),
        mobile: this.state.phoneNumber,
        name: this.state.name,
        place: this.state.place,
        temperature: this.state.temperature,
        done: true,
      };
      insertNewCustomer(newCustomer)
        .then(() => {
          alert('Success');
          this.props.navigation.navigate('Customers');
        })
        .catch((error) => {
          alert(`error ${error}`);
        });
    }
  };

  _isValidated() {
    var is_validated = true;
    if (this.state.phoneNumber.trim() !== '') {
      this.setState({
        phoneNumberErr: false,
      });
    } else {
      this.setState({
        phoneNumberErr: true,
        phoneNumberErrMsg: 'Please enter your phone number',
      });
      is_validated = false;
    }

    if (this.state.name.trim() !== '') {
      this.setState({
        nameErr: false,
      });
    } else {
      this.setState({
        nameErr: true,
        nameErrMsg: 'Please enter your name',
      });
      is_validated = false;
    }

    if (this.state.place.trim() !== '') {
      this.setState({
        placeErr: false,
      });
    } else {
      this.setState({
        placeErr: true,
        placeErrMsg: 'Please enter your place',
      });
      is_validated = false;
    }

    if (this.state.temperature.trim() !== '') {
      this.setState({
        temperatureErr: false,
      });
    } else {
      this.setState({
        temperatureErr: true,
        temperatureErrMsg: 'Please enter your temperature',
      });
      is_validated = false;
    }
    return is_validated;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <MaterialIcon
              style={{marginStart: 10}}
              name="arrow-back"
              size={28}
              color={'#fff'}
              onPress={() => {
                this.props.navigation.navigate('Customers');
              }}
            />
          }
          centerComponent={{
            text: 'Add New Customer',
            style: {color: '#fff', fontWeight: 'bold', fontSize: 20},
          }}
          statusBarProps={{
            barStyle: 'light-content',
          }}
          barStyle="light-content"
          containerStyle={styles.headerContainerStyle}
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={{marginTop: wp('8%')}}>
            <View style={{flexDirection: 'column'}}>
              <View style={styles.itemStyle}>
                <Text style={styles.labelText}>Mobile Number :</Text>
                <Input
                  placeholder=""
                  onChangeText={(val) => this._onChangePhone(val)}
                  returnKeyType="next"
                  value={this.state.phoneNumber}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  ref="PhoneNumberInput"
                  inputContainerStyle={{
                    ...styles.InputContainerStyle,
                    borderColor: this.state.phoneNumberErr ? 'red' : '#B0B0B0',
                  }}
                  inputStyle={styles.InputStyle}
                  onSubmitEditing={() => {
                    this.refs.NameInput.focus();
                  }}
                />
              </View>
              {this.state.phoneNumberErr && (
                <Text
                  style={{...Styles.validationError, marginStart: wp('10%')}}>
                  {this.state.phoneNumberErrMsg}
                </Text>
              )}
              <View style={styles.itemStyle}>
                <Text style={styles.labelText}>Name :</Text>
                <Input
                  placeholder=""
                  onChangeText={(val) => this._onChangeName(val)}
                  returnKeyType="next"
                  value={this.state.name}
                  autoCapitalize="none"
                  ref="NameInput"
                  inputContainerStyle={{
                    ...styles.InputContainerStyle,
                    borderColor: this.state.nameErr ? 'red' : '#B0B0B0',
                  }}
                  inputStyle={styles.InputStyle}
                  onSubmitEditing={() => {
                    this.refs.PlaceInput.focus();
                  }}
                />
              </View>
              {this.state.nameErr && (
                <Text
                  style={{...Styles.validationError, marginStart: wp('10%')}}>
                  {this.state.nameErrMsg}
                </Text>
              )}
              <View style={styles.itemStyle}>
                <Text style={styles.labelText}>Place :</Text>
                <Input
                  placeholder=""
                  onChangeText={(val) => this._onChangePlace(val)}
                  returnKeyType="next"
                  value={this.state.place}
                  autoCapitalize="none"
                  ref="PlaceInput"
                  inputContainerStyle={{
                    ...styles.InputContainerStyle,
                    borderColor: this.state.placeErr ? 'red' : '#B0B0B0',
                  }}
                  inputStyle={styles.InputStyle}
                  onSubmitEditing={() => {
                    this.refs.TemperatureInput.focus();
                  }}
                />
              </View>
              {this.state.placeErr && (
                <Text
                  style={{...Styles.validationError, marginStart: wp('10%')}}>
                  {this.state.placeErrMsg}
                </Text>
              )}
              <View style={styles.itemStyle}>
                <Text style={styles.labelText}>Temperature :</Text>
                <Input
                  placeholder=""
                  onChangeText={(val) => this._onChangeTemperature(val)}
                  returnKeyType="next"
                  value={this.state.temperature}
                  autoCapitalize="none"
                  ref="TemperatureInput"
                  inputContainerStyle={{
                    ...styles.InputContainerStyle,
                    borderColor: this.state.temperatureErr ? 'red' : '#B0B0B0',
                  }}
                  inputStyle={styles.InputStyle}
                  onSubmitEditing={() => {
                    this.refs.TemperatureInput.focus();
                  }}
                />
              </View>
              {this.state.temperatureErr && (
                <Text
                  style={{...Styles.validationError, marginStart: wp('10%')}}>
                  {this.state.temperatureErrMsg}
                </Text>
              )}
              <View style={styles.addButtonView}>
                <Button
                  title="Entry"
                  buttonStyle={styles.addButtonStyle}
                  containerStyle={styles.addButtonContainerStyle}
                  titleStyle={styles.addButtonTitleStyle}
                  onPress={() => {
                    this._addNewCustomer();
                  }}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  headerContainerStyle: {
    backgroundColor: '#acbabf',
    justifyContent: 'space-around',
    height: wp('25%'),
  },
  addButtonView: {
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: wp('2%'),
  },
  addButtonStyle: {
    width: wp('35%'),
    borderRadius: hp('25%'),
    height: hp('8%'),
    backgroundColor: '#bdccd1',
  },
  addButtonContainerStyle: {
    width: wp('35%'),
    borderRadius: hp('20%'),
    height: hp('8%'),
  },
  addButtonTitleStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  itemStyle: {
    marginStart: wp('6%'),
    marginEnd: wp('5%'),
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginStart: 10,
    color: '#b3b5ba',
  },
  InputContainerStyle: {
    width: wp('80%'),
    backgroundColor: 'rgba(255, 255,255,0.9)',
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#ffffff',
    borderWidth: 1,
    marginTop: 5,
  },
  InputStyle: {
    fontSize: 14,
    color: '#8a8787',
  },
});

const usersData = [
  {
    id: 1,
    name: 'Sudhi',
    num: 8596857485,
  },
  {
    id: 2,
    name: 'Sree',
    num: 7458965859,
  },
  {
    id: 3,
    name: 'Nithin',
    num: 8596854541,
  },
  {
    id: 4,
    name: 'Sreenath',
    num: 5263859548,
  },
];

export default NewCustomerScreen;
