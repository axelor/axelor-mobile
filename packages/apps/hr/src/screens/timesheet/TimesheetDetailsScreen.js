/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollList, Screen} from '@axelor/aos-mobile-ui';
import {
  TimeDetailCard,
  TimesheetDetailsButtons,
  TimesheetHeader,
} from '../../components';
import {fetchTimesheetById} from '../../features/timesheetSlice';
import {fetchTimesheetLine} from '../../features/timesheetLineSlice';
import {Time, Timesheet} from '../../types';

const TimesheetDetailsScreen = ({route}) => {
  const {timesheetId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {timesheet} = useSelector(state => state.timesheet);
  const {timesheet: timesheetConfig} = useSelector(state => state.appConfig);
  const {loadingTimesheetLine, moreLoading, isListEnd, timesheetLineList} =
    useSelector(state => state.timesheetLine);

  const _statusSelect = useMemo(() => {
    return Timesheet.getStatus(timesheetConfig.needValidation, timesheet);
  }, [timesheet, timesheetConfig]);

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
      fixedItems={<TimesheetDetailsButtons statusSelect={_statusSelect} />}>
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
            statusSelect={Time.statusSelect.Draft}
            project={item.project?.name}
            task={item.projectTask?.name}
            manufOrder={item.manufOrder?.name}
            operation={item.operationOrder?.name}
            comments={item.comments}
            date={item.date}
            duration={item.duration}
            durationUnit={timesheet.timeLoggingPreferenceSelect}
            isActions={_statusSelect === Timesheet.statusSelect.Draft}
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
