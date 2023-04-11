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
import {StyleSheet} from 'react-native';
import {Icon, IconInput, useThemeColor} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';

const UsernameInput = ({
  value,
  onChange,
  readOnly,
  showScanIcon = true,
  onScanPress,
  onSelection = () => {},
  scanIconColor,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <IconInput
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={true}
      onSelection={showScanIcon ? onSelection : () => {}}
      placeholder={I18n.t('Auth_Username')}
      leftIconsList={[<Icon name="user" size={17} style={styles.icon} />]}
      rightIconsList={
        showScanIcon
          ? [
              <Icon
                name="qrcode"
                size={20}
                color={
                  scanIconColor == null
                    ? Colors.secondaryColor_dark.background
                    : scanIconColor
                }
                touchable={true}
                style={styles.icon}
                onPress={onScanPress}
                FontAwesome5={false}
              />,
            ]
          : []
      }
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '7%',
    margin: 3,
  },
});

export default UsernameInput;
