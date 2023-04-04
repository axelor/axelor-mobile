import React from 'react';
import {StyleSheet} from 'react-native';
import {Badge, useThemeColor} from '@axelor/aos-mobile-ui';

const BADGE_SIZE = 30;

interface IndicatorProps {
  style?: any;
  indicator: number;
}

export const Indicator = ({style, indicator}: IndicatorProps) => {
  const Colors = useThemeColor();

  if (indicator == null) {
    return null;
  }

  return (
    <Badge
      style={[styles.badge, style]}
      txtStyle={styles.badgeText}
      color={{
        background_light: Colors.backgroundColor,
        foreground: Colors.text,
        background: Colors.primaryColor.background,
      }}
      title={indicator}
    />
  );
};

const styles = StyleSheet.create({
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: Math.ceil(BADGE_SIZE / 2),
  },
  badgeText: {
    fontSize: Math.ceil(BADGE_SIZE / 2),
  },
});
