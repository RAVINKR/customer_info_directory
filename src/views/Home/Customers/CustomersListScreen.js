//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MyHeader from '../../../components/MyHeader';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
  exitAlert,
} from '../../../shared/AndroidBackHandler.js';
import {Card, Input} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styles from '../../../shared/Styles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {FAB} from 'react-native-paper';

class CustomersListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search_term: '',
      customersList: customers,
      customersList4Search: customers,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      handleAndroidBackButton(this.navigateBack);
    });
  }

  /**
   * Device back button functionality.
   * Showing an alert, to confirm back click.
   */
  navigateBack = () => {
    exitAlert();
  };

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
      if (
        items.name.toLowerCase().includes(FormattedQuery) ||
        items.mob.toString().includes(FormattedQuery)
      ) {
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

  /*
   * client list - renderItem functionality
   */
  renderItem = ({item}) => {
    return (
      <Card style={[Styles.card]}>
        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              this.props.navigation.navigate('Details', {customer: item})
            }>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: wp('92%'),
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <Text style={{color: '#bdccd1'}}>Name</Text>
                <View>
                  <Text numberOfLines={1} style={Styles.ItemStyle}>
                    {item.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <Text style={{color: '#bdccd1'}}>Mobile</Text>
                <View>
                  <Text numberOfLines={1} style={Styles.ItemStyle}>
                    {item.mob}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  render() {
    const screenHeight = Dimensions.get('screen').height;
    const windowHeight = Dimensions.get('window').height;
    const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
    return (
      <View style={styles.container}>
        <MyHeader navigation={this.props.navigation} title="Customers" />
        <View style={Styles.searchInputView}>
          <Input
            inputStyle={Styles.searchTextStyle}
            inputContainerStyle={Styles.searchInput}
            value={this.state.search_term}
            returnKeyType="search"
            onChangeText={(val) => {
              this.setState({search_term: val});
              this.handleSearch(val);
            }}
            placeholder="Search Customer"
            placeholderTextColor="#b3b5ba"
            rightIcon={{
              type: 'EvilIcons',
              name: 'search',
              size: 22,
              color: '#b3b5ba',
            }}
            rightIconContainerStyle={{marginRight: '4%'}}
            // disabled={
            //   this.state.permissionList.includes('View Clients') ? false : true
            // }
          />
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          {this.state.customersList.length !== 0 ? (
            <View style={(Styles.FlatListView, {marginBottom: navbarHeight})}>
              <FlatList
                style={(Styles.FlatList, {marginBottom: navbarHeight + 60})}
                data={this.state.customersList}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          ) : (
            <View style={Styles.EmptyView}>
              <MaterialIcon
                style={{marginBottom: 5}}
                name="library-books"
                size={60}
                color={'#b3b5ba'}
              />
              <Text style={{color: '#b3b5ba', fontSize: 28}}>No Data</Text>
            </View>
          )}
        </KeyboardAwareScrollView>
        <View>
          <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={() => {
              this.props.navigation.replace('NewCustomer');
            }}
            color={'#fce86d'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#f0f4f5',
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#bdccd1',
  },
});

const customers = [
  {
    id: 1,
    name: 'Sudheesh P S',
    mob: 9685748596,
    place: 'Wayanad',
    temp: '98.9*C',
  },
  {
    id: 2,
    name: 'Nithin Krishnan',
    mob: 9748596586,
    place: 'Thrissur',
    temp: '99.9*C',
  },
  {
    id: 3,
    name: 'Sreeshma Sijil',
    mob: 9674658565,
    place: 'Kannur',
    temp: '98.7*C',
  },
  {
    id: 4,
    name: 'Sreenath',
    mob: 8574965486,
    place: 'Malappuram',
    temp: '99.7*C',
  },
  {
    id: 11,
    name: 'Sudheesh P S',
    mob: 9685748596,
    place: 'Mananthavady',
    temp: '98.9*C',
  },
  {
    id: 12,
    name: 'Nithin Krishnan',
    mob: 9748596586,
    place: 'Thrissur',
    temp: '99.9*C',
  },
  {
    id: 13,
    name: 'Sreeshma Sijil',
    mob: 9674658565,
    place: 'Kannur',
    temp: '98.7*C',
  },
  {
    id: 14,
    name: 'Sreenath',
    mob: 8574965486,
    place: 'Malappuram',
    temp: '99.7*C',
  },
];

export default CustomersListScreen;
