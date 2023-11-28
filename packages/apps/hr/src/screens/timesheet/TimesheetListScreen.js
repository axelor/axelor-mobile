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

import React, {useCallback} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {TimesheetDetailCard} from '../../components';
import {fetchTimesheet} from '../../features/timesheetSlice';

const TimesheetListScreen = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {timesheetList, loadingTimesheet, moreLoading, isListEnd} = useSelector(
    state => state.timesheet,
  );
  const {userId} = useSelector(state => state.auth);

  const fetchTimesheetAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTimesheet({userId: userId, page: page}));
    },
    [dispatch, userId],
  );

  return (
    <Screen>
      <ScrollList
        loadingList={loadingTimesheet}
        data={timesheetList}
        renderItem={({item}) => (
          <TimesheetDetailCard
            statusSelect={item.statusSelect}
            isCompleted={false}
            startDate={item.fromDate}
            endDate={item.toDate}
            company={item.company.name}
            totalDuration={item.periodTotal}
            onPress={() => console.log('Card pressed.')}
          />
        )}
        fetchData={fetchTimesheetAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default TimesheetListScreen;
