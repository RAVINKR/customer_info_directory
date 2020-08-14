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
  Modal,
} from 'react-native';
import MyHeader from '../../../components/MyHeader';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
  exitAlert,
} from '../../../shared/AndroidBackHandler.js';
import {Card, Input, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Styles from '../../../shared/Styles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../../../shared/Loader';
import {FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

class ReportsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search_term: '',
      customersList: [],
      customersList4Search: customers,
      filterModal: false,
      startDate: '',
      endDate: '',
      startDatePicker: false,
      endDatePicker: false,
      forEndDate: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this._init();
      handleAndroidBackButton(this.navigateBack);
    });
  }

  _init = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            loading: false,
            customersList: customers,
          });
        }, 1000);
      },
    );
  };

  /**
   * Device back button functionality.
   * Showing an alert, to confirm back click.
   */
  navigateBack = () => {
    exitAlert();
  };

  _showStartDatePicker = () => {
    this.setState({
      endDatePicker: false,
      startDatePicker: true,
    });
  };

  _showEndDatePicker = () => {
    this.setState({
      startDatePicker: false,
      endDatePicker: true,
    });
  };

  _handleStartDateConfirm = (date) => {
    let formattedDate = moment(date).format('DD MMM YYYY');
    console.log('A start date has been picked: ', formattedDate);
    this.setState({
      startDate: formattedDate,
      endDate: '',
      forEndDate: date,
    });
    this._hideStartDatePicker();
  };

  _hideStartDatePicker = () => {
    this.setState({
      startDatePicker: false,
    });
  };

  _handleEndDateConfirm = (date) => {
    let formattedDate = moment(date).format('DD MMM YYYY');
    console.log('An end date has been picked: ', formattedDate);
    this.setState({
      endDate: formattedDate,
    });
    this._hideEndDatePicker();
  };

  _hideEndDatePicker = () => {
    this.setState({
      endDatePicker: false,
    });
  };

  _gotoFilteredList = () => {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    if (startDate !== '' && endDate !== '') {
      alert(
        `Start Date:  "${this.state.startDate}" \n End Date:  "${this.state.endDate}".`,
      );
    }
    this.setState({
      filterModal: false,
      startDate: '',
      endDate: '',
    });
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

  _hideModal = () => {
    this.setState({
      filterModal: false,
    });
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
            // onPress={() => {
            //   alert(item.name);
            // }}
          >
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
        <MyHeader navigation={this.props.navigation} title="Reports" />
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
            icon="filter"
            onPress={() => {
              this.setState({
                filterModal: true,
              });
              // alert('filter option clicked!!');
            }}
            color={'#fce86d'}
          />
        </View>
        {this.state.loading === true && <Loader />}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.filterModal}
          onRequestClose={() => {
            this.setState({
              filterModal: false,
            });
          }}>
          <LinearGradient
            style={[styles.navBg]}
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}>
            <TouchableOpacity style={{flex: 1}} onPress={this._hideModal} />
            <View style={styles.navCard}>
              <View style={[styles.navSection, {marginBottom: 10}]}>
                <View style={{flexGrow: 1, alignSelf: 'flex-start'}}>
                  <Text style={styles.headingStyle}>Filter</Text>
                </View>
                <View style={{paddingStart: wp('4%')}}>
                  <View style={styles.row}>
                    <View style={styles.navLinkTextView}>
                      <Text style={styles.navLinkText}>Start Date: </Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this._showStartDatePicker}>
                        <View style={styles.dateContainerCommonStyle}>
                          <Input
                            value={this.state.startDate}
                            ref="startDate"
                            inputContainerStyle={{
                              ...styles.inputContainer,
                              borderColor: '#b7b7b7',
                            }}
                            inputStyle={{
                              ...styles.inputsty,
                              color: '#484e5e',
                            }}
                            editable={false}
                            rightIcon={
                              <Icon
                                name="calendar-blank"
                                size={25}
                                color={'#6f8fa7'}
                              />
                            }
                            rightIconContainerStyle={{paddingRight: wp('4%')}}
                          />
                          <DateTimePicker
                            is24Hour={false}
                            // minimumDate={new Date()}
                            isVisible={this.state.startDatePicker}
                            onConfirm={this._handleStartDateConfirm}
                            onCancel={this._hideStartDatePicker}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.navLinkTextView}>
                      <Text style={styles.navLinkText}>End Date: </Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={
                          this.state.startDate !== ''
                            ? this._showEndDatePicker
                            : null
                        }>
                        <View style={styles.dateContainerCommonStyle}>
                          <Input
                            value={this.state.endDate}
                            ref="startDate"
                            inputContainerStyle={{
                              ...styles.inputContainer,
                              borderColor: '#b7b7b7',
                            }}
                            inputStyle={{
                              ...styles.inputsty,
                              color: '#484e5e',
                            }}
                            editable={false}
                            rightIcon={
                              <Icon
                                name="calendar-blank"
                                size={25}
                                color={'#6f8fa7'}
                              />
                            }
                            rightIconContainerStyle={{paddingRight: wp('4%')}}
                          />
                          <DateTimePicker
                            is24Hour={false}
                            minimumDate={this.state.forEndDate}
                            isVisible={this.state.endDatePicker}
                            onConfirm={this._handleEndDateConfirm}
                            onCancel={this._hideEndDatePicker}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.applyButtonView}>
                  <Button
                    title="Apply"
                    buttonStyle={styles.applyButtonStyle}
                    containerStyle={styles.applyButtonContainerStyle}
                    titleStyle={styles.applyButtonTitleStyle}
                    onPress={() => {
                      this._gotoFilteredList();
                    }}
                  />
                </View>
              </View>
            </View>
          </LinearGradient>
        </Modal>
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
  navBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  navCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: '#000000',
    shadowOffset: {height: 2, width: 0},
    elevation: 5,
    paddingTop: 20,
    paddingBottom: 20,
  },
  navSection: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIconWrapper: {
    width: 48,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLinkText: {
    flexGrow: 1,
    fontSize: 16,
    color: '#b3b5ba',
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: hp('2%'),
    width: wp('50%'),
    height: hp('6%'),
    //borderColor: '#b7b7b7',
  },
  inputsty: {
    marginLeft: wp('2%'),
    fontFamily: 'Rubik-Medium',
    fontSize: hp('1.8%'),
    color: '#484e5e',
  },
  applyButtonView: {
    marginLeft: wp('10%'),
    marginRight: wp('4%'),
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: wp('2%'),
  },
  applyButtonStyle: {
    width: wp('32%'),
    borderRadius: hp('22%'),
    height: hp('8%'),
    backgroundColor: '#bdccd1',
  },
  applyButtonContainerStyle: {
    width: wp('32%'),
    borderRadius: hp('20%'),
    height: hp('8%'),
  },
  applyButtonTitleStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  headingStyle: {
    fontSize: 20,
    color: '#222222',
    fontWeight: 'bold',
    padding: wp('3%'),
  },
  navLinkTextView: {
    flexGrow: 1,
    alignSelf: 'flex-start',
    paddingTop: wp('2%'),
  },
  dateContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingStart: wp('5%'),
  },
  dateContainerCommonStyle: {
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const customers = [
  {
    id: 1,
    name: 'Sudheesh P S',
    mob: 9685748596,
  },
  {
    id: 2,
    name: 'Nithin Krishnan',
    mob: 9748596586,
  },
  {
    id: 3,
    name: 'Sreeshma Sijil',
    mob: 9674658565,
  },
  {
    id: 4,
    name: 'Sreenath',
    mob: 8574965486,
  },
  {
    id: 11,
    name: 'Sudheesh P S',
    mob: 9685748596,
  },
  {
    id: 12,
    name: 'Nithin Krishnan',
    mob: 9748596586,
  },
  {
    id: 13,
    name: 'Sreeshma Sijil',
    mob: 9674658565,
  },
  {
    id: 14,
    name: 'Sreenath',
    mob: 8574965486,
  },
];

export default ReportsScreen;
