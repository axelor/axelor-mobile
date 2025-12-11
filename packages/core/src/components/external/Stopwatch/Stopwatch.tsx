/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AppState, StyleSheet, View} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {StopwatchType} from '../../../types';
import {Timer} from '../../external';

const APP_STATE = {
  inactiveRegex: /inactive|background/,
  activeMode: 'active',
};

const TimerButton = ({
  name,
  disabled,
  onPress,
}: {
  name: string;
  disabled: boolean;
  onPress: () => void;
}) => {
  const Colors = useThemeColor();

  return (
    <Icon
      name={name}
      size={25}
      color={
        disabled
          ? Colors.secondaryColor.background_light
          : Colors.secondaryColor_dark.background
      }
      touchable={!disabled}
      onPress={onPress}
      style={styles.btn}
    />
  );
};

interface StopwatchProps {
  startTime: number;
  status: number;
  getTimerState?: () => {status: number; time: number};
  timerFormat: string;
  disable?: boolean;
  disablePlay?: boolean;
  disablePause?: boolean;
  disableStop?: boolean;
  disableCancel?: boolean;
  hideCancel?: boolean;
  style?: any;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onCancel?: () => void;
  useObjectStatus?: boolean;
}

const Stopwatch = ({
  startTime = 0,
  status = StopwatchType.status.Ready,
  getTimerState = () => ({status: null, time: null}),
  timerFormat,
  disable = false,
  disablePlay = false,
  disablePause = false,
  disableStop = false,
  disableCancel = false,
  hideCancel = false,
  style,
  onPlay = () => {},
  onPause = () => {},
  onStop = () => {},
  onCancel = () => {},
  useObjectStatus = false,
}: StopwatchProps) => {
  const appState = useRef(AppState.currentState);
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const [state, setState] = useState(status);
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(APP_STATE.inactiveRegex) &&
        nextAppState === APP_STATE.activeMode
      ) {
        const {status: _status, time: _time} = getTimerState();
        _status != null && setState(_status);
        _time != null && setTime(_time);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [appState, getTimerState]);

  useEffect(() => {
    setTime(startTime);
  }, [startTime]);

  useEffect(() => {
    setState(status);
  }, [status]);

  const stopwatchStatus = useMemo(() => {
    if (useObjectStatus) {
      return status;
    }

    return state;
  }, [state, status, useObjectStatus]);

  const borderStyle = useMemo(() => {
    return getStyles(
      StopwatchType.getStatusBorderColor(stopwatchStatus, Colors),
    ).border;
  }, [Colors, stopwatchStatus]);

  const handlePlayBtn = () => {
    setState(StopwatchType.status.InProgress);
    onPlay();
  };

  const handlePauseBtn = () => {
    setState(StopwatchType.status.Paused);
    onPause();
  };
  const handleStopBtn = () => {
    setState(StopwatchType.status.Finished);
    onStop();
  };
  const handleCancelBtn = () => {
    setState(StopwatchType.status.Canceled);
    setTime(0);
    onCancel();
  };

  return (
    <Card style={[styles.container, borderStyle, style]}>
      <View style={styles.row}>
        <Text style={styles.status}>
          {StopwatchType.getStatus(stopwatchStatus, I18n)}
        </Text>
        <Icon name="stopwatch-fill" size={18} style={styles.icon} />
      </View>
      <View style={styles.flexWrapContainer}>
        <View style={styles.btnContainer}>
          {stopwatchStatus !== StopwatchType.status.InProgress && (
            <TimerButton
              name="play-fill"
              disabled={
                disable ||
                disablePlay ||
                stopwatchStatus === StopwatchType.status.InProgress ||
                stopwatchStatus === StopwatchType.status.Finished
              }
              onPress={handlePlayBtn}
            />
          )}
          {stopwatchStatus === StopwatchType.status.InProgress && (
            <TimerButton
              name="pause-fill"
              disabled={disable || disablePause}
              onPress={handlePauseBtn}
            />
          )}
          <TimerButton
            name="power"
            disabled={
              disable ||
              disableStop ||
              stopwatchStatus === StopwatchType.status.Ready ||
              stopwatchStatus === StopwatchType.status.Finished
            }
            onPress={handleStopBtn}
          />
          {!hideCancel && (
            <TimerButton
              name="arrow-counterclockwise"
              disabled={
                disable ||
                disableCancel ||
                stopwatchStatus === StopwatchType.status.Ready
              }
              onPress={handleCancelBtn}
            />
          )}
        </View>
        <Timer
          time={time}
          addCount={timeToAdd => setTime(_current => _current + timeToAdd)}
          style={styles.timer}
          isPaused={stopwatchStatus !== StopwatchType.status.InProgress}
          timerFormat={timerFormat}
        />
      </View>
    </Card>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  btn: {
    marginRight: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    alignSelf: 'center',
    width: '95%',
    marginHorizontal: 12,
    marginVertical: '30%',
  },
  flexWrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  icon: {
    width: '50%',
    justifyContent: 'flex-end',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  status: {
    width: '50%',
    fontSize: 14,
    justifyContent: 'flex-start',
  },
  timer: {
    justifyContent: 'flex-end',
  },
});

export default Stopwatch;
