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
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {FormIncrementInput} from '@axelor/aos-mobile-ui';

const DistanceIncrementAux = ({
  style,
  title = 'Hr_Distance',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
}) => {
  const I18n = useTranslator();

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
      style={style}
      onChange={handleChange}
      defaultValue={value}
      decimalSpacer={I18n.t('Base_DecimalSpacer')}
      thousandSpacer={I18n.t('Base_ThousandSpacer')}
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

export default DistanceIncrement;
