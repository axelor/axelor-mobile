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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  headerActionsProvider,
  SearchListView,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  TimesheetCreationAlert,
  TimesheetDetailCard,
  TimesheetFilters,
} from '../../components';
import {
  fetchTimesheet,
  fetchTimesheetToValidate,
} from '../../features/timesheetSlice';
import {Timesheet} from '../../types';

const TimesheetListScreen = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {canCreate, readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.Timesheet',
  });

  const [mode, setMode] = useState(Timesheet.mode.personnal);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isCreationAlertOpen, setIsCreationAlertOpen] = useState(false);

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
  const {mobileSettings, timesheet: timesheetConfig} = useSelector(
    state => state.appConfig,
  );
  const {user} = useSelector(state => state.user);

  const sliceFunctionData = useMemo(
    () => ({
      user,
      userId: user.id,
      companyId: user.activeCompany?.id,
    }),
    [user],
  );

  useEffect(() => {
    dispatch(
      (fetchTimesheetToValidate as any)({
        page: 0,
        ...sliceFunctionData,
      }),
    );
  }, [dispatch, sliceFunctionData]);

  const listToDisplay = useMemo(() => {
    if (mode === Timesheet.mode.personnal) {
      return {
        list: myTimesheetList,
        loading: loadingMyTimesheet,
        moreLoading: moreLoadingMyTimesheet,
        isListEnd: isListEndMyTimesheet,
        sliceFunction: fetchTimesheet,
      };
    } else {
      return {
        list: timesheetToValidateList,
        loading: loadingTimesheetToValidate,
        moreLoading: moreLoadingTimesheetToValidate,
        isListEnd: isListEndTimesheetToValidate,
        sliceFunction: fetchTimesheetToValidate,
      };
    }
  }, [
    mode,
    moreLoadingMyTimesheet,
    moreLoadingTimesheetToValidate,
    myTimesheetList,
    isListEndMyTimesheet,
    isListEndTimesheetToValidate,
    loadingMyTimesheet,
    loadingTimesheetToValidate,
    timesheetToValidateList,
  ]);

  const filterOnStatus = useCallback(
    (list: any[]) => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else {
        if (selectedStatus != null) {
          return list?.filter(
            item =>
              Timesheet.getStatus(timesheetConfig?.needValidation, item) ===
              selectedStatus,
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus, timesheetConfig?.needValidation],
  );

  const filteredList = useMemo(
    () => filterOnStatus(listToDisplay.list),
    [filterOnStatus, listToDisplay.list],
  );

  useEffect(() => {
    headerActionsProvider.registerModel('hr_timesheets_list', {
      model: 'com.axelor.apps.hr.db.Timesheet',
      actions: [
        {
          key: 'newTimesheet',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Hr_CreateTimesheet'),
          iconColor: Colors.primaryColor.background,
          hideIf:
            !mobileSettings?.isManualCreationOfTimesheetAllowed || !canCreate,
          onPress: () => setIsCreationAlertOpen(true),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, mobileSettings, canCreate]);

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        expandableFilter={false}
        topFixedItems={
          <TimesheetFilters
            onChangeStatus={setSelectedStatus}
            onChangeMode={setMode}
            mode={mode}
          />
        }
        displaySearchBar={mode === Timesheet.mode.validation}
        searchPlaceholder={I18n.t('Hr_Employee')}
        loading={listToDisplay.loading}
        moreLoading={listToDisplay.moreLoading}
        isListEnd={listToDisplay.isListEnd}
        list={filteredList}
        sliceFunction={listToDisplay.sliceFunction}
        sliceFunctionData={sliceFunctionData}
        renderListItem={({item}) => (
          <TimesheetDetailCard
            item={item}
            isValidationMode={mode === Timesheet.mode.validation}
            isActions={!readonly}
          />
        )}
      />
      <TimesheetCreationAlert
        isOpen={isCreationAlertOpen}
        onCancel={() => setIsCreationAlertOpen(false)}
      />
    </Screen>
  );
};

export default TimesheetListScreen;
