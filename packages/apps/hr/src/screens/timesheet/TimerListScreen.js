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

import React, {useCallback, useEffect} from 'react';
import {
  headerActionsProvider,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Screen, ScrollList, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimeDetailCard, TimerDeclareButton} from '../../components';
import {fetchTimer} from '../../features/timerSlice';

const TimerListScreen = ({}) => {
  const Colors = useThemeColor();
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

  useEffect(() => {
    headerActionsProvider.registerModel('hr_timers_list', {
      actions: [
        {
          key: 'newTimer',
          order: 10,
          iconName: 'plus',
          title: I18n.t('Hr_NewTimer'),
          iconColor: Colors.primaryColor.background,
          onPress: () => console.log('Header button pressed.'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n]);

  return (
    <Screen fixedItems={<TimerDeclareButton />}>
      <ScrollList
        loadingList={loadingTimer}
        data={timerList}
        renderItem={({item}) => (
          <TimeDetailCard
            statusSelect={item.statusSelect}
            project={item.project.fullName}
            task={item.task}
            manufOrder={item.manufOrder}
            operation={item.operation}
            comments={item.comments}
            date={item.date || Date.now()}
            duration={item.duration}
            durationUnit={item.durationUnit || 'days'}
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
