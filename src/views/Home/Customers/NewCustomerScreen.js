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
      phoneNumber: '',
      phoneNumberErr: false,
      phoneNumberErrMsg: '',
      name: '',
      nameErr: false,
      nameErrMsg: '',
    };
  }

  componentDidMount() {}

  _onChangePhone = (num) => {};

  /**
   * search functionality
   **/
  handleSearch = (searchVal) => {
    console.log('Search Term: ' + searchVal);
    this.setState({
      loading: true,
      search_term: searchVal,
    });
    var FormattedQuery = searchVal.toLowerCase();
    const data = this.state.customersList4Search.filter((items) => {
      console.log('items.name.toLowerCase()' + items.name.toLowerCase());
      if (items.name.toLowerCase().includes(FormattedQuery)) {
        this.setState({
          loading: false,
        });
        return true;
      } else {
        this.setState({
          loading: false,
        });
        return false;
      }
    });
    this.setState({customersList: data});
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
          containerStyle={{
            backgroundColor: '#acbabf',
            justifyContent: 'space-around',
            height: wp('25%'),
          }}
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={{margin: wp('8%')}}>
            <View style={{flexDirection: 'column'}}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'normal',
                    marginStart: 10,
                    color: '#b3b5ba',
                  }}>
                  Mobile Number :
                </Text>
                <Input
                  placeholder="Phone"
                  onChangeText={(val) => this._onChangePhone(val)}
                  returnKeyType="next"
                  value={this.state.phoneNumber}
                  autoCapitalize="none"
                  ref="PhoneNumberInput"
                  inputContainerStyle={{
                    width: wp('80%'),
                    backgroundColor: 'rgba(255, 255,255,0.9)',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    fontSize: 12,
                    color: '#ffffff',
                    borderWidth: 1,
                    borderColor: this.state.phoneNumberErr ? 'red' : '#B0B0B0',
                    marginTop: 10,
                  }}
                  inputStyle={{fontSize: 16}}
                  onSubmitEditing={() => {
                    this.refs.NameInput.focus();
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'normal',
                    marginStart: 10,
                    color: '#b3b5ba',
                  }}>
                  Name :
                </Text>
                <Input
                  placeholder="Name"
                  onChangeText={(val) => this._onChangeName(val)}
                  returnKeyType="next"
                  value={this.state.name}
                  autoCapitalize="none"
                  ref="NameInput"
                  inputContainerStyle={{
                    width: wp('80%'),
                    backgroundColor: 'rgba(255, 255,255,0.9)',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    fontSize: 12,
                    color: '#ffffff',
                    borderWidth: 1,
                    borderColor: this.state.nameErr ? 'red' : '#B0B0B0',
                    marginTop: 10,
                  }}
                  inputStyle={{fontSize: 16}}
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

// define your styles
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
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
});

//make this component available to the app
export default NewCustomerScreen;
