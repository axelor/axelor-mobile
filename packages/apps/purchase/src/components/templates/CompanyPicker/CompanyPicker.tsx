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
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';

interface CompanyPickerProps {
  style?: any;
  company?: any;
  emptyValue?: boolean;
  onChange: (state: any) => void;
}

const CompanyPicker = ({
  style,
  company,
  onChange = () => {},
  emptyValue = true,
}: CompanyPickerProps) => {
  const I18n = useTranslator();

  const {user} = useSelector((state: any) => state.user);

  if (!Array.isArray(user?.companySet) || user.companySet.length <= 1) {
    return null;
  }

  return (
    <Picker
      placeholder={I18n.t('Purchase_Company')}
      style={style}
      defaultValue={company}
      listItems={user?.companySet}
      valueField="id"
      labelField="name"
      onValueChange={onChange}
      isValueItem
      emptyValue={emptyValue}
      translator={I18n.t}
    />
  );
};

export default CompanyPicker;
