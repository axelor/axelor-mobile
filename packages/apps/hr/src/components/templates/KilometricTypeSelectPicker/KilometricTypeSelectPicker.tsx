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

import React from 'react';
import {Picker} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';

interface KilometricTypeSelectPickerProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  required?: boolean;
}

const KilometricTypeSelectPickerAux = ({
  style,
  title = 'Hr_KilometricTypeSelect',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
}: KilometricTypeSelectPickerProps) => {
  const I18n = useTranslator();

  const kilomectricTypeselectList =
    ExpenseLine.getKilomectricTypeSelectList(I18n);

  return (
    <Picker
      style={style}
      title={title}
      defaultValue={defaultValue}
      listItems={kilomectricTypeselectList}
      labelField="title"
      valueField="key"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
    />
  );
};

const KilometricTypeSelectPicker = (props: KilometricTypeSelectPickerProps) => {
  return <KilometricTypeSelectPickerAux {...props} />;
};

export default KilometricTypeSelectPicker;
