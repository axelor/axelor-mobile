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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FormInput} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {getDistance} from '../../../features/distanceSlice';
import {StyleSheet} from 'react-native';

const EventFormInputAux = ({
  title = '',
  defaultValue = null,
  readonly = false,
  required = false,
  onChange = () => {},
  delay = 2000,
  isFromCity = false,
}) => {
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  const [value, setValue] = useState(defaultValue);

  const {toCity, fromCity, needUpdateDistance} = useSelector(
    state => state.distance,
  );
  const {expenseConfig} = useSelector(state => state.expenseAppConfig);

  useEffect(() => {
    if (expenseConfig?.computeDistanceWithWebService && needUpdateDistance) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => getDistanceApi(value), delay);
    }
  }, [
    delay,
    expenseConfig?.computeDistanceWithWebService,
    getDistanceApi,
    needUpdateDistance,
    value,
  ]);

  const handleChange = e => {
    onChange(e);
    setValue(e);
  };

  const getDistanceApi = useCallback(
    _value => {
      dispatch(
        getDistance({
          fromCity: isFromCity ? _value : fromCity,
          toCity: isFromCity ? toCity : _value,
        }),
      );
    },
    [dispatch, fromCity, isFromCity, toCity],
  );

  return (
    <FormInput
      title={title}
      defaultValue={defaultValue}
      readOnly={readonly}
      style={styles.input}
      required={required}
      onChange={handleChange}
    />
  );
};

const EventFormInput = ({
  title,
  defaultValue,
  onChange,
  readonly,
  required,
  isFromCity,
}) => {
  return (
    <EventFormInputAux
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
      isFromCity={isFromCity}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default EventFormInput;
