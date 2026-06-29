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
import {animationUtil} from '../../../tools/AnimationUtil';
import {Color, useThemeColor} from '../../../theme';
import {Card, HorizontalRule, Icon, Text} from '../../atoms';
import IconTile from '../IconTile/IconTile';

interface DropdownCardProps {
  style?: any;
  styleText?: any;
  styleContainer?: any;
  styleCard?: any;
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
  styleContainer,
  styleCard,
  title,
  dropdownIsOpen = false,
  children,
  onPress,
  showIcon = true,
  iconName,
  iconColor,
}: DropdownCardProps) => {
  const [isOpen, setIsOpen] = useState(dropdownIsOpen);
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(), []);

  const displayCard = useMemo(() => {
    return onPress ? dropdownIsOpen : isOpen;
  }, [dropdownIsOpen, isOpen, onPress]);

  const handleCardPress = () => {
    animationUtil.animateNext();
    onPress ? onPress() : setIsOpen(!isOpen);
  };

  return (
    <View
      style={[styles.container, styleContainer]}
      testID="dropdownCardContainer">
      <Card style={[styles.card, styleCard]} testID="dropdownCardInner">
        <TouchableOpacity
          style={[styles.titleRow, style]}
          onPress={handleCardPress}
          disabled={!showIcon}
          activeOpacity={0.95}
          testID="dropdownCardTouchable">
          {iconName && (
            <IconTile
              icon={iconName}
              color={iconColor ?? Colors.primaryColor}
              style={styles.iconTile}
            />
          )}
          <Text
            style={[styles.title, styleText]}
            writingType="title"
            numberOfLines={1}>
            {title}
          </Text>
          {showIcon && (
            <Icon
              name={displayCard ? 'chevron-up' : 'chevron-down'}
              color={Colors.primaryColor.background}
            />
          )}
        </TouchableOpacity>
        {displayCard && (
          <View testID="cardContainer">
            <HorizontalRule style={styles.separator} />
            {children}
          </View>
        )}
      </Card>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      marginBottom: 8,
    },
    card: {
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconTile: {
      marginRight: 12,
    },
    title: {
      flex: 1,
    },
    separator: {
      marginTop: 12,
      marginBottom: 4,
    },
  });

export default DropdownCard;
