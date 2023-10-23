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

import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, isEmpty} from '@axelor/aos-mobile-core';
import {FormIncrementInput} from '@axelor/aos-mobile-ui';

const DistanceIncrementAux = ({
  title = 'Hr_Distance',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const [value, setValue] = useState(defaultValue);

  const {distance} = useSelector(state => state.distance);

  useEffect(() => {
    if (!isEmpty(distance)) {
      setValue(Number(distance?.distance));
      onChange(Number(distance?.distance));
    } else {
      setValue(defaultValue);
      onChange(defaultValue);
    }
  }, [defaultValue, distance, onChange]);

  return (
    <FormIncrementInput
      title={title}
      style={styles.input}
      onChange={onChange}
      defaultValue={value}
      readOnly={readonly}
      required={required}
    />
  );
};

const DistanceIncrement = ({
  style,
  title,
  defaultValue,
  onChange,
  readOnly,
  required,
}) => {
  return (
    <DistanceIncrementAux
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
      title={title}
      readonly={readOnly}
      required={required}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default DistanceIncrement;
