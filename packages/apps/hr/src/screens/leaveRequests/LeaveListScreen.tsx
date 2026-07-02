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

import React, {useMemo, useState} from 'react';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Screen} from '@axelor/aos-mobile-ui';
import {LeaveActionCard, LeaveFilters} from '../../components';
import {fetchLeave, fetchLeaveToValidate} from '../../features/leaveSlice';
import {Leave} from '../../types';

const LeaveListScreen = ({}) => {
  const I18n = useTranslator();

  const [mode, setMode] = useState(Leave.mode.myLeaves);
  const [selectedStatus, setSelectedStatus] = useState<any[]>();

  const {user} = useSelector(state => state.user);
  const {
    loadingMyLeave,
    moreLoadingMyLeave,
    isListEndMyLeave,
    myLeaveList,
    loadingLeaveToValidate,
    moreLoadingLeaveToValidate,
    isListEndLeaveToValidate,
    leaveToValidateList,
  } = useSelector(state => state.hr_leave);

  const sliceFunctionData = useMemo(
    () => ({
      user,
      userId: user?.id,
      companyId: user.activeCompany?.id,
      selectedStatus,
    }),
    [selectedStatus, user],
  );

  const listToDisplay = useMemo(() => {
    if (mode === Leave.mode.myLeaves) {
      return {
        list: myLeaveList,
        loading: loadingMyLeave,
        moreLoading: moreLoadingMyLeave,
        isListEnd: isListEndMyLeave,
        sliceFunction: fetchLeave,
      };
    } else {
      return {
        list: leaveToValidateList,
        loading: loadingLeaveToValidate,
        moreLoading: moreLoadingLeaveToValidate,
        isListEnd: isListEndLeaveToValidate,
        sliceFunction: fetchLeaveToValidate,
      };
    }
  }, [
    mode,
    myLeaveList,
    loadingMyLeave,
    moreLoadingMyLeave,
    isListEndMyLeave,
    leaveToValidateList,
    loadingLeaveToValidate,
    moreLoadingLeaveToValidate,
    isListEndLeaveToValidate,
  ]);

  return (
    <Screen removeSpaceOnTop>
      <SearchListView
        expandableFilter={false}
        topFixedItems={
          <LeaveFilters
            mode={mode}
            onChangeMode={setMode}
            onChangeStatus={setSelectedStatus}
          />
        }
        displaySearchBar={mode === Leave.mode.leavesToValidate}
        searchPlaceholder={I18n.t('Hr_Employee')}
        loading={listToDisplay.loading}
        moreLoading={listToDisplay.moreLoading}
        isListEnd={listToDisplay.isListEnd}
        list={listToDisplay.list}
        sliceFunction={listToDisplay.sliceFunction}
        sliceFunctionData={sliceFunctionData}
        renderListItem={({item}) => (
          <LeaveActionCard mode={mode} leave={item} />
        )}
      />
    </Screen>
  );
};

export default LeaveListScreen;
