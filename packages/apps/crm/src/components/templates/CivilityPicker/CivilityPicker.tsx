/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useTypes} from '@axelor/aos-mobile-core';

const CivilityPicker = ({
  style,
  title = 'Crm_Civility',
  defaultValue = null,
  onChange,
  readonly = false,
  required = false,
}: {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (item: any) => void;
  readonly?: boolean;
  required?: boolean;
}) => {
  const {Partner} = useTypes();

  const civilityList = useMemo(
    () => Partner?.titleSelect.list,
    [Partner?.titleSelect],
  );

  return (
    <Picker
      style={style}
      title={title}
      defaultValue={Number(defaultValue)}
      listItems={civilityList}
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

export default CivilityPicker;
