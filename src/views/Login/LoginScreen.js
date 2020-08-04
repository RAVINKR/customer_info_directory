import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Input, Button, CheckBox, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Loader from '../../shared/Loader';
import LoginForm from '../../components/LoginForm';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false,
        };
    }

    render() {
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                    <Text style={styles.logo}> Customer Info </Text>
                    <View style={{ width: '80%' }}>
                        <Input
                            placeholder='Username'
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={24}
                                    color={this.state.usernameError ? 'red' : '#B0B0B0'}
                                />
                            }
                        />
                        <Input
                            placeholder='Password'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={24}
                                    color={this.state.usernameError ? 'red' : '#B0B0B0'}
                                />
                            }
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            this.props.navigation.replace('Customers');
                        }}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.loading && <Loader />}
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#fb5b5a",
        bottom: 40
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});
