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

import React, {useMemo} from 'react';
import {Picker} from '@axelor/aos-mobile-ui';
import {useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

interface GravityPickerProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange: (item: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const GravityPickerAux = ({
  style,
  title = 'Quality_Gravity',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
}: GravityPickerProps) => {
  const {QualityImprovement} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const gravityList = useMemo(
    () => getSelectionItems(QualityImprovement?.gravityTypeSelect),
    [QualityImprovement?.gravityTypeSelect, getSelectionItems],
  );

  return (
    <Picker
      style={style}
      title={title}
      placeholder={title}
      defaultValue={defaultValue}
      listItems={gravityList}
      labelField="title"
      valueField="value"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
      isValueItem={false}
    />
  );
};

const GravityPicker = (props: GravityPickerProps) => {
  return <GravityPickerAux {...props} />;
};

export default GravityPicker;
