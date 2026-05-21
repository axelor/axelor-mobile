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
  checkNullString,
  getCommonStyles,
  Icon,
  IconInput,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {MfaMethod, getMfaPlaceholderKey} from '../../mfa';

interface MfaCodeInputProps {
  style?: any;
  value: string;
  onChange: (value: string) => void;
  selectedMethod?: MfaMethod;
}

const MfaCodeInput = ({
  style,
  value,
  onChange,
  selectedMethod,
}: MfaCodeInputProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, checkNullString(value)),
    [Colors, value],
  );

  return (
    <IconInput
      style={[style, commonStyles.inputFocused]}
      value={value}
      onChange={onChange}
      placeholder={I18n.t(getMfaPlaceholderKey(selectedMethod))}
      keyboardType="number-pad"
      required
      leftIconsList={[
        <Icon name="shield-lock-fill" size={17} style={styles.icon} />,
      ]}
      onEndFocus={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '7%',
    margin: 3,
  },
});

export default MfaCodeInput;
