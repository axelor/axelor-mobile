import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '@/features/themeSlice';

const Card = ({style, children}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return <View style={[styles.container, style]}>{children}</View>;
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingRight: 32,
      paddingVertical: 16,
      borderRadius: 14,
      elevation: 3,
      backgroundColor: Colors.backgroundColor,
    },
  });

export default Card;
