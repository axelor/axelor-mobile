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

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {HorizontalRule, Icon, Text} from '../../atoms';

const ItemCard = ({
  onSelect,
  title,
  isSelected = false,
}: {
  onSelect?: () => void;
  title?: string;
  isSelected?: boolean;
}) => {
  const Colors = useThemeColor();

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.item}
        onPress={onSelect}>
        <Text style={styles.text} writingType="important">
          {title ?? ''}
        </Text>
        {isSelected ? (
          <Icon name="check-lg" color={Colors.primaryColor.background} />
        ) : (
          <Icon
            name="chevron-right"
            size={15}
            color={Colors.secondaryColor.background_light}
          />
        )}
      </TouchableOpacity>
      <HorizontalRule
        style={styles.border}
        color={Colors.secondaryColor.background_light}
        width={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    padding: 10,
    gap: 5,
  },
  text: {
    alignSelf: 'center',
    flex: 1,
  },
  border: {
    width: '100%',
  },
});

export default ItemCard;
