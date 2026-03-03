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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  calculateDiff,
  Stopwatch,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {createTimer, updateTimerStatus} from '../../../features/timerSlice';
import {TimerListAlert} from '../../templates';

const DEFAULT_TIME = 0;
const TIMER_STATUS = {
  Draft: 1,
  Start: 2,
  Pause: 3,
  Stop: 4,
};
const DEFAULT_STATUS = TIMER_STATUS.Draft;

interface TimerValueProps {
  timerId: number;
  version: number;
  duration: number;
  timerStartDateT: string;
  status: number;
  onCreation: () => void;
}

interface TimerStopwatchProps {
  style?: any;
  defaultValue?: TimerValueProps;
  objectState?: any;
}

const TimerStopwatch = ({
  style = null,
  defaultValue = null,
  objectState,
}: TimerStopwatchProps) => {
  const I18n = useTranslator();
  const dispatch: any = useDispatch();
  const {canCreate, readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TSTimer',
  });
  const {Timer} = useTypes();

  const [time, setTime] = useState(DEFAULT_TIME);
  const [status, setStatus] = useState(DEFAULT_STATUS);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const {timesheet: timesheetConfig} = useSelector(
    (state: any) => state.appConfig,
  );
  const {userId} = useSelector((state: any) => state.auth);

  const createTimerAPI = useCallback(() => {
    const _timer = {
      startDateTime: objectState?.startDateTime,
      projectId: objectState?.project?.id,
      projectTaskId: objectState?.projectTask?.id,
      productId: objectState?.product?.id,
      duration: objectState?.updatedDuration,
      comments: objectState?.comments,
    };

    (dispatch as any)(
      (createTimer as any)({userId: userId, timer: _timer}),
    ).then(() => defaultValue.onCreation());
  }, [defaultValue, dispatch, objectState, userId]);

  const updateTimerStatusAPI = useCallback(
    (toStatus: string) => {
      dispatch(
        (updateTimerStatus as any)({
          userId: userId,
          timerId: defaultValue?.timerId,
          version: defaultValue?.version,
          toStatus: toStatus,
        }),
      ).then(res => {
        const _timer = res?.payload?.payload?.[0];
        if (
          toStatus === 'stop' &&
          _timer?.statusSelect === Timer?.statusSelect.Stop
        ) {
          setIsAlertVisible(true);
        }
      });
    },
    [defaultValue, dispatch, Timer, userId],
  );

  const getTimerState = useCallback(() => {
    const _status = defaultValue?.status ?? DEFAULT_STATUS;
    setStatus(_status);

    let _time = (defaultValue?.duration ?? DEFAULT_TIME) * 1000;

    if (
      _status === TIMER_STATUS.Start &&
      defaultValue?.timerStartDateT != null
    ) {
      _time += calculateDiff(defaultValue.timerStartDateT, new Date());
    }

    setTime(_time);

    return {time: _time, status: _status};
  }, [defaultValue]);

  useEffect(() => {
    getTimerState();
  }, [getTimerState]);

  return (
    <>
      <Stopwatch
        disable={defaultValue?.timerId != null && readonly}
        style={[styles.container, style]}
        startTime={time}
        status={status}
        getTimerState={getTimerState}
        timerFormat={I18n.t('Hr_TimerFormat')}
        onPlay={() =>
          defaultValue?.timerId
            ? updateTimerStatusAPI('start')
            : createTimerAPI()
        }
        disablePlay={
          !objectState?.product || (defaultValue?.timerId == null && !canCreate)
        }
        onPause={() => updateTimerStatusAPI('pause')}
        onStop={() => updateTimerStatusAPI('stop')}
        onCancel={() => updateTimerStatusAPI('reset')}
        useObjectStatus
      />
      <TimerListAlert
        isAlertVisible={
          !timesheetConfig?.isMultipleTimerEnabled && isAlertVisible
        }
        setIsAlertVisible={setIsAlertVisible}
        defaultTimerId={defaultValue?.timerId}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginVertical: 0,
  },
});

export default TimerStopwatch;
