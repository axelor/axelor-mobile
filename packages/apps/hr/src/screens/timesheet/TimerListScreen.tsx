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

import React, {useCallback, useState} from 'react';
import {
  ISODateTimeToDate,
  useActiveFilter,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {GroupByScrollList, Screen} from '@axelor/aos-mobile-ui';
import {
  DateSeparator,
  TimeDetailCard,
  TimerDeclareButton,
  TimerListAlert,
} from '../../components';
import {deleteTimer, fetchTimer} from '../../features/timerSlice';
import {formatSecondsToHours} from '../../utils';
import {getNumberTimerByDateApi} from '../../api';
import {Time} from '../../types';

const TimerListScreen = ({navigation}: any) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {activeFilter} = useActiveFilter();
  const {canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TSTimer',
  });

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const {userId} = useSelector(state => state.auth);
  const {timerList, loadingTimer, moreLoading, isListEnd} = useSelector(
    state => state.hr_timer,
  );

  const fetchTimerAPI = useCallback(
    (page = 0) => {
      dispatch((fetchTimer as any)({userId, page, filterDomain: activeFilter}));
    },
    [activeFilter, dispatch, userId],
  );

  return (
    <Screen
      fixedItems={<TimerDeclareButton setIsAlertVisible={setIsAlertVisible} />}>
      <GroupByScrollList
        loadingList={loadingTimer}
        data={timerList}
        renderItem={({item}) => (
          <TimeDetailCard
            mode={Time.mode.Timer}
            statusSelect={item.statusSelect}
            project={item.project?.name}
            task={item.projectTask?.name}
            comments={item.comments}
            date={item.startDateTime}
            duration={formatSecondsToHours(item.duration)}
            durationUnit="hours"
            canEdit={!readonly}
            onEdit={() =>
              navigation.navigate('TimerFormScreen', {idTimerToUpdate: item.id})
            }
            showTrash={canDelete}
            onDelete={() =>
              dispatch((deleteTimer as any)({timerId: item.id, userId}))
            }
          />
        )}
        fetchData={fetchTimerAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        separatorCondition={(prevItem, currentItem) =>
          ISODateTimeToDate(prevItem.startDateTime) >
          ISODateTimeToDate(currentItem.startDateTime)
        }
        fetchTopIndicator={currentItem => ({
          title: ISODateTimeToDate(currentItem.startDateTime),
        })}
        customTopSeparator={
          <DateSeparator fetchNumberOfItems={getNumberTimerByDateApi as any} />
        }
      />
      <TimerListAlert
        isAlertVisible={isAlertVisible}
        setIsAlertVisible={setIsAlertVisible}
      />
    </Screen>
  );
};

export default TimerListScreen;
