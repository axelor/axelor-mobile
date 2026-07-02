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
import {useTranslator, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';

interface TicketPriorityPickerProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (item: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const TicketPriorityPicker = ({
  style,
  title = 'Helpdesk_Priority',
  defaultValue,
  onChange,
  required = false,
  readonly = false,
}: TicketPriorityPickerProps) => {
  const I18n = useTranslator();
  const {Ticket} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const priorityList = useMemo(
    () => getSelectionItems(Ticket?.prioritySelect),
    [Ticket?.prioritySelect, getSelectionItems],
  );

  return (
    <Picker
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      defaultValue={defaultValue}
      listItems={priorityList}
      onValueChange={onChange!}
      labelField="title"
      valueField="value"
      required={required}
      readonly={readonly}
    />
  );
};

export default TicketPriorityPicker;
