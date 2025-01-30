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
import {Platform, StyleSheet, View} from 'react-native';
import {
  Alert,
  Button,
  checkNullString,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {linkingProvider} from '../../../tools/LinkingProvider';
import {logout} from '../../../features/authSlice';
import {useDispatch} from '../../../redux/hooks';

const BUTTON_WIDTH = 250;

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
    <Alert visible={true} title={I18n.t('Base_Information')}>
      <Text>{I18n.t('Base_MinimalRequiredVersion')}</Text>
      <View style={styles.buttonsContainer}>
        {checkNullString(url) ? (
          <Text style={styles.noURLText}>{I18n.t('Base_Contact_Admin')}</Text>
        ) : (
          <Button
            width={BUTTON_WIDTH}
            title={I18n.t('Base_Update')}
            iconName="angle-double-up"
            onPress={handleUpdate}
          />
        )}
        <Button
          width={BUTTON_WIDTH}
          color={Colors.secondaryColor}
          title={I18n.t('Base_Refresh')}
          iconName="refresh"
          FontAwesome5={false}
          onPress={onRefresh}
        />
        <Button
          width={BUTTON_WIDTH}
          color={Colors.errorColor}
          title={I18n.t('Base_Logout')}
          iconName="power-off"
          onPress={() => dispatch(logout())}
        />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 10,
  },
  noURLText: {
    marginBottom: 10,
  },
});

export default PopupMinimalRequiredVersion;
