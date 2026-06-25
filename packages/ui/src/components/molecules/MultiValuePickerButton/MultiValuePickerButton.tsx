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
import {Color, useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';

interface Item {
  color: Color;
  title: string;
  key: string | number;
}

interface MultiValuePickerButtonProps {
  style?: any;
  onPress: () => void;
  listItem: Item[];
  onPressItem?: (item: Item) => void;
  placeholder?: string;
  readonly?: boolean;
}

const MultiValuePickerButton = ({
  style,
  placeholder,
  onPress,
  listItem,
  onPressItem,
  readonly = false,
}: MultiValuePickerButtonProps) => {
  const Colors = useThemeColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={style}
      testID="multiValuePickerButtonTouchable">
      <View style={styles.listItemContainer}>
        {listItem?.length > 0
          ? listItem.map((item, index) => {
              const _color = item.color ?? Colors.primaryColor;

              return (
                <TouchableOpacity
                  onPress={() => onPressItem?.(item)}
                  disabled={readonly}
                  key={index}
                  style={[
                    styles.cardItem,
                    {backgroundColor: _color.background_light},
                  ]}
                  activeOpacity={0.9}
                  testID="multiValuePickerBadgeTouchable">
                  <Text
                    style={styles.text}
                    numberOfLines={1}
                    textColor={_color.foreground}>
                    {item.title}
                  </Text>
                  {!readonly && (
                    <Icon name="x-lg" color={_color.foreground} size={14} />
                  )}
                </TouchableOpacity>
              );
            })
          : placeholder && (
              <Text
                textColor={Colors.placeholderTextColor}
                style={styles.placeHolder}
                numberOfLines={1}>
                {placeholder}
              </Text>
            )}
      </View>
      <Icon
        name="chevron-down"
        color={Colors.secondaryColor_dark.background}
        size={14}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginRight: 5,
    maxWidth: 100,
  },
  placeHolder: {
    paddingLeft: 4,
  },
  listItemContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '90%',
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    marginLeft: 5,
    paddingHorizontal: 7,
    height: 22,
  },
});

export default MultiValuePickerButton;
