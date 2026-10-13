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

import React, {useCallback, useMemo, useState} from 'react';
import {
  SearchListView,
  useDispatch,
  useNavigation,
  useSelector,
} from '@axelor/aos-mobile-core';
import {Screen} from '@axelor/aos-mobile-ui';
import {LeaveActionCard, LeaveFilters} from '../../components';
import {
  fetchLeave,
  fetchLeaveToValidate,
  sendLeave,
  validateLeave,
} from '../../features/leaveSlice';
import {Leave} from '../../types';

const LeaveListScreen = ({route}: any) => {
  const {leaveIds} = route?.params ?? {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [mode, setMode] = useState(Leave.mode.myLeaves);
  const [selectedStatus, setSelectedStatus] = useState(null);

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

  const getActionParams = useCallback(
    (item: any) => ({
      leaveRequestId: item.id,
      version: item.version,
      userId: user?.id,
      user: user,
      selectedStatus,
      leaveIds,
      companyId: user.activeCompany?.id,
    }),
    [leaveIds, selectedStatus, user],
  );

  const sendLeaveAPI = useCallback(
    (item: any) => {
      dispatch((sendLeave as any)(getActionParams(item)));
    },
    [dispatch, getActionParams],
  );

  const validateLeaveApi = useCallback(
    (item: any) => {
      dispatch((validateLeave as any)(getActionParams(item)));
    },
    [dispatch, getActionParams],
  );

  const listToDisplay = useMemo(() => {
    if (mode === Leave.mode.myLeaves) {
      return {
        list: myLeaveList,
        loading: loadingMyLeave,
        moreLoading: moreLoadingMyLeave,
        isListEnd: isListEndMyLeave,
        sliceFunction: fetchLeave,
        sliceFunctionData: {
          userId: user?.id,
          selectedStatus,
          leaveIds,
          companyId: user.activeCompany?.id,
        },
      };
    } else {
      return {
        list: leaveToValidateList,
        loading: loadingLeaveToValidate,
        moreLoading: moreLoadingLeaveToValidate,
        isListEnd: isListEndLeaveToValidate,
        sliceFunction: fetchLeaveToValidate,
        sliceFunctionData: {
          user,
          companyId: user.activeCompany?.id,
        },
      };
    }
  }, [
    mode,
    myLeaveList,
    loadingMyLeave,
    moreLoadingMyLeave,
    isListEndMyLeave,
    user,
    selectedStatus,
    leaveIds,
    leaveToValidateList,
    loadingLeaveToValidate,
    moreLoadingLeaveToValidate,
    isListEndLeaveToValidate,
  ]);

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={listToDisplay.list}
        loading={listToDisplay.loading}
        moreLoading={listToDisplay.moreLoading}
        isListEnd={listToDisplay.isListEnd}
        sliceFunction={listToDisplay.sliceFunction}
        sliceFunctionData={listToDisplay.sliceFunctionData}
        displaySearchBar={false}
        expandableFilter={false}
        fixedItems={
          <LeaveFilters
            mode={mode}
            onChangeMode={setMode}
            onChangeStatus={setSelectedStatus}
          />
        }
        renderListItem={({item}) => (
          <LeaveActionCard
            mode={mode}
            leave={item}
            onPress={() =>
              navigation.navigate('LeaveDetailsScreen', {leaveId: item.id})
            }
            onEdit={() =>
              navigation.navigate('LeaveFormScreen', {leaveId: item.id})
            }
            onSend={() => sendLeaveAPI(item)}
            onValidate={() => validateLeaveApi(item)}
          />
        )}
      />
    </Screen>
  );
};

export default LeaveListScreen;
