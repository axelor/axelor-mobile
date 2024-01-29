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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {calculateDiff, useTranslator, Stopwatch} from '@axelor/aos-mobile-core';

const DEFAULT_TIME = 0;
const TIMER_STATUS = {
  Draft: 1,
  Start: 2,
  Pause: 3,
  Stop: 4,
};
const DEFAULT_STATUS = TIMER_STATUS.Draft;

interface TimerValueProps {
  duration: number;
  timerStartDateT: string;
  status: number;
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

  const [time, setTime] = useState(DEFAULT_TIME);
  const [status, setStatus] = useState(DEFAULT_STATUS);

  const getTimerState = useCallback(() => {
    const _status = defaultValue?.status ?? DEFAULT_STATUS;
    setStatus(_status);

    let _time = DEFAULT_TIME;
    if (defaultValue?.duration != null) {
      const durationInMilliseconds = defaultValue.duration * 1000;
      if (_status === TIMER_STATUS.Start) {
        _time =
          durationInMilliseconds +
          calculateDiff(defaultValue.timerStartDateT, new Date());
      } else {
        _time = durationInMilliseconds;
      }
    }
    setTime(_time);

    return {time: _time, status: _status};
  }, [defaultValue]);

  useEffect(() => {
    getTimerState();
  }, [getTimerState]);

  useEffect(() => {
    console.log(objectState);
  }, [objectState]);

  return (
    <Stopwatch
      style={[styles.container, style]}
      startTime={time}
      status={status}
      getTimerState={getTimerState}
      timerFormat={I18n.t('Hr_TimerFormat')}
      onPlay={() => console.log('Play button pressed.')}
      onPause={() => console.log('Pause button pressed.')}
      onStop={() => console.log('Stop button pressed.')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginVertical: 0,
  },
});

export default TimerStopwatch;
