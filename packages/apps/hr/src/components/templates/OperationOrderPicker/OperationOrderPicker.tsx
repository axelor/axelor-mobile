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

import React from 'react';
import {useSelector} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';

interface OperationOrderPickerProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const OperationOrderPickerAux = ({
  style = null,
  title = 'Hr_OperationOrder',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: OperationOrderPickerProps) => {
  const {operationOrderList} = useSelector((state: any) => state.hr_manufOrder);

  return (
    <Picker
      style={style}
      title={title}
      defaultValue={defaultValue}
      listItems={operationOrderList}
      labelField="name"
      valueField="id"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
      isValueItem={false}
    />
  );
};

const OperationOrderPicker = ({
  style = null,
  title = 'Hr_OperationOrder',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: OperationOrderPickerProps) => {
  return (
    <OperationOrderPickerAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default OperationOrderPicker;
