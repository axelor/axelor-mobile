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
import {searchExpenseToValidate} from '../../../features/expenseSlice';

const ExpenseWaitingValidationSearchBar = ({
  placeholderKey = 'Hr_Employee',
  defaultValue = '',
  onChange = () => {},
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  changeScreenAfter = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    expenseToValidateList,
    loadingExpenseToValidate,
    moreLoadingExpenseToValidate,
    isListEndExpenseToValidate,
  } = useSelector(state => state.expense);
  const {user} = useSelector(state => state.user);

  const fetchExpenseToValidateAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchExpenseToValidate({
          page: page,
          user: user,
          searchValue,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, user],
  );

  return (
    <AutoCompleteSearch
      objectList={expenseToValidateList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchExpenseToValidateAPI}
      displayValue={displayItemName}
      scanKeySearch={scanKey}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingExpenseToValidate}
      moreLoading={moreLoadingExpenseToValidate}
      isListEnd={isListEndExpenseToValidate}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      changeScreenAfter={changeScreenAfter}
    />
  );
};

export default ExpenseWaitingValidationSearchBar;
