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

import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  getCommonStyles,
  Icon,
  IconInput,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {checkNullString} from '../../../utils';

const PasswordInput = ({
  style,
  value,
  onChange,
  readOnly,
  showRequiredFields = false,
  hidden = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [visible, setVisible] = useState(false);

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, checkNullString(value)),
    [Colors, value],
  );

  if (hidden) {
    return null;
  }

  return (
    <IconInput
      style={[style, showRequiredFields ? commonStyles.inputFocused : null]}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={true}
      secureTextEntry={!visible}
      placeholder={I18n.t('Base_Connection_Password')}
      leftIconsList={[<Icon name="key" size={17} style={styles.icon} />]}
      rightIconsList={[
        <Icon
          name={visible ? 'eye' : 'eye-slash'}
          size={17}
          touchable={true}
          onPress={() => setVisible(!visible)}
          style={styles.icon}
        />,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '7%',
    margin: 3,
  },
});

export default PasswordInput;
