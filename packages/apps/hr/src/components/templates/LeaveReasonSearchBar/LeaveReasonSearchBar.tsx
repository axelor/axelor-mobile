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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {fetchLeaveReason} from '../../../features/leaveSlice';

interface LeaveReasonSearchBarProps {
  placeholderKey?: string;
  defaultValue?: string;
  onChange: (leaveReason: any) => void;
}

const LeaveReasonSearchBar = ({
  placeholderKey = 'Hr_LeaveReason',
  defaultValue = null,
  onChange = () => {},
}: LeaveReasonSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    loadingLeaveReason,
    moreLoadingLeaveReason,
    isListEndLeaveReason,
    leaveReasonList,
  } = useSelector(state => state.hr_leave);

  const fetchLeaveReasonAPI = useCallback(
    ({searchValue, page = 0}) => {
      dispatch(
        (fetchLeaveReason as any)({
          searchValue,
          employeeId: user.employee.id,
          page,
        }),
      );
    },
    [dispatch, user.employee.id],
  );

  return (
    <AutoCompleteSearch
      objectList={leaveReasonList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchLeaveReasonAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      oneFilter={false}
      showDetailsPopup={true}
      isScrollViewContainer={true}
      loadingList={loadingLeaveReason}
      moreLoading={moreLoadingLeaveReason}
      isListEnd={isListEndLeaveReason}
      translator={I18n.t}
    />
  );
};

export default LeaveReasonSearchBar;
