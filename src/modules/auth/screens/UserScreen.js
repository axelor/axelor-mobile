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
  changeDefaultStockLocation,
  changeLanguage,
  fetchActiveUser,
} from '@/modules/auth/features/userSlice';
import {IconSettings} from '../components/atoms';
import DeviceInfo from 'react-native-device-info';
import {AutocompleteSearch} from '@/components/organisms';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {
  fetchBaseConfig,
  setFilterShowConfig,
  setZebraConfig,
} from '../features/configSlice';
import {fetchStockAppConfig} from '@/features/appConfigSlice';
import {Themes} from '@/types/colors';
import {changeTheme, useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const stockLocationScanKey = 'stock-location_user-default';

const UserScreen = ({navigation}) => {
  const {companyList} = useSelector(state => state.company);
  const {userId} = useSelector(state => state.auth);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {languageList} = useSelector(state => state.language);
  const {loading, baseConfig} = useSelector(state => state.config);
  const {loadingUser, user, canModifyCompany} = useSelector(
    state => state.user,
  );
  const {theme, isColorBlind} = useSelector(state => state.theme);
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveUser(userId));
    dispatch(fetchCompanies());
    dispatch(fetchLanguages());
    dispatch(fetchBaseConfig());
    dispatch(fetchStockAppConfig());
  }, [dispatch, userId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconSettings
          onPress={() => navigation.navigate('SettingsScreen', {user: user})}
        />
      ),
    });
  }, [navigation, user]);

  useEffect(() => {
    const SMALL_SCREEN_HEIGHT = 500;

    DeviceInfo.getManufacturer().then(manufacturer => {
      dispatch(
        setZebraConfig({zebraConfig: manufacturer === 'Zebra Technologies'}),
      );
    });

    dispatch(
      setFilterShowConfig({
        filterShowConfig: Dimensions.get('window').height > SMALL_SCREEN_HEIGHT,
      }),
    );
  }, [dispatch]);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const fetchStockLocationsAPI = useCallback(
    (filterValue, companyId, defaultStockLocation) => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: companyId,
          defaultStockLocation: defaultStockLocation,
        }),
      );
    },
    [dispatch],
  );

  const updateActiveCompany = useCallback(
    company => {
      dispatch(
        changeActiveCompany({
          newCompany: {
            $version: company?.$version,
            code: company?.code,
            id: company?.id,
            name: company?.name,
          },
        }),
      );
    },
    [dispatch],
  );

  const updateDefaultStockLocation = useCallback(
    stockLocation => {
      dispatch(
        changeDefaultStockLocation({
          newStockLocation: stockLocation,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeTheme = useCallback(
    newTheme => {
      dispatch(
        changeTheme({
          newTheme: newTheme,
        }),
      );
    },
    [dispatch],
  );

  const updateLanguage = useCallback(
    language => {
      dispatch(changeLanguage(language));
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
                  title={I18n.t('User.Company')}
                  listItems={companyList}
                  labelField="name"
                  valueField="id"
                  onValueChange={updateActiveCompany}
                  isValueItem={true}
                />
              ) : (
                <Card style={styles.cardCompany}>
                  <LabelText
                    title={`${I18n.t('User.ActiveCompany')} :`}
                    value={user.activeCompany.name}
                  />
                </Card>
              )}
            </View>
          )}
          <Text style={styles.itemTitle}>
            {`${I18n.t('User.DefaultStockLocation')}`}
          </Text>
          <AutocompleteSearch
            objectList={stockLocationList}
            value={user.workshopStockLocation}
            onChangeValue={updateDefaultStockLocation}
            fetchData={searchValue =>
              fetchStockLocationsAPI(
                searchValue,
                user.activeCompany?.id,
                user.workshopStockLocation,
              )
            }
            displayValue={displayItemName}
            scanKeySearch={stockLocationScanKey}
            placeholder={I18n.t('Stock.StockLocation')}
          />
          {languageList.length > 1 && (
            <Picker
              title={I18n.t('User.Language')}
              defaultValue={user.language}
              listItems={languageList}
              labelField="name"
              valueField="code"
              onValueChange={updateLanguage}
              emptyValue={false}
            />
          )}
          {!isColorBlind && Themes.themesList.length !== 1 && (
            <Picker
              title={I18n.t('User.Theme')}
              defaultValue={theme}
              listItems={Themes.themesList}
              labelField="name"
              valueField="id"
              onValueChange={handleChangeTheme}
              emptyValue={false}
            />
          )}
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
