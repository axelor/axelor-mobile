import React, {useEffect, useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDuration} from '../../../utils/formatters';

interface TimerProps {
  time: number;
  timerFormat: string;
  style?: any;
  isPaused?: boolean;
  onCount: (value: any) => void;
}

function Timer({
  style,
  timerFormat,
  time = 0,
  isPaused = true,
  onCount,
}: TimerProps) {
  const interval = React.useRef(null);
  const Colors = useThemeColor();
  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const counterHandle = useCallback(() => {
    if (isNaN(time)) {
      console.warn('Timer: something went wrong');
      return;
    }
    onCount(time + 1000);
  }, [onCount, time]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    interval.current = setInterval(counterHandle, 1000);
    return () => clearInterval(interval.current);
  }, [counterHandle, isPaused, time]);

  return (
    <View style={[styles.timer, style]}>
      <Text style={styles.text}>{formatDuration(time, timerFormat)}</Text>
    </View>
  );
}

const getStyles = Colors =>
  StyleSheet.create({
    timer: {
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 36,
      fontWeight: 'bold',
      color: Colors.secondaryColor_dark.background,
    },
  });

export default Timer;
