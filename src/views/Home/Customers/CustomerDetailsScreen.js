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

class CustomerDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      mobileNumber: '',
      place: '',
      temperature: '',
    };
  }

  componentDidMount() {
    this._init();
  }

  _init = () => {
    console.log(
      'Customer Data: ',
      JSON.stringify(this.props.route.params.customer),
    );
    var cust_name = this.props.route.params.customer.name;
    var cust_mob = this.props.route.params.customer.mob;
    var cust_place = this.props.route.params.customer.place;
    var cust_temp = this.props.route.params.customer.temp;

    this.setState({
      name: cust_name,
      mobileNumber: cust_mob,
      place: cust_place,
      temperature: cust_temp,
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
            text: 'Customer Details',
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
                {console.log('Mobile Num : ', this.state.mobileNumber)}
                <Input
                  placeholder=""
                  returnKeyType="next"
                  value={`${this.state.mobileNumber}`}
                  autoCapitalize="none"
                  keyboardType="phone-pad"
                  ref="PhoneNumberInput"
                  inputContainerStyle={styles.InputContainerStyle}
                  inputStyle={styles.InputStyle}
                  editable={false}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Name :</Text>
                <Input
                  placeholder=""
                  returnKeyType="next"
                  value={this.state.name}
                  autoCapitalize="none"
                  ref="NameInput"
                  inputContainerStyle={styles.InputContainerStyle}
                  inputStyle={styles.InputStyle}
                  editable={false}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Place :</Text>
                <Input
                  placeholder=""
                  returnKeyType="next"
                  value={this.state.place}
                  autoCapitalize="none"
                  ref="PlaceInput"
                  inputContainerStyle={styles.InputContainerStyle}
                  inputStyle={styles.InputStyle}
                  editable={false}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Temperature :</Text>
                <Input
                  placeholder=""
                  returnKeyType="next"
                  value={this.state.temperature}
                  autoCapitalize="none"
                  ref="TemperatureInput"
                  inputContainerStyle={styles.InputContainerStyle}
                  inputStyle={styles.InputStyle}
                  editable={false}
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerContainerStyle: {
    backgroundColor: '#acbabf',
    justifyContent: 'space-around',
    height: wp('25%'),
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
    borderColor: '#B0B0B0',
  },
  InputStyle: {
    fontSize: 14,
    color: '#8a8787',
  },
});

export default CustomerDetailsScreen;
