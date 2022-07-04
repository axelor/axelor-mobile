import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Icon, Screen, Text} from '@/components/atoms';
import {LabelText, Picker} from '@/components/molecules';
import {LogoutButton} from '@/modules/auth/components/molecules';
import {logout} from '@/modules/auth/features/authSlice';
import {fetchCompanies} from '@/modules/auth/features/companySlice';
import {fetchLanguages} from '@/modules/auth/features/languageSlice';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {
  changeActiveCompany,
  fetchActiveUser,
} from '@/modules/auth/features/userSlice';
import {IconSettings} from '../components/atoms';
import DeviceInfo from 'react-native-device-info';
import {ColorHook} from '@/themeStore';
import {AutocompleteSearch} from '@/components/organisms';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {fetchBaseConfig} from '../features/configSlice';
import {fetchStockAppConfig} from '@/features/appConfigSlice';

const stockLocationScanKey = 'stock-location_user-default';

const UserScreen = ({navigation}) => {
  const {companyList} = useSelector(state => state.company);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {languageList} = useSelector(state => state.language);
  const {loading, baseConfig} = useSelector(state => state.config);
  const {loadingUser, user, canModifyCompany} = useSelector(
    state => state.user,
  );
  const Colors = ColorHook();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveUser());
    dispatch(fetchCompanies());
    dispatch(fetchLanguages());
    dispatch(fetchBaseConfig());
    dispatch(fetchStockAppConfig());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconSettings
          onPress={() => navigation.navigate('SettingsScreen', {user: user})}
        />
      ),
    });
  }, [navigation, user]);

  useMemo(() => {
    const SMALL_SCREEN_HEIGHT = 500;

    DeviceInfo.getManufacturer().then(manufacturer => {
      global.zebraConfig = manufacturer === 'Zebra Technologies';
    });

    global.filterConfig = Dimensions.get('window').height > SMALL_SCREEN_HEIGHT;
  }, []);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(searchStockLocations({searchValue: filterValue}));
    },
    [dispatch],
  );

  const updateActiveCompany = useCallback(
    company => {
      dispatch(
        changeActiveCompany({
          newCompany: {
            $version: company.$version,
            code: company.code,
            id: company.id,
            name: company.name,
          },
        }),
      );
    },
    [dispatch],
  );

  return (
    <Screen style={styles.container}>
      {loadingUser || loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView contentContainerStyle={styles.centerItems}>
          <Icon
            name="user-alt"
            size={Dimensions.get('window').width * 0.2}
            style={styles.imageContainer}
          />
          {baseConfig.enableMultiCompany && (
            <View style={styles.companyContainer}>
              {canModifyCompany ? (
                <Picker
                  style={styles.companyPicker}
                  title="Company"
                  listItems={companyList}
                  labelField="name"
                  valueField="id"
                  onValueChange={updateActiveCompany}
                  isValueItem={true}
                />
              ) : (
                <Card style={styles.cardCompany}>
                  <LabelText
                    title={'Active Company :'}
                    value={user.activeCompany.name}
                  />
                </Card>
              )}
            </View>
          )}
          <Text style={styles.itemTitle}>Default Stock Location</Text>
          <AutocompleteSearch
            objectList={stockLocationList}
            value={user.workshopStockLocation}
            onChangeValue={() => {}}
            fetchData={fetchStockLocationsAPI}
            displayValue={displayItemName}
            scanKeySearch={stockLocationScanKey}
            placeholder="Stock location"
          />
          <Picker
            title="Language"
            defaultValue={user.language}
            listItems={languageList}
            labelField="name"
            valueField="code"
            onValueChange={() => {}}
            emptyValue={false}
          />
          <LogoutButton onPress={() => dispatch(logout())} />
        </ScrollView>
      )}
    </Screen>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    centerItems: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.backgroundColor,
      borderRadius: Dimensions.get('window').width * 0.3,
      width: Dimensions.get('window').width * 0.3,
      height: Dimensions.get('window').width * 0.3,
      marginVertical: '5%',
    },
    companyContainer: {
      width: '95%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginVertical: 3,
    },
    companyPicker: {
      width: '100%',
    },
    cardCompany: {
      marginLeft: 8,
      paddingHorizontal: 14,
      width: '95%',
    },
    itemTitle: {
      alignSelf: 'flex-start',
      marginLeft: 24,
    },
  });

export default UserScreen;
