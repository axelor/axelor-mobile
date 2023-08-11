/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '../../atoms';
import {Color} from '../../../theme/themes';
import {useThemeColor} from '../../../theme/ThemeContext';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';

interface InfoBubbleProps {
  style?: any;
  textIndicationStyle?: any;
  iconName: string;
  badgeColor: Color;
  indication: string;
  size?: number;
  position?: 'left' | 'right';
}

const InfoBubble = ({
  style,
  iconName,
  badgeColor,
  indication,
  textIndicationStyle,
  size = Dimensions.get('window').width * 0.07,
  position = 'left',
}: InfoBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const Colors = useThemeColor();
  const clickOutside = useClickOutside({wrapperRef, visible: isOpen});

  const styles = useMemo(
    () => getStyles(badgeColor, Colors, isOpen, size),
    [badgeColor, Colors, isOpen, size],
  );
  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && isOpen) {
      setIsOpen(false);
    }
  }, [clickOutside, isOpen]);

  const onPress = () => {
    setIsOpen(current => !current);
  };

  return (
    <View ref={wrapperRef} style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <Icon
          name={iconName}
          style={styles.icon}
          color={badgeColor.foreground}
          size={size * 0.5}
        />
      </TouchableOpacity>
      {isOpen ? (
        <Card
          style={[
            position === 'right'
              ? styles.indicationCardRight
              : styles.indicationCardLeft,
            textIndicationStyle,
          ]}>
          <Text>{indication}</Text>
        </Card>
      ) : null}
    </View>
  );
};

const getStyles = (badgeColor, Colors, isOpen, size) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 5,
      zIndex: isOpen ? 50 : 0,
    },
    icon: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: badgeColor.background_light,
      borderWidth: 2,
      borderColor: badgeColor.background,
      borderRadius: size,
      width: size,
      height: size,
    },
    indicationCardLeft: {
      position: 'absolute',
      left: Dimensions.get('window').width * 0.08,
      paddingLeft: 10,
      paddingVertical: 10,
      paddingRight: 10,
      zIndex: 99,
      backgroundColor: Colors.backgroundColor,
    },
    indicationCardRight: {
      position: 'absolute',
      right: Dimensions.get('window').width * 0.08,
      paddingLeft: 10,
      paddingVertical: 10,
      paddingRight: 10,
      zIndex: 99,
      backgroundColor: Colors.backgroundColor,
    },
  });

export default InfoBubble;
