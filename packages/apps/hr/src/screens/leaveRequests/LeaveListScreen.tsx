/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {LeaveActionCard, LeaveFilters} from '../../components';
import {fetchLeave, fetchLeaveToValidate} from '../../features/leaveSlice';
import {Leave} from '../../types';

const LeaveListScreen = ({}) => {
  const I18n = useTranslator();
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

  const fetchLeaveAPI = useCallback(
    (page = 0) => {
      dispatch((fetchLeave as any)({userId: user?.id, selectedStatus, page}));
    },
    [dispatch, selectedStatus, user?.id],
  );

  const fetchLeaveToValidateAPI = useCallback(
    (page = 0) => {
      dispatch((fetchLeaveToValidate as any)({user, page}));
    },
    [dispatch, user],
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
      <HeaderContainer
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
            onSend={() => console.log('Card send button pressed.')}
            onValidate={() => console.log('Card validate button pressed.')}
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
