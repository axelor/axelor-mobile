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

import React, {useCallback, useState} from 'react';
import {
  ISODateTimeToDate,
  useDispatch,
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

const TimerListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const {timerList, loadingTimer, moreLoading, isListEnd} = useSelector(
    state => state.hr_timer,
  );
  const {userId} = useSelector(state => state.auth);

  const fetchTimerAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTimer({userId: userId, page: page}));
    },
    [dispatch, userId],
  );

  return (
    <Screen
      fixedItems={<TimerDeclareButton setIsAlertVisible={setIsAlertVisible} />}>
      <GroupByScrollList
        loadingList={loadingTimer}
        data={timerList}
        renderItem={({item}) => (
          <TimeDetailCard
            statusSelect={item.statusSelect}
            project={item.project?.name}
            task={item.projectTask?.name}
            comments={item.comments}
            date={item.startDateTime}
            duration={formatSecondsToHours(item.duration)}
            durationUnit={'hours'}
            onEdit={() =>
              navigation.navigate('TimerFormScreen', {
                idTimerToUpdate: item.id,
              })
            }
            onDelete={() =>
              dispatch(deleteTimer({timerId: item.id, userId: userId}))
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
          <DateSeparator fetchNumberOfItems={getNumberTimerByDateApi} />
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
