//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyHeader from '../../../components/MyHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Header, Input, Button} from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

// create a component
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
    };
  }

  componentDidMount() {}

  _onChangePhone = (num) => {
    console.log('Mobile Number: ' + num);
    this.setState({
      loading: true,
      phoneNumber: num,
    });

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
    this.setState({
      loading: true,
      name: name,
    });
  };

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
          <View style={{margin: wp('8%')}}>
            <View style={{flexDirection: 'column'}}>
              <View>
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
                  inputStyle={{fontSize: 14}}
                  onSubmitEditing={() => {
                    this.refs.NameInput.focus();
                  }}
                />
              </View>
              <View>
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
                  inputStyle={{fontSize: 14}}
                  onSubmitEditing={() => {
                    this.refs.NameInput.focus();
                  }}
                />
              </View>
              <View style={styles.addButtonView}>
                <Button
                  raised
                  title="Entry"
                  buttonStyle={styles.addButtonStyle}
                  containerStyle={styles.addButtonContainerStyle}
                  titleStyle={styles.addButtonTitleStyle}
                  onPress={() => {
                    //   this._doEmailNotification(true);
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
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: wp('10%'),
  },
  addButtonStyle: {
    width: wp('35%'),
    borderRadius: hp('20%'),
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
    marginTop: 10,
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
