import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Styles = StyleSheet.create({
  searchInputView: {
    marginTop: hp('1%'),
  },
  searchTextStyle: {
    fontSize: hp('2.2%'),
    // fontFamily: 'Rubik-Regular',
    fontWeight: 'normal',
    marginStart: 10,
  },
  searchInput: {
    width: wp('94%'),
    height: hp('7.5%'),
    borderWidth: 0.8,
    borderColor: '#ffffff',
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginTop: 10,
  },
  EmptyView: {
    width: wp('100%'),
    height: hp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  EmptyTextStyle: {
    fontSize: hp('5%'),
    color: '#929292',
    // fontFamily: 'SourceSansPro-Bold',
    marginBottom: hp('35%'),
  },
  card: {
    marginStart: 8,
    marginEnd: 8,
    marginBottom: 8,
    marginTop: 4,
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderWidth: 0.1,
    minHeight: '30%',
    borderColor: '#ffffff',
    flexDirection: 'row',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowColor: '#ffffff',
  },
  FlatListView: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#f0f4f5',
  },
  FlatList: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#f0f4f5',
  },
  ItemtittleStyle: {
    flexDirection: 'column',
  },
  ItemtitleTextStyle: {
    fontSize: hp('1.5%'),
    color: '#3e3e3e',
    // fontFamily: 'SourceSansPro-Regular',
  },
  ItemStyle: {
    fontSize: hp('2.2%'),
    color: '#414d55',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: 'normal',
    // fontFamily: 'WorkSans-SemiBold',
    paddingEnd: 5,
  },
  validationError: {
    alignSelf: 'flex-start',
    color: 'red',
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: 12,
    bottom: 20,
    marginStart: wp('6%'),
  },
});

export default Styles;
