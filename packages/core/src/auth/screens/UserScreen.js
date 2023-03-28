/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {logout, useDispatch, useSelector, useTranslator} from '../../index';
import {fetchCompanies} from '../features/companySlice';
import {fetchLanguages} from '../features/languageSlice';
import {
  changeActiveCompany,
  updateActiveUser,
  fetchActiveUser,
} from '../features/userSlice';
import {fetchBaseConfig, fetchMobileSettings} from '../features/configSlice';

const UserScreen = ({children, navigation}) => {
  const {companyList} = useSelector(state => state.company);
  const {userId, baseUrl} = useSelector(state => state.auth);
  const {languageList} = useSelector(state => state.language);
  const {loading, baseConfig} = useSelector(state => state.config);
  const {loadingUser, user, canModifyCompany} = useSelector(
    state => state.user,
  );
  const Theme = useTheme();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {setFilterConfig, setVirtualKeyboardConfig} = useConfig();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveUser(userId));
    dispatch(fetchCompanies());
    dispatch(fetchLanguages());
    dispatch(fetchBaseConfig());
    dispatch(fetchMobileSettings());
  }, [dispatch, userId]);

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
    language => {
      dispatch(
        updateActiveUser({id: user.id, language, version: user.version}),
      );
    },
    [dispatch, user],
  );

  return (
    <Screen style={styles.container} loading={loadingUser || loading}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <ImageBubble
            style={styles.imageIcon}
            imageSize={Dimensions.get('window').width * 0.3}
            defaultIconSize={60}
            source={{
              uri: `${baseUrl}ws/rest/com.axelor.auth.db.User/${user.id}/image/download?v=${user.version}&parentId=${user.id}&parentModel=com.axelor.auth.db.User&image=true`,
            }}
            listComponent={[
              null,
              <Icon
                style={styles.logOutIcon}
                name="power-off"
                color={Colors.primaryColor.background}
                size={Dimensions.get('window').width * 0.07}
                touchable={true}
                onPress={() => dispatch(logout())}
              />,
            ]}
          />
          <Text style={styles.textUser}>{user.name}</Text>
        </View>
        {baseConfig?.enableMultiCompany && (
          <Picker
            title={I18n.t('User_ActiveCompany')}
            listItems={companyList}
            labelField="name"
            valueField="id"
            onValueChange={updateActiveCompany}
            isValueItem={true}
            disabled={!canModifyCompany}
            disabledValue={user?.activeCompany?.name}
          />
        )}
        {children}
        {languageList.length > 1 && (
          <Picker
            title={I18n.t('User_Language')}
            defaultValue={user.language}
            listItems={languageList}
            labelField="name"
            valueField="code"
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
      </ScrollView>
    </Screen>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    imageContainer: {
      alignItems: 'center',
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
    },
    textUser: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 30,
      marginTop: 0,
    },
  });

export default UserScreen;
