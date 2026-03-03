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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  getCommonStyles,
  Icon,
  IconInput,
  LabelText,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {checkNullString} from '../../../utils';

const UsernameInput = ({
  value,
  onChange,
  readOnly,
  showScanIcon = true,
  onScanPress,
  onSelection = () => {},
  scanIconColor,
  style,
  showRequiredFields = false,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, checkNullString(value)),
    [Colors, value],
  );

  if (readOnly) {
    return (
      <LabelText
        iconName="person-fill"
        title={value}
        style={styles.labText}
        size={20}
      />
    );
  }

  return (
    <IconInput
      style={[style, showRequiredFields ? commonStyles.inputFocused : null]}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={true}
      onSelection={showScanIcon ? onSelection : () => {}}
      placeholder={I18n.t('Base_Connection_Username')}
      leftIconsList={[
        <Icon name="person-fill" size={17} style={styles.icon} />,
      ]}
      rightIconsList={
        showScanIcon
          ? [
              <Icon
                name="qr-code-scan"
                size={20}
                color={
                  scanIconColor == null
                    ? Colors.secondaryColor_dark.background
                    : scanIconColor
                }
                touchable={true}
                style={styles.icon}
                onPress={onScanPress}
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
  labText: {
    width: '100%',
    marginVertical: 10,
    marginLeft: 5,
  },
});

export default UsernameInput;
