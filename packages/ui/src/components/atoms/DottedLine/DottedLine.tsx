import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';

interface DottedLineProps {
  style?: any;
}

function DottedLine({style}: DottedLineProps) {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  return <View style={[styles.dottedLine, style]} />;
}

const getStyles = Colors =>
  StyleSheet.create({
    dottedLine: {
      borderStyle: 'dotted',
      height: 35,
      borderLeftWidth: 2,
      borderColor: Colors.secondaryColor_dark,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default DottedLine;
