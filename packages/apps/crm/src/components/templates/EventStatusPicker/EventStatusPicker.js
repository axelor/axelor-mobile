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
import {useTranslator, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';

const EventStatusPicker = ({
  style = null,
  title = 'Crm_Status',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const {Event} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const statusList = useMemo(
    () => getSelectionItems(Event?.statusSelect),
    [Event?.statusSelect, getSelectionItems],
  );

  return (
    <Picker
      style={style}
      title={I18n.t(title)}
      listItems={statusList}
      defaultValue={defaultValue}
      valueField="key"
      labelField="title"
      onValueChange={onChange}
      required={required}
      readonly={readonly}
    />
  );
};

export default EventStatusPicker;
