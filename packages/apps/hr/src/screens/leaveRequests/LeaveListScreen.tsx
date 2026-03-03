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
  FilterContainer,
  useActiveFilter,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {LeaveActionCard, LeaveFilters} from '../../components';
import {
  fetchLeave,
  fetchLeaveToValidate,
  sendLeave,
  validateLeave,
} from '../../features/leaveSlice';
import {Leave} from '../../types';

const LeaveListScreen = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {activeFilter} = useActiveFilter();

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

  const fetchLeaveAPI = useCallback(
    (page = 0) => {
      dispatch(
        (fetchLeave as any)({
          userId: user?.id,
          selectedStatus,
          page,
          companyId: user.activeCompany?.id,
          filterDomain: activeFilter,
        }),
      );
    },
    [activeFilter, dispatch, selectedStatus, user.activeCompany?.id, user?.id],
  );

  const getActionParams = useCallback(
    (item: any) => ({
      leaveRequestId: item.id,
      version: item.version,
      userId: user?.id,
      user: user,
      selectedStatus,
      companyId: user.activeCompany?.id,
    }),
    [selectedStatus, user],
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

  const fetchLeaveToValidateAPI = useCallback(
    (page = 0) => {
      dispatch(
        (fetchLeaveToValidate as any)({
          user,
          page,
          companyId: user.activeCompany?.id,
          filterDomain: activeFilter,
        }),
      );
    },
    [activeFilter, dispatch, user],
  );

  const listToDisplay = useMemo(() => {
    if (mode === Leave.mode.myLeaves) {
      return {
        list: myLeaveList,
        loading: loadingMyLeave,
        moreLoading: moreLoadingMyLeave,
        isListEnd: isListEndMyLeave,
        functionApi: fetchLeaveAPI,
      };
    } else {
      return {
        list: leaveToValidateList,
        loading: loadingLeaveToValidate,
        moreLoading: moreLoadingLeaveToValidate,
        isListEnd: isListEndLeaveToValidate,
        functionApi: fetchLeaveToValidateAPI,
      };
    }
  }, [
    mode,
    myLeaveList,
    loadingMyLeave,
    moreLoadingMyLeave,
    isListEndMyLeave,
    fetchLeaveAPI,
    leaveToValidateList,
    loadingLeaveToValidate,
    moreLoadingLeaveToValidate,
    isListEndLeaveToValidate,
    fetchLeaveToValidateAPI,
  ]);

  return (
    <Screen removeSpaceOnTop={true}>
      <FilterContainer
        expandableFilter={false}
        fixedItems={
          <LeaveFilters
            mode={mode}
            onChangeMode={setMode}
            onChangeStatus={setSelectedStatus}
          />
        }
      />
      <ScrollList
        loadingList={listToDisplay.loading}
        data={listToDisplay.list}
        renderItem={({item}) => (
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
        fetchData={listToDisplay.functionApi}
        moreLoading={listToDisplay.moreLoading}
        isListEnd={listToDisplay.isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default LeaveListScreen;
