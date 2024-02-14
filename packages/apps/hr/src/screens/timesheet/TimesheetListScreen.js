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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {HeaderContainer, Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {TimesheetDetailCard, TimesheetFilters} from '../../components';
import {
  fetchTimesheet,
  fetchTimesheetToValidate,
  updateTimesheetStatus,
} from '../../features/timesheetSlice';
import {Timesheet} from '../../types';

const TimesheetListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [mode, setMode] = useState(Timesheet.mode.personnal);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const {
    myTimesheetList,
    loadingMyTimesheet,
    moreLoadingMyTimesheet,
    isListEndMyTimesheet,
    timesheetToValidateList,
    loadingTimesheetToValidate,
    moreLoadingTimesheetToValidate,
    isListEndTimesheetToValidate,
  } = useSelector(state => state.timesheet);
  const {timesheet: timesheetConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchTimesheetToValidate({page: 0, user: user}));
  }, [dispatch, user]);

  const updateTimesheetStatusAPI = useCallback(
    (timesheet, toStatus) =>
      dispatch(
        updateTimesheetStatus({
          timesheetId: timesheet.id,
          version: timesheet.version,
          toStatus: toStatus,
          userId: user.id,
        }),
      ),
    [dispatch, user],
  );

  const fetchTimesheetAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTimesheet({userId: user?.id, page: page}));
    },
    [dispatch, user],
  );

  const fetchTimesheetToValidateAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTimesheetToValidate({page: page, user: user}));
    },
    [dispatch, user],
  );

  const listToDisplay = useMemo(() => {
    if (mode === Timesheet.mode.personnal) {
      return {
        list: myTimesheetList,
        loading: loadingMyTimesheet,
        moreLoading: moreLoadingMyTimesheet,
        isListEnd: isListEndMyTimesheet,
        functionApi: fetchTimesheetAPI,
      };
    } else {
      return {
        list: timesheetToValidateList,
        loading: loadingTimesheetToValidate,
        moreLoading: moreLoadingTimesheetToValidate,
        isListEnd: isListEndTimesheetToValidate,
        functionApi: fetchTimesheetToValidateAPI,
      };
    }
  }, [
    mode,
    moreLoadingMyTimesheet,
    moreLoadingTimesheetToValidate,
    myTimesheetList,
    fetchTimesheetAPI,
    fetchTimesheetToValidateAPI,
    isListEndMyTimesheet,
    isListEndTimesheetToValidate,
    loadingMyTimesheet,
    loadingTimesheetToValidate,
    timesheetToValidateList,
  ]);

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else {
        if (selectedStatus != null) {
          return list?.filter(
            item =>
              Timesheet.getStatus(timesheetConfig.needValidation, item) ===
              selectedStatus,
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus, timesheetConfig.needValidation],
  );

  const filteredList = useMemo(
    () => filterOnStatus(listToDisplay.list),
    [filterOnStatus, listToDisplay.list],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <TimesheetFilters
            onChangeStatus={setSelectedStatus}
            onChangeMode={setMode}
            mode={mode}
          />
        }
      />
      <ScrollList
        loadingList={listToDisplay.loading}
        data={filteredList}
        renderItem={({item}) => (
          <TimesheetDetailCard
            item={item}
            isValidationMode={mode === Timesheet.mode.validation}
            onPress={() =>
              navigation.navigate('TimesheetDetailsScreen', {
                timesheetId: item.id,
              })
            }
            onSend={() => updateTimesheetStatusAPI(item, 'confirm')}
            onValidate={() => updateTimesheetStatusAPI(item, 'validate')}
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

export default TimesheetListScreen;
