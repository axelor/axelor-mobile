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

import React from 'react';
import {SwitchCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

const BillableSwitchCardAux = ({
  style = null,
  title = 'Hr_ToInvoice',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
}) => {
  const I18n = useTranslator();

  return (
    <SwitchCard
      style={style}
      defaultValue={defaultValue}
      title={I18n.t(title)}
      onToggle={onChange}
      readonly={readonly}
    />
  );
};

const BillableSwitchCard = ({
  style = null,
  title = 'Hr_ToInvoice',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
}) => {
  return (
    <BillableSwitchCardAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
    />
  );
};

export default BillableSwitchCard;
