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

import React, {useCallback} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {TimeDetailCard, TimerDeclareButton} from '../../components';
import {fetchTimer} from '../../features/timerSlice';

const TimerListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

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
    <Screen fixedItems={<TimerDeclareButton />}>
      <ScrollList
        loadingList={loadingTimer}
        data={timerList}
        renderItem={({item}) => (
          <TimeDetailCard
            statusSelect={item.statusSelect}
            project={item.project?.name}
            task={item.projectTask?.name}
            comments={item.comments}
            date={item.startDateTime}
            duration={item.duration}
            durationUnit={'hours'}
            onEdit={() =>
              navigation.navigate('TimerFormScreen', {
                timer: item,
              })
            }
          />
        )}
        fetchData={fetchTimerAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default TimerListScreen;
