import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Color, useThemeColor} from '@axelor/aos-mobile-ui/src/theme';
import {Text} from '@axelor/aos-mobile-ui/src/components/atoms';

interface HeaderBandProps {
  color: Color;
  text: string;
  showIf?: () => boolean;
}

const HeaderBand = ({color, text, showIf}: HeaderBandProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(color || Colors.secondaryColor),
    [Colors, color],
  );

  if (!showIf()) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

const getStyles = (color: Color) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width,
      backgroundColor: color.background_light,
      justifyContent: 'center',
      alignItems: 'center',
      height: 24,
    },
    text: {
      maxWidth: '80%',
      textAlign: 'center',
      fontSize: 12,
      paddingVertical: 3,
      color: color.foreground,
    },
  });

export default HeaderBand;
