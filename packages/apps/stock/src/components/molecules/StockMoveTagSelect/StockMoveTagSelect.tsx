/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Color, TagList, Text, ThemeColors} from '@axelor/aos-mobile-ui';

interface StockMoveSelectItem {
  key: string | number;
  label: string;
  color?: Color;
  order?: number;
}

interface StockMoveTagSelectProps {
  title: string;
  items: StockMoveSelectItem[];
  selectedKey: string | number | null;
  onSelect: (key: string | number | null) => void;
  defaultColor: Color;
  emptyLabel: string;
  colors: ThemeColors;
}

const StockMoveTagSelect = ({
  title,
  items,
  selectedKey,
  onSelect,
  defaultColor,
  emptyLabel,
  colors,
}: StockMoveTagSelectProps) => {
  const sortedItems = useMemo(
    () =>
      (items ?? [])
        .map((item, index) => ({
          ...item,
          order: item.order ?? index,
        }))
        .sort((first, second) => (first.order ?? 0) - (second.order ?? 0)),
    [items],
  );

  const computeTagColor = useCallback(
    (color: Color, isSelected: boolean): Color => {
      if (isSelected) {
        return {...color};
      }

      return {
        background: color.background,
        background_light: colors.backgroundColor,
        foreground: color.background,
      };
    },
    [colors.backgroundColor],
  );

  const handlePress = useCallback(
    (key: string | number) => {
      if (selectedKey === key) {
        onSelect(null);
        return;
      }

      onSelect(key);
    },
    [onSelect, selectedKey],
  );

  if (sortedItems.length === 0) {
    return (
      <View style={styles.section}>
        <Text writingType="important">{title}</Text>
        <View style={styles.emptyContainer}>
          <Text writingType="details">{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text writingType="important">{title}</Text>
      <View style={styles.tagsContainer}>
        {sortedItems.map(item => {
          const baseColor = item.color ?? defaultColor;
          const tagColor = computeTagColor(baseColor, item.key === selectedKey);

          return (
            <Pressable
              key={item.key}
              onPress={() => handlePress(item.key)}
              style={styles.tagWrapper}>
              <TagList
                hideIfNull={false}
                tags={[
                  {
                    title: item.label,
                    color: tagColor,
                    order: item.order,
                  },
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 20,
  },
  emptyContainer: {
    paddingVertical: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tagWrapper: {
    marginRight: 8,
    marginBottom: 8,
  },
});

export default StockMoveTagSelect;
