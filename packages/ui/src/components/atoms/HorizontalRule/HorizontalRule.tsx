import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';

interface HorizontalRuleProps {
  style?: any;
}

const HorizontalRule = ({style}: HorizontalRuleProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  return <View style={[styles.line, style]} />;
};

const getStyles = Colors =>
  StyleSheet.create({
    line: {
      borderBottomColor: Colors.secondaryColor.background,
      borderBottomWidth: 1,
    },
  });

export default HorizontalRule;
