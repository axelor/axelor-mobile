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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
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
    if (distance != null) {
      setValue(Number(distance));
    }
  }, [distance]);

  const handleChange = useCallback(
    e => {
      setValue(e);
      onChange(e);
    },
    [onChange],
  );

  return (
    <FormIncrementInput
      title={title}
      style={styles.input}
      onChange={handleChange}
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
  readonly,
  required,
}) => {
  return (
    <DistanceIncrementAux
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
      title={title}
      readonly={readonly}
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
