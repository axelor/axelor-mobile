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

import React, {useMemo} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';
import {NumberBubble} from '../../molecules';
import {InfoBubble} from '../../organisms';
import {Color, useThemeColor} from '../../../theme';

export interface TopIndicator {
  position?: 'left' | 'center' | 'right' | 'separate';
  iconName?: string;
  iconSize?: number;
  iconColor?: Color;
  iconText?: string;
  title: string;
  titleSize?: number;
  numberItems?: number;
  numberSize?: number;
  loadingNumber?: boolean;
}

export interface TopSeparatorProps extends TopIndicator {
  isFirstItem?: boolean;
}

const TopSeparator = ({
  position,
  iconName,
  iconSize,
  iconColor,
  iconText,
  title,
  titleSize,
  numberItems,
  numberSize,
  loadingNumber = false,
  isFirstItem = false,
}: TopSeparatorProps) => {
  const Colors = useThemeColor();

  const flexPosition = useMemo(() => {
    switch (position) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      case 'separate':
        return 'space-between';
      default:
        return 'center';
    }
  }, [position]);

  const _iconColor = useMemo(
    () => (iconColor ? iconColor : Colors.primaryColor),
    [iconColor, Colors],
  );

  const styles = useMemo(
    () => getStyles(flexPosition, isFirstItem),
    [flexPosition, isFirstItem],
  );

  return (
    <View style={styles.separatorContainer} testID="topSeparatorContainer">
      {iconName && (
        <InfoBubble
          style={styles.infoBubble}
          textIndicationStyle={styles.infoBubbleText}
          iconName={iconName}
          badgeColor={_iconColor}
          indication={iconText}
          size={iconSize}
          position={position === 'right' ? 'left' : 'right'}
          coloredBubble={false}
        />
      )}
      <Text writingType="important" fontSize={titleSize || 18}>
        {title}
      </Text>
      {numberItems &&
        (loadingNumber ? (
          <ActivityIndicator
            style={styles.number}
            size="small"
            color={Colors.inverseColor.background}
          />
        ) : (
          <NumberBubble
            style={styles.number}
            number={numberItems}
            color={Colors.inverseColor}
            isNeutralBackground={true}
            size={numberSize}
          />
        ))}
    </View>
  );
};

const getStyles = (
  flexPosition: 'flex-start' | 'center' | 'flex-end' | 'space-between',
  isFirstItem: boolean,
) =>
  StyleSheet.create({
    separatorContainer: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: flexPosition,
      marginTop: isFirstItem ? 5 : 15,
      marginBottom: 2,
      zIndex: 1,
    },
    infoBubble: {
      marginRight: 10,
    },
    infoBubbleText: {
      width: Dimensions.get('window').width * 0.5,
      top: -10,
    },
    number: {
      marginLeft: 10,
    },
  });

export default TopSeparator;
