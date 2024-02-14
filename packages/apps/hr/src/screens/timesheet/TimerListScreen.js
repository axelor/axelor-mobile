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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DateDisplay,
  ISODateTimeToDate,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  GroupByScrollList,
  NumberBubble,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  TimeDetailCard,
  TimerDeclareButton,
  TimerListAlert,
} from '../../components';
import {
  deleteTimer,
  fetchTimer,
  getNumberTimerByDate,
} from '../../features/timerSlice';
import {formatSecondsToHours} from '../../utils';

const CustomTopSeparator = ({title: date, numberItems, isFirstItem}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getSeparatorStyles(isFirstItem), [isFirstItem]);

  return (
    <View style={styles.separatorContainer}>
      <DateDisplay date={date} />
      <NumberBubble
        style={styles.number}
        number={numberItems}
        color={Colors.inverseColor}
        isNeutralBackground={true}
      />
    </View>
  );
};

const getSeparatorStyles = isFirstItem =>
  StyleSheet.create({
    separatorContainer: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      marginTop: isFirstItem ? 5 : 15,
      marginBottom: 2,
    },
    number: {
      marginLeft: 10,
    },
  });

const TimerListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const {timerList, loadingTimer, moreLoading, isListEnd, numberTimerDates} =
    useSelector(state => state.hr_timer);
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
        fetchTopIndicator={currentItem => {
          const currentItemDate = ISODateTimeToDate(currentItem.startDateTime);
          dispatch(
            getNumberTimerByDate({
              date: currentItemDate,
              userId: userId,
            }),
          );
          return {
            title: currentItemDate,
            numberItems: numberTimerDates[currentItemDate],
          };
        }}
        customTopSeparator={<CustomTopSeparator />}
      />
      <TimerListAlert
        isAlertVisible={isAlertVisible}
        setIsAlertVisible={setIsAlertVisible}
      />
    </Screen>
  );
};

export default TimerListScreen;
