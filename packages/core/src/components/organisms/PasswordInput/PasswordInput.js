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

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, IconInput} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';

const PasswordInput = ({style, value, onChange, readOnly}) => {
  const [visible, setVisible] = useState(false);
  const I18n = useTranslator();

  return (
    <IconInput
      style={style}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      secureTextEntry={!visible}
      placeholder={I18n.t('Auth_Password')}
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
