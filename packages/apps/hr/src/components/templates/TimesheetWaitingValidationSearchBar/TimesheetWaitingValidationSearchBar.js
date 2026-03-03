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
import {fetchTimesheetToValidate} from '../../../features/timesheetSlice';

const TimesheetWaitingValidationSearchBar = ({
  placeholderKey = 'Hr_Employee',
  defaultValue = '',
  onChange = () => {},
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    timesheetToValidateList,
    loadingTimesheetToValidate,
    moreLoadingTimesheetToValidate,
    isListEndTimesheetToValidate,
  } = useSelector(state => state.timesheet);
  const {user} = useSelector(state => state.user);

  const fetchTimesheetToValidateAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        fetchTimesheetToValidate({
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
      objectList={timesheetToValidateList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchTimesheetToValidateAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      oneFilter={true}
      loadingList={loadingTimesheetToValidate}
      moreLoading={moreLoadingTimesheetToValidate}
      isListEnd={isListEndTimesheetToValidate}
    />
  );
};

export default TimesheetWaitingValidationSearchBar;
