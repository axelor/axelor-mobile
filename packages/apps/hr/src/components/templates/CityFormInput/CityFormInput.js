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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {FormInput, InfoBubble, useThemeColor} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {getDistance} from '../../../features/distanceSlice';

const CityFormInputAux = ({
  title = '',
  defaultValue = null,
  readonly = false,
  required = false,
  onChange = () => {},
  delay = 1000,
  isFromCity = false,
}) => {
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const timerRef = useRef(null);

  const [value, setValue] = useState(defaultValue);

  const {toCity, fromCity, needUpdateDistance, showCityError} = useSelector(
    state => state.distance,
  );
  const {expense: expenseConfig} = useSelector(state => state.appConfig);

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
    <>
      <FormInput
        title={title}
        defaultValue={defaultValue}
        readOnly={readonly}
        style={styles.input}
        required={required}
        onChange={handleChange}
      />
      {showCityError && (
        <InfoBubble
          style={styles.infoBubble}
          textIndicationStyle={styles.infoIndicator}
          iconName="exclamation-lg"
          coloredBubble={false}
          badgeColor={Colors.errorColor}
          indication={I18n.t('Hr_CityNotFound')}
          position="left"
        />
      )}
    </>
  );
};

const CityFormInput = ({
  title,
  defaultValue,
  onChange,
  readonly,
  required,
  isFromCity,
}) => {
  return (
    <CityFormInputAux
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
  infoBubble: {
    position: 'absolute',
    bottom: 6,
    right: 30,
  },
  infoIndicator: {
    width: Dimensions.get('window').width * 0.8,
  },
});

export default CityFormInput;
