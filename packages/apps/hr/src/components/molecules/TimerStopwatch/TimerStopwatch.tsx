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

import React, {useEffect} from 'react';
import {useTranslator, Stopwatch, StopwatchType} from '@axelor/aos-mobile-core';
import {StyleSheet} from 'react-native';

const DEFAULT_TIME = 0;
const DEFAULT_STATUS = StopwatchType.status.Ready;

interface TimerStopwatchProps {
  style?: any;
  objectState?: any;
}

const TimerStopwatch = ({style = null, objectState}: TimerStopwatchProps) => {
  const I18n = useTranslator();

  // const [time, setTime] = useState(DEFAULT_TIME);
  // const [timerStatus, setTimerStatus] = useState(DEFAULT_STATUS);

  useEffect(() => {
    console.log(objectState);
  }, [objectState]);

  return (
    <Stopwatch
      style={[styles.container, style]}
      startTime={DEFAULT_TIME}
      status={DEFAULT_STATUS}
      timerFormat={I18n.t('Stopwatch_TimerFormat')}
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
