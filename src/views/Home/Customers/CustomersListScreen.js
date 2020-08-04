//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MyHeader from '../../../components/MyHeader';

// create a component
class CustomersListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    render() {
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Customers" />
                <View style={styles.container}>
                    <Text style={{top: '20%'}}>CustomersListScreen</Text>
                </View>
            </View>

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default CustomersListScreen;
