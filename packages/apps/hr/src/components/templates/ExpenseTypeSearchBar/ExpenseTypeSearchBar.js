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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchExpenseType} from '../../../features/expenseTypeSlice';

const ExpenseTypeSearchBarAux = ({
  style = null,
  title = 'Hr_ExpenseType',
  defaultValue = null,
  onChange = () => {},
  required = true,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    expenseTypeList,
    loadingExpenseType,
    moreLoadingExpenseType,
    isListEndExpenseType,
  } = useSelector(state => state.expenseType);
  const {user} = useSelector(state => state.user);

  const searchExpenseTypeAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchExpenseType({
          page,
          searchValue,
          user,
        }),
      );
    },
    [dispatch, user],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={expenseTypeList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchExpenseTypeAPI}
      displayValue={displayItemName}
      placeholder={I18n.t('Hr_ExpenseType')}
      showDetailsPopup={true}
      loadingList={loadingExpenseType}
      moreLoading={moreLoadingExpenseType}
      isListEnd={isListEndExpenseType}
      navigate={false}
      oneFilter={false}
      isFocus={false}
    />
  );
};

const ExpenseTypeSearchBar = ({
  style = null,
  title = 'Hr_ExpenseType',
  defaultValue = null,
  onChange = () => {},
  required = true,
  readonly = false,
}) => {
  return (
    <ExpenseTypeSearchBarAux
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
      title={title}
      required={required}
      readonly={readonly}
    />
  );
};

export default ExpenseTypeSearchBar;
