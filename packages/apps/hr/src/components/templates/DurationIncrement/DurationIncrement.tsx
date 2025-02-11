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

import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FormIncrementInput} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

interface DurationIncrementProps {
  title?: string;
  defaultValue?: string;
  onChange?: (value: number) => void;
  readonly?: boolean;
  required?: boolean;
}

const DurationIncrementAux = ({
  title,
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: DurationIncrementProps) => {
  const I18n = useTranslator();

  const [value, setValue] = useState(defaultValue);

  const {duration} = useSelector(state => state.hr_leave);

  useEffect(() => {
    if (duration != null) {
      setValue(Number(duration) as any);
    }
  }, [duration]);

  return (
    <FormIncrementInput
      defaultValue={value}
      onChange={onChange}
      title={title}
      readOnly={readonly}
      required={required}
      style={styles.input}
      decimalSpacer={I18n.t('Base_DecimalSpacer')}
      thousandSpacer={I18n.t('Base_ThousandSpacer')}
    />
  );
};

const DurationIncrement = ({
  title,
  defaultValue,
  onChange,
  readonly,
  required,
}) => {
  return (
    <DurationIncrementAux
      defaultValue={defaultValue}
      onChange={onChange}
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

export default DurationIncrement;
