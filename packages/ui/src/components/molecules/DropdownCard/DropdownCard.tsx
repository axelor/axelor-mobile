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
import {useThemeColor} from '../../../theme';
import {Card, Icon, Text} from '../../atoms';
import {getCommonStyles} from '../../../utils';

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
}: DropdownCardProps) => {
  const [isOpen, setIsOpen] = useState(dropdownIsOpen);
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(() => getStyles(Colors), [Colors]);

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
      <TouchableOpacity
        style={styles.containerContent}
        onPress={handleCardPress}
        disabled={!showIcon}
        activeOpacity={0.95}
        testID="dropdownCardTouchable">
        <View
          style={[
            commonStyles.filter,
            commonStyles.filterAlign,
            styles.content,
            style,
          ]}>
          <View style={styles.row}>
            {iconName && <Icon name={iconName} style={styles.iconLeft} />}
            <Text style={styleText} numberOfLines={1}>
              {title}
            </Text>
          </View>
          {showIcon && (
            <Icon
              name={displayCard ? 'chevron-up' : 'chevron-down'}
              color={Colors.primaryColor.background}
            />
          )}
        </View>
      </TouchableOpacity>
      {displayCard && (
        <Card style={[styles.containerChildren, styleCard]}>{children}</Card>
      )}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
    },
    containerContent: {
      width: '100%',
      zIndex: 35,
    },
    content: {
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      marginHorizontal: 0,
      height: 40,
    },
    containerChildren: {
      backgroundColor: Colors.backgroundColor,
      width: '98%',
      paddingTop: 25,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      marginTop: -20,
      borderRadius: 7,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      zIndex: 30,
    },
    row: {
      flexDirection: 'row',
    },
    iconLeft: {
      marginRight: 10,
    },
  });

export default DropdownCard;
