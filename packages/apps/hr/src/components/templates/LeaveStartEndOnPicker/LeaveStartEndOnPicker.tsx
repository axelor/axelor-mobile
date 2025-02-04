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
import {useTranslator, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';

interface LeaveStartEndPickerProps {
  mode?: 'startOn' | 'endOn';
  title?: string;
  defaultValue?: number | null;
  onChange?: (value: number) => void;
  readonly?: boolean;
  required?: boolean;
}

const LeaveStartEndOnPicker = ({
  mode = 'startOn',
  title,
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: LeaveStartEndPickerProps) => {
  const I18n = useTranslator();
  const {LeaveRequest} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const listItems = useMemo(() => {
    if (mode === 'startOn') {
      return getSelectionItems(LeaveRequest?.startOnSelect);
    }
    return getSelectionItems(LeaveRequest?.endOnSelect);
  }, [mode, getSelectionItems, LeaveRequest]);

  return (
    <Picker
      title={title || I18n.t(mode === 'startOn' ? 'Hr_StartOn' : 'Hr_EndOn')}
      defaultValue={defaultValue}
      listItems={listItems}
      labelField="title"
      valueField="key"
      emptyValue={false}
      onValueChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default LeaveStartEndOnPicker;
