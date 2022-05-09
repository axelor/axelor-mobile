import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Screen} from '@/components/atoms';
import {Picker} from '@/components/molecules';
import {LogoutButton} from '@/modules/auth/components/molecules';
import {logout} from '@/modules/auth/features/authSlice';
import {fetchCompanies} from '@/modules/auth/features/companySlice';
import {fetchLanguages} from '@/modules/auth/features/languageSlice';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {fetchUser} from '@/modules/auth/features/userSlice';

const UserScreen = () => {
  const {companyList} = useSelector(state => state.company);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {languageList} = useSelector(state => state.language);
  const {loadingUser, userList} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCompanies());
    dispatch(fetchStockLocations());
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <Screen style={styles.container}>
      {loadingUser ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView contentContainerStyle={styles.centerItems}>
          <View style={styles.imageContainer}>
            <Icon name="user" style={styles.icon} />
          </View>
          <Picker
            title="Company"
            defaultValue={
              userList[0].activeCompany == null
                ? null
                : userList[0].activeCompany.id
            }
            listItems={companyList}
            labelField="name"
            valueField="id"
            onValueChange={() => {}}
          />
          <Picker
            title="Stock Location"
            defaultValue={userList[0].workshopStockLocation}
            listItems={stockLocationList}
            labelField="name"
            valueField="id"
            onValueChange={() => {}}
          />
          <Picker
            title="Language"
            defaultValue={userList[0].language}
            listItems={languageList}
            labelField="name"
            valueField="code"
            onValueChange={() => {}}
          />
        </ScrollView>
      )}
      <LogoutButton style={styles.button} onPress={() => dispatch(logout())} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  centerItems: {
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Dimensions.get('window').width * 0.3,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    marginVertical: '5%',
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.25,
    color: '#606060',
  },
  button: {
    marginVertical: '5%',
  },
});

export default UserScreen;
