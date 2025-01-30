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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, PopUp, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {logout} from '../../../features/authSlice';
import {useDispatch} from '../../../redux/hooks';

interface PopupApplicationInformationProps {
  visible?: boolean;
  textKey: string;
  onRefresh: () => void;
}

const PopupApplicationInformation = ({
  visible = true,
  textKey,
  onRefresh,
}: PopupApplicationInformationProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  return (
    <PopUp
      visible={visible}
      title={I18n.t('Base_Information')}
      data={I18n.t(textKey)}>
      <View style={styles.btnContainer}>
        <IconButton
          title={I18n.t('Base_Refresh')}
          iconName="refresh"
          FontAwesome5={false}
          color={Colors.warningColor}
          onPress={onRefresh}
          style={styles.btn}
        />
        <IconButton
          title={I18n.t('Base_Logout')}
          iconName="power-off"
          color={Colors.errorColor}
          onPress={() => dispatch(logout() as any)}
          style={styles.btn}
        />
      </View>
    </PopUp>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
  },
});

export default PopupApplicationInformation;
