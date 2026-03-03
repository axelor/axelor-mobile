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

import React, {useEffect} from 'react';
import {Picker} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {searchExpenseDraft} from '../../../features/expenseSlice';

const DraftExpensePickerAux = ({
  title = 'Hr_Expense',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);
  const {expenseDraftList} = useSelector(state => state.expense);

  useEffect(() => {
    dispatch(
      searchExpenseDraft({userId: user?.id, companyId: user.activeCompany?.id}),
    );
  }, [dispatch, user.activeCompany?.id, user?.id]);

  return (
    <Picker
      title={I18n.t(title)}
      defaultValue={defaultValue}
      listItems={expenseDraftList}
      labelField="expenseSeq"
      valueField="id"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
      isValueItem={true}
    />
  );
};

const DraftExpensePicker = ({
  title,
  defaultValue,
  onChange,
  readonly,
  required,
}) => {
  return (
    <DraftExpensePickerAux
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default DraftExpensePicker;
