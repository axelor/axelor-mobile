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

import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {PopUp, IconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {linkingProvider} from '../../../tools/LinkingProvider';
import {logout} from '../../../features/authSlice';
import {useDispatch} from '../../../redux/hooks';

const PopupMinimalRequiredVersion = ({
  minimalRequiredMobileAppVersion,
  onRefresh,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const url =
      Platform.OS === 'ios'
        ? minimalRequiredMobileAppVersion?.ios
        : minimalRequiredMobileAppVersion?.android;
    linkingProvider.openBrowser(url);
  };

  return (
    <PopUp
      visible={true}
      title={I18n.t('Base_Information')}
      data={I18n.t('Base_MinimalRequiredVersion')}>
      <View style={styles.btnContainer}>
        <IconButton
          title={I18n.t('Base_Update')}
          iconName="angle-double-up"
          color={Colors.primaryColor}
          onPress={() => handleUpdate()}
          style={styles.btn}
        />
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
      </View>
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
  popupContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '120%',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: '-10%',
  },
  binIcon: {
    position: 'absolute',
    right: '1%',
    bottom: '5%',
  },
  input: {
    width: '100%',
  },
  labText: {
    width: '95%',
    marginVertical: 10,
  },
});

export default PopupMinimalRequiredVersion;
