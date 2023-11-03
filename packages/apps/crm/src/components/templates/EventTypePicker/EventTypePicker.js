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
import {useTranslator} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';
import {EventType} from '../../../types';

const EventTypePicker = ({
  style = null,
  title = 'Crm_Type',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();

  return (
    <Picker
      style={style}
      title={I18n.t(title)}
      listItems={EventType.getCategoryList(I18n)}
      valueField="key"
      labelField="title"
      defaultValue={defaultValue}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
    />
  );
};

export default EventTypePicker;
