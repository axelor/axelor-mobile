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
import {Picker} from '@axelor/aos-mobile-ui';
import {useCivilityList} from '../../../hooks/use-civility-list';

const CivilityPicker = ({
  style = null,
  title = 'Crm_Civility',
  defaultValue = null,
  onChange = console.log,
  readonly = false,
  required = false,
}) => {
  const {civilityList} = useCivilityList();

  return (
    <Picker
      style={style}
      title={title}
      defaultValue={defaultValue}
      listItems={civilityList}
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

export default CivilityPicker;
