/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {
  checkNullString,
  IconButton,
  PopUp,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {linkingProvider} from '../../../tools/LinkingProvider';
import {logout} from '../../../features/authSlice';
import {useDispatch} from '../../../redux/hooks';

const PopupMinimalRequiredVersion = ({versionCheckConfig, onRefresh}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const url = useMemo(
    () =>
      Platform.OS === 'ios'
        ? versionCheckConfig?.ios
        : versionCheckConfig?.android,
    [versionCheckConfig],
  );

  const handleUpdate = () => {
    linkingProvider.openBrowser(url);
  };

  return (
    <PopUp
      visible={true}
      title={I18n.t('Base_Information')}
      data={I18n.t('Base_MinimalRequiredVersion')}
      style={styles.popup}
      childrenStyle={styles.btnContainer}>
      {checkNullString(url) ? (
        <Text style={styles.text}>{I18n.t('Base_Contact_Admin')}</Text>
      ) : (
        <IconButton
          title={I18n.t('Base_Update')}
          iconName="angle-double-up"
          color={Colors.primaryColor}
          onPress={handleUpdate}
          style={styles.btn}
        />
      )}
      <IconButton
        title={I18n.t('Base_Refresh')}
        iconName="refresh"
        FontAwesome5={false}
        color={Colors.secondaryColor}
        onPress={onRefresh}
        style={styles.btn}
      />
      <IconButton
        title={I18n.t('Base_Logout')}
        iconName="power-off"
        color={Colors.errorColor}
        onPress={() => dispatch(logout())}
        style={styles.btn}
      />
    </PopUp>
  );
};

const styles = StyleSheet.create({
  popup: {
    width: '90%',
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 15,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 70,
    marginVertical: '1%',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PopupMinimalRequiredVersion;
