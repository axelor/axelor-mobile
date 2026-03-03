/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {Alert, Button, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {logout} from '../../../features/authSlice';
import {useDispatch} from '../../../redux/hooks';

const BUTTON_WIDTH = 225;

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
    <Alert visible={visible} title={I18n.t('Base_Information')}>
      <Text>{I18n.t(textKey)}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          width={BUTTON_WIDTH}
          color={Colors.warningColor}
          title={I18n.t('Base_Refresh')}
          iconName="arrow-repeat"
          onPress={onRefresh}
        />
        <Button
          width={BUTTON_WIDTH}
          color={Colors.errorColor}
          title={I18n.t('Base_Logout')}
          iconName="power"
          onPress={() => dispatch(logout() as any)}
        />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 10,
  },
});

export default PopupApplicationInformation;
