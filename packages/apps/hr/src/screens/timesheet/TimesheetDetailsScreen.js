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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  AnomalyList,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollList, Screen} from '@axelor/aos-mobile-ui';
import {
  TimeDetailCard,
  TimesheetDetailsButtons,
  TimesheetHeader,
} from '../../components';
import {fetchTimesheetById} from '../../features/timesheetSlice';
import {
  deleteTimesheetLine,
  fetchTimesheetLine,
} from '../../features/timesheetLineSlice';
import {Time, Timesheet as TimesheetType} from '../../types';

const TimesheetDetailsScreen = ({navigation, route}) => {
  const {timesheetId, isManualCreation} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
  });
  const {Timesheet} = useTypes();

  const {timesheet} = useSelector(state => state.timesheet);
  const {timesheet: timesheetConfig} = useSelector(state => state.appConfig);
  const {loadingTimesheetLine, moreLoading, isListEnd, timesheetLineList} =
    useSelector(state => state.timesheetLine);

  const _statusSelect = useMemo(() => {
    return TimesheetType.getStatus(timesheetConfig?.needValidation, timesheet);
  }, [timesheet, timesheetConfig]);

  const isTimesheetLineListEmpty = useMemo(
    () => timesheetLineList == null || timesheetLineList.length === 0,
    [timesheetLineList],
  );

  useEffect(() => {
    dispatch(fetchTimesheetById({timesheetId: timesheetId}));
  }, [dispatch, timesheetId]);

  const fetchTimesheetLineAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTimesheetLine({timesheetId: timesheet?.id, page: page}));
    },
    [dispatch, timesheet],
  );

  if (timesheet?.id !== timesheetId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <TimesheetDetailsButtons
          timesheet={timesheet}
          statusSelect={_statusSelect}
          isEmpty={isTimesheetLineListEmpty}
          isManualCreation={isManualCreation}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <TimesheetHeader timesheet={timesheet} statusSelect={_statusSelect} />
        }
      />
      <AnomalyList objectName="timesheet" objectId={timesheet.id} />
      <ScrollList
        loadingList={loadingTimesheetLine}
        data={timesheetLineList}
        renderItem={({item}) => (
          <TimeDetailCard
            mode={Time.mode.Timesheet}
            statusSelect={Timesheet?.statusSelect.Draft}
            project={item.project?.name}
            task={item.projectTask?.name}
            manufOrder={item.manufOrder?.name}
            operation={item.operationOrder?.name}
            comments={item.comments}
            date={item.date}
            duration={item.duration}
            showTrash={canDelete}
            durationUnit={timesheet.timeLoggingPreferenceSelect}
            isActions={_statusSelect === Timesheet?.statusSelect.Draft}
            canEdit={!readonly}
            onEdit={() =>
              navigation.navigate('TimesheetLineFormScreen', {
                timesheetId: timesheetId,
                timesheetLine: item,
              })
            }
            onDelete={() =>
              dispatch(
                deleteTimesheetLine({
                  timesheetId: timesheetId,
                  timesheetLineId: item.id,
                }),
              )
            }
          />
        )}
        fetchData={fetchTimesheetLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default TimesheetDetailsScreen;
