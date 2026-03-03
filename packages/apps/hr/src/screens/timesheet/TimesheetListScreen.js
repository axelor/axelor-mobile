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
  FilterContainer,
  headerActionsProvider,
  useActiveFilter,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Screen, ScrollList, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  TimesheetCreationAlert,
  TimesheetDetailCard,
  TimesheetFilters,
} from '../../components';
import {
  fetchTimesheet,
  fetchTimesheetToValidate,
  updateTimesheetStatus,
} from '../../features/timesheetSlice';
import {Timesheet} from '../../types';

const TimesheetListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {activeFilter} = useActiveFilter();
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

  useEffect(() => {
    dispatch(
      fetchTimesheetToValidate({
        page: 0,
        user: user,
        companyId: user.activeCompany?.id,
      }),
    );
  }, [dispatch, user]);

  const updateTimesheetStatusAPI = useCallback(
    (timesheet, toStatus) =>
      dispatch(
        updateTimesheetStatus({
          timesheetId: timesheet.id,
          version: timesheet.version,
          toStatus: toStatus,
          user: user,
        }),
      ),
    [dispatch, user],
  );

  const fetchTimesheetAPI = useCallback(
    (page = 0) => {
      dispatch(
        fetchTimesheet({
          userId: user.id,
          page: page,
          companyId: user.activeCompany?.id,
          filterDomain: activeFilter,
        }),
      );
    },
    [activeFilter, dispatch, user.activeCompany?.id, user.id],
  );

  const fetchTimesheetToValidateAPI = useCallback(
    (page = 0) => {
      dispatch(
        fetchTimesheetToValidate({
          page: page,
          user: user,
          companyId: user.activeCompany?.id,
          filterDomain: activeFilter,
        }),
      );
    },
    [activeFilter, dispatch, user],
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
  }, [Colors, dispatch, I18n, mobileSettings, navigation, canCreate]);

  return (
    <Screen removeSpaceOnTop={true}>
      <FilterContainer
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
            isActions={!readonly}
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
      <TimesheetCreationAlert
        isOpen={isCreationAlertOpen}
        onCancel={() => setIsCreationAlertOpen(false)}
      />
    </Screen>
  );
};

export default TimesheetListScreen;
