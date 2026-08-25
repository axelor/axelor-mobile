/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {memo, useCallback, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';
import {CircleButton} from '../../molecules';

export interface CalendarLegendItem {
  key: string;
  title: string;
  color: Color;
}

interface CalendarLegendProps {
  items?: CalendarLegendItem[];
  showTodayButton?: boolean;
  translator: (key: string) => string;
  onTodayPress: () => void;
}

const CalendarLegend = ({
  items,
  showTodayButton = true,
  translator,
  onTodayPress,
}: CalendarLegendProps) => {
  const Colors = useThemeColor();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => setIsVisible(_v => !_v), []);

  const hasItems = Array.isArray(items) && items.length > 0;

  if (!hasItems && !showTodayButton) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {hasItems ? (
          <Pressable style={styles.toggle} onPress={toggleVisibility}>
            <Text writingType="details" textColor={Colors.placeholderTextColor}>
              {translator('Base_Legend')}
            </Text>
            <Icon
              name={isVisible ? 'chevron-up' : 'chevron-down'}
              size={12}
              color={Colors.placeholderTextColor}
            />
          </Pressable>
        ) : (
          <View />
        )}
        {showTodayButton && (
          <CircleButton
            iconName="calendar-event"
            size={30}
            onPress={onTodayPress}
          />
        )}
      </View>
      {hasItems && isVisible && (
        <View style={styles.items}>
          {items.map(({key, title, color}) => (
            <View key={key} style={styles.item}>
              <View
                style={[
                  styles.swatch,
                  {
                    backgroundColor: color?.background_light,
                    borderColor: color?.background,
                  },
                ]}
              />
              <Text>{title}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 6,
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 0.5,
  },
});

export default memo(CalendarLegend);
