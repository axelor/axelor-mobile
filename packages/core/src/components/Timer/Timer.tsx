import React, {useEffect, useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useThemeColor} from '@aos-mobile/ui';
import moment from 'moment';

interface TimerProps {
  time: number;
  style?: any;
  isPaused?: boolean;
  onCount: (value: any) => void;
}

function Timer({time = 0, style, isPaused = true, onCount}: TimerProps) {
  const interval = React.useRef(null);

  const duration = moment.duration(time);
  const minutes = duration.minutes().toString().padStart(2, '0');
  const seconds = duration.seconds().toString().padStart(2, '0');

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
      <Text style={styles.text}>
        {minutes}:{seconds}
      </Text>
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
      color: Colors.secondaryColor_dark,
    },
  });

export default Timer;
