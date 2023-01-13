import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Dimensions, StatusBar, StyleSheet} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Text} from '../../atoms';

const HeaderIndicator = () => {
  const Colors = useThemeColor();
  const {isHeaderIndicatorVisible, headerIndicatorState} = useConfig();

  const translation = useRef(new Animated.Value(0)).current;

  const styles = useMemo(
    () =>
      getStyles(
        headerIndicatorState.color || Colors.secondaryColor.background_light,
        headerIndicatorState.textColor || Colors.text,
        translation,
      ),
    [Colors, headerIndicatorState, translation],
  );

  useEffect(() => {
    Animated.timing(translation, {
      toValue: isHeaderIndicatorVisible ? StatusBar.currentHeight : 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [translation, isHeaderIndicatorVisible]);

  return (
    <Animated.View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>
        {headerIndicatorState.text}
      </Text>
    </Animated.View>
  );
};

const getStyles = (color, textColor, translation) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      transform: [
        {
          translateY: translation,
        },
      ],
      zIndex: 999,
    },
    text: {
      maxWidth: '80%',
      textAlign: 'center',
      fontSize: 12,
      paddingVertical: 3,
      color: textColor,
    },
  });

export default HeaderIndicator;
