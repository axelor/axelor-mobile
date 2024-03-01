/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useEffect, useMemo} from 'react';
import DeviceInfo from 'react-native-device-info';
import {StyleSheet, Dimensions, View} from 'react-native';
import {
  Icon,
  ImageBubble,
  Picker,
  Screen,
  ScrollView,
  Text,
  useConfig,
  useTheme,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  logout,
  useBinaryImageUri,
  useDispatch,
  usePermissionsFetcher,
  useSelector,
  useTranslator,
} from '../../index';
import {fetchCompanies} from '../features/companySlice';
import {fetchLocalizations} from '../features/localizationSlice';
import {
  changeActiveCompany,
  updateActiveUser,
  fetchActiveUser,
} from '../features/userSlice';
import {PopupApplicationInformation} from '../../components';

const UserScreen = ({children}) => {
  const Theme = useTheme();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatImage = useBinaryImageUri();
  const dispatch = useDispatch();
  const fetchAllPermissions = usePermissionsFetcher();

  const {companyList} = useSelector(state => state.company);
  const {userId} = useSelector(state => state.auth);
  const {localizationList} = useSelector(state => state.localization);
  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {loadingUser, user, isUser, canModifyCompany} = useSelector(
    state => state.user,
  );

  const {setFilterConfig, setVirtualKeyboardConfig, setNbDecimalDigitForQty} =
    useConfig();

  useEffect(() => {
    fetchUser();
    dispatch(fetchCompanies());
    dispatch(fetchLocalizations());
  }, [dispatch, fetchUser, userId]);

  useEffect(() => {
    if (baseConfig?.nbDecimalDigitForQty != null) {
      setNbDecimalDigitForQty(baseConfig?.nbDecimalDigitForQty);
    }
  }, [baseConfig, setNbDecimalDigitForQty]);

  useEffect(() => {
    const SMALL_SCREEN_HEIGHT = 500;

    DeviceInfo.getManufacturer().then(manufacturer =>
      setVirtualKeyboardConfig(manufacturer === 'Zebra Technologies'),
    );

    setFilterConfig(Dimensions.get('window').height > SMALL_SCREEN_HEIGHT);
  }, [setFilterConfig, setVirtualKeyboardConfig]);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

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

  const handleChangeTheme = useCallback(
    newTheme => Theme.changeTheme(newTheme),
    [Theme],
  );

  const updateLanguage = useCallback(
    localization => {
      dispatch(
        updateActiveUser({
          id: user.id,
          localization: {id: localization},
          version: user.version,
        }),
      );
    },
    [dispatch, user],
  );

  const fetchUser = useCallback(() => {
    dispatch(fetchActiveUser(userId));
    fetchAllPermissions();
  }, [dispatch, fetchAllPermissions, userId]);

  return (
    <Screen style={styles.container}>
      <ScrollView
        refresh={{loading: loadingUser, fetcher: fetchUser}}
        style={styles.scroll}>
        <View style={styles.alignContainer}>
          <ImageBubble
            style={styles.imageIcon}
            imageSize={Dimensions.get('window').width * 0.3}
            defaultIconSize={60}
            source={formatImage(
              user?.id,
              user?.version,
              'com.axelor.auth.db.User',
            )}
            listComponent={[
              null,
              <Icon
                style={styles.logOutIcon}
                name="power"
                color={Colors.primaryColor.background}
                size={Dimensions.get('window').width * 0.07}
                touchable={true}
                onPress={() => dispatch(logout())}
              />,
            ]}
          />
          <Text style={styles.textUser}>{user.name}</Text>
          {baseConfig?.enableMultiCompany && (
            <Picker
              title={I18n.t('User_ActiveCompany')}
              listItems={companyList}
              defaultValue={user?.activeCompany}
              labelField="name"
              valueField="id"
              onValueChange={updateActiveCompany}
              isValueItem={true}
              readonly={!canModifyCompany}
            />
          )}
          {children}
          {localizationList?.length > 1 && (
            <Picker
              title={I18n.t('User_Language')}
              defaultValue={user.localization?.id}
              listItems={localizationList}
              labelField="name"
              valueField="id"
              onValueChange={updateLanguage}
              emptyValue={false}
            />
          )}
          {!Theme.isColorBlind && Theme.themes?.length !== 1 && (
            <Picker
              title={I18n.t('User_Theme')}
              defaultValue={Theme.activeTheme?.key}
              listItems={Theme.themes}
              labelField="name"
              valueField="key"
              onValueChange={handleChangeTheme}
              emptyValue={false}
            />
          )}
          <PopupApplicationInformation
            visible={!isUser && !loadingUser}
            textKey={'User_NoAppUser'}
            onRefresh={fetchUser}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    alignContainer: {
      alignItems: 'center',
      paddingBottom: 150,
    },
    scroll: {
      height: null,
    },
    container: {
      justifyContent: 'center',
    },
    imageIcon: {
      backgroundColor: Colors.backgroundColor,
    },
    logOutIcon: {
      backgroundColor: Colors.backgroundColor,
      borderRadius: Dimensions.get('window').width * 0.1,
      width: Dimensions.get('window').width * 0.1,
      height: Dimensions.get('window').width * 0.1,
      elevation: 5,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    textUser: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 30,
      marginTop: 0,
    },
  });

export default UserScreen;
