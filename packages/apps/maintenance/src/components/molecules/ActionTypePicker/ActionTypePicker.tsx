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

import React, {useMemo} from 'react';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';

interface ActionTypePickerProps {
  style?: any;
  title?: string;
  defaultValue?: number;
  onChange: (value: number) => void;
  required?: boolean;
  readonly?: boolean;
  showTitle?: boolean;
}

const ActionTypePicker = ({
  style,
  title = 'Maintenance_RequestActionType',
  defaultValue,
  onChange,
  required = false,
  readonly = false,
  showTitle = true,
}: ActionTypePickerProps) => {
  const I18n = useTranslator();
  const {MaintenanceRequest} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const statusList = useMemo(
    () => getSelectionItems(MaintenanceRequest?.actionSelect),
    [MaintenanceRequest?.actionSelect, getSelectionItems],
  );

  return (
    <Picker
      style={style}
      title={showTitle && I18n.t(title)}
      placeholder={I18n.t(title)}
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

export default ActionTypePicker;
