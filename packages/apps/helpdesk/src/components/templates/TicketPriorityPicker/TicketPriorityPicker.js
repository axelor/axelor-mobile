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

import React from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Picker, useThemeColor} from '@axelor/aos-mobile-ui';
import {Ticket} from '../../../types';

const TicketPriorityPicker = ({
  style = null,
  title = 'Helpdesk_Priority',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <Picker
      style={style}
      title={I18n.t(title)}
      defaultValue={defaultValue}
      listItems={Ticket.getPriorityList(Colors, I18n)}
      onValueChange={onChange}
      labelField="title"
      valueField="key"
      required={required}
      readonly={readonly}
    />
  );
};

export default TicketPriorityPicker;
