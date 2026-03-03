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
import {useTranslator, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {CustomComponentProps} from '../../../utils';

const TypePicker = ({
  title = 'Intervention_Type',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: CustomComponentProps) => {
  const I18n = useTranslator();
  const {Equipment} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const equipmentTypeList = useMemo(
    () => getSelectionItems(Equipment?.typeSelect),
    [Equipment?.typeSelect, getSelectionItems],
  );

  return (
    <Picker
      title={I18n.t(title)}
      defaultValue={defaultValue}
      listItems={equipmentTypeList}
      labelField="title"
      valueField="key"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
    />
  );
};

export default TypePicker;
