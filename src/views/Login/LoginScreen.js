import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Input, Button, CheckBox, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Loader from '../../shared/Loader';
import LoginForm from '../../components/LoginForm';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
  exitAlert,
} from '../../shared/AndroidBackHandler';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userNameErr: false,
      userNameErrMessage: '',
      password: '',
      passwordErr: false,
      passwordErrMessage: '',
      loading: false,
    };
  }

  componentDidMount() {
    handleAndroidBackButton(this.navigateBack);
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  /**
   * Device back button functionality.
   * Showing an alert, to confirm back click.
   */
  navigateBack = () => {
    exitAlert();
  };

  /** Used for Username TextInput field validation **/
  _onChangeUsername = (username) => {
    if (username.trim() !== '') {
      this.setState({
        username: username,
        userNameErr: false,
      });
    } else {
      this.setState({
        username: username,
        userNameErr: true,
        userNameErrMessage: 'Please enter your username',
      });
      this.refs.UserNameInput.shake();
    }
  };

  /** Used for Password TextInput field validation **/
  _onChangePassword = (password) => {
    if (password.trim() !== '') {
      this.setState({
        password: password,
        passwordErr: false,
      });
    } else {
      this.setState({
        password: password,
        passwordErr: true,
        passwordErrMessage: 'Please enter your password',
      });
      this.refs.PasswordInput.shake();
    }
  };

  /** Used to Validating the Input Fields during the Login Button Click **/
  _isValidated() {
    var is_validated = true;
    if (this.state.username.trim() !== '') {
      this.setState({
        userNameErr: false,
      });
    } else {
      this.setState({
        userNameErr: true,
        userNameErrMessage: 'Please enter username',
      });
      this.refs.UserNameInput.focus();
      this.refs.UserNameInput.shake();
      is_validated = false;
    }

    if (this.state.password.trim() !== '') {
      this.setState({
        passwordErr: false,
      });
    } else {
      this.setState({
        passwordErr: true,
        passwordErrMessage: 'Please enter your password',
      });
      if (this.state.username.trim() !== '') {
        this.refs.PasswordInput.focus();
        this.refs.PasswordInput.shake();
      }
      is_validated = false;
    }
    return is_validated;
  }

  _doLogin = () => {
    if (this._isValidated()) {
      this.setState({
        loading: true,
      });
      this.props.navigation.replace('Customers');
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled">
        <StatusBar hidden={true} barStyle="light-content" />
        <View style={styles.container}>
          {/* <Text style={styles.logo}> CD </Text> */}
          <Icon name="users" size={50} color={'#B0B0B0'} style={styles.logo} />
          <View style={{width: '80%'}}>
            <Input
              placeholder="Username"
              onChangeText={(val) => this._onChangeUsername(val)}
              returnKeyType="next"
              value={this.state.username}
              autoCapitalize="none"
              ref="UserNameInput"
              leftIcon={
                <Icon
                  name="user"
                  size={24}
                  color={this.state.userNameErr ? 'red' : '#B0B0B0'}
                  style={{}}
                />
              }
              inputContainerStyle={{
                width: '100%',
                backgroundColor: 'rgba(255, 255,255,0.9)',
                borderRadius: 18,
                paddingHorizontal: 16,
                fontSize: 16,
                color: '#ffffff',
                borderWidth: 1,
                borderColor: this.state.userNameErr ? 'red' : '#B0B0B0',
              }}
              inputStyle={{}}
              onSubmitEditing={() => {
                this.refs.PasswordInput.focus();
              }}
            />
            {this.state.userNameErr && (
              <Text style={[styles.validationError]}>
                {this.state.userNameErrMessage}
              </Text>
            )}
            <Input
              placeholder="Password"
              value={this.state.password}
              onChangeText={(val) => this._onChangePassword(val)}
              autoCapitalize="none"
              leftIcon={
                <Icon
                  name="lock"
                  size={24}
                  color={this.state.passwordErr ? 'red' : '#B0B0B0'}
                />
              }
              secureTextEntry={true}
              ref="PasswordInput"
              inputContainerStyle={{
                width: '100%',
                backgroundColor: 'rgba(255, 255,255,0.9)',
                borderRadius: 18,
                paddingHorizontal: 16,
                fontSize: 16,
                color: '#ffffff',
                borderWidth: 1,
                borderColor: this.state.passwordErr ? 'red' : '#B0B0B0',
              }}
              inputStyle={{}}
              // onSubmitEditing={() => {
              //   alert('Do Login');
              // }}
            />
            {this.state.passwordErr && (
              <Text style={[styles.validationError]}>
                {this.state.passwordErrMessage}
              </Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this._doLogin();
                // this.props.navigation.replace('Customers');
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading === true && <Loader />}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bdccd1',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#fce86d',
    bottom: 40,
  },
  button: {
    width: '100%',
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 20,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  validationError: {
    alignSelf: 'flex-start',
    color: 'red',
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: 12,
    bottom: 20,
    marginStart: 16,
  },
});
