import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Screen} from '@/components/atoms';
import {logout} from '@/modules/auth/features/authSlice';
import {LogoutButton} from '../components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@/components/molecules';
import {fetchCompanies} from '@/modules/auth/features/companySlice';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {fetchLanguages} from '@/modules/auth/features/languageSlice';

const UserScreen = () => {
  const {loadingCompanies, companyList} = useSelector(state => state.company);
  const {loadingLocations, stockLocationList} = useSelector(
    state => state.stockLocation,
  );
  const {loadingLanguage, languageList} = useSelector(state => state.language);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchStockLocations());
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <Screen style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.imageContainer}>
          <Icon name="user" size={150} />
        </View>
        <Picker
          title={'Company'}
          defaultValue={1}
          listItems={companyList}
          labelField="name"
          valueField="id"
          onValueChange={() => {}}
        />
        <Picker
          title={'Stock Location'}
          defaultValue={1}
          listItems={stockLocationList}
          labelField="name"
          valueField="id"
          onValueChange={() => {}}
        />
        <Picker
          title={'Language'}
          defaultValue={2}
          listItems={languageList}
          labelField="name"
          valueField="id"
          onValueChange={() => {}}
        />
      </View>

      <LogoutButton onPress={() => dispatch(logout())} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 160,
    width: 160,
    height: 160,
    marginBottom: '15%',
  },
});

export default UserScreen;
