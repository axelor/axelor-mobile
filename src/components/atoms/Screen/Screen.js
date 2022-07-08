import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '@/features/themeSlice';

const Screen = ({style, children}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  return <View style={[styles.container, style]}>{children}</View>;
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.screenBackgroundColor,
      flex: 1,
    },
  });

export default Screen;
