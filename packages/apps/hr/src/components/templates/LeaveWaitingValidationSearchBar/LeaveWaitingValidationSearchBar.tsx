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
import {fetchLeaveToValidate} from '../../../features/leaveSlice';

interface LeaveWaitingValidationSearchBarProps {
  placeholderKey?: string;
  defaultValue?: string;
  onChange?: () => void;
}

const LeaveWaitingValidationSearchBar = ({
  placeholderKey = 'Hr_Employee',
  defaultValue = '',
  onChange,
}: LeaveWaitingValidationSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    loadingLeaveToValidate,
    moreLoadingLeaveToValidate,
    isListEndLeaveToValidate,
    leaveToValidateList,
  } = useSelector(state => state.hr_leave);

  const fetchLeaveToValidateAPI = useCallback(
    ({searchValue, page = 0}) => {
      dispatch(
        (fetchLeaveToValidate as any)({
          searchValue,
          user,
          page,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, user],
  );

  return (
    <AutoCompleteSearch
      objectList={leaveToValidateList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchLeaveToValidateAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      oneFilter={true}
      loadingList={loadingLeaveToValidate}
      moreLoading={moreLoadingLeaveToValidate}
      isListEnd={isListEndLeaveToValidate}
    />
  );
};

export default LeaveWaitingValidationSearchBar;
