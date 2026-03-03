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

import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {FormIncrementInput} from '@axelor/aos-mobile-ui';
import {getDistance} from '../../../features/distanceSlice';

interface DistanceIncrementProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  objectState?: any;
  onChange?: (value: string) => void;
  readonly?: boolean;
  required?: boolean;
  delay?: number;
}

const DistanceIncrementAux = ({
  style,
  title = 'Hr_Distance',
  defaultValue,
  objectState,
  onChange,
  readonly = false,
  required = false,
  delay = 1000,
}: DistanceIncrementProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const {ExpenseLine} = useTypes();

  const {distance} = useSelector(state => state.distance);
  const {expense: expenseConfig} = useSelector(state => state.appConfig);

  const fromCity = useMemo(
    () => objectState?.fromCity,
    [objectState?.fromCity],
  );
  const toCity = useMemo(() => objectState?.toCity, [objectState?.toCity]);
  const kilometricTypeSelect = useMemo(
    () => objectState?.kilometricTypeSelect,
    [objectState?.kilometricTypeSelect],
  );

  useEffect(() => {
    if (distance != null) {
      onChange(
        kilometricTypeSelect === ExpenseLine?.kilometricTypeSelect.RoundTrip
          ? distance * 2
          : distance,
      );
    }
  }, [
    ExpenseLine?.kilometricTypeSelect.RoundTrip,
    distance,
    kilometricTypeSelect,
    onChange,
  ]);

  const getDistanceApi = useCallback(
    (data: any) => dispatch((getDistance as any)(data)),
    [dispatch],
  );

  useEffect(() => {
    if (expenseConfig?.computeDistanceWithWebService) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        () => getDistanceApi({fromCity, toCity}),
        delay,
      );
    }
  }, [
    delay,
    expenseConfig?.computeDistanceWithWebService,
    fromCity,
    getDistanceApi,
    toCity,
  ]);

  return (
    <FormIncrementInput
      title={title}
      style={style}
      onChange={onChange}
      defaultValue={defaultValue}
      decimalSpacer={I18n.t('Base_DecimalSpacer')}
      thousandSpacer={I18n.t('Base_ThousandSpacer')}
      readOnly={readonly}
      required={required}
    />
  );
};

const DistanceIncrement = (props: DistanceIncrementProps) => {
  return <DistanceIncrementAux {...props} />;
};

export default DistanceIncrement;
