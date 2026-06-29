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

import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {animationUtil} from '../../../tools';
import {Card, HorizontalRule, Icon, Text} from '../../atoms';
import {IconTile} from '../../molecules';

interface DropdownCardProps {
  style?: any;
  styleText?: any;
  title: string;
  children: any;
  dropdownIsOpen?: boolean;
  onPress?: () => void;
  showIcon?: boolean;
  iconName?: string;
  iconColor?: Color;
}

const DropdownCard = ({
  style,
  styleText,
  title,
  dropdownIsOpen = false,
  children,
  onPress,
  showIcon = true,
  iconName,
  iconColor,
}: DropdownCardProps) => {
  const Colors = useThemeColor();

  const [isOpen, setIsOpen] = useState(dropdownIsOpen);

  const displayContent = useMemo(
    () => (onPress ? dropdownIsOpen : isOpen),
    [dropdownIsOpen, isOpen, onPress],
  );

  const handleCardPress = () => {
    animationUtil.animateNext();
    onPress ? onPress() : setIsOpen(!isOpen);
  };

  return (
    <Card style={[styles.card, style]} testID="dropdownCardContainer">
      <TouchableOpacity
        style={[styles.titleRow, style]}
        onPress={handleCardPress}
        disabled={!showIcon}
        activeOpacity={0.95}
        testID="dropdownCardTouchable">
        {iconName && (
          <IconTile icon={iconName} color={iconColor ?? Colors.primaryColor} />
        )}
        <Text
          style={[styles.title, styleText]}
          writingType="title"
          numberOfLines={1}>
          {title}
        </Text>
        {showIcon && (
          <Icon
            name={displayContent ? 'chevron-up' : 'chevron-down'}
            color={Colors.primaryColor.background}
          />
        )}
      </TouchableOpacity>
      {displayContent && (
        <View testID="cardContainer" style={styles.childrenContainer}>
          <HorizontalRule
            style={styles.separator}
            color={Colors.secondaryColor.background_light}
          />
          {children}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingRight: 16,
    paddingVertical: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    flex: 1,
  },
  childrenContainer: {
    width: '100%',
  },
  separator: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default DropdownCard;
