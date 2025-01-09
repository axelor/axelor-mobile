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
  coloredBubble?: boolean;
}

const InfoBubble = ({
  style,
  iconName,
  badgeColor,
  indication,
  textIndicationStyle,
  size = Dimensions.get('window').width * 0.07,
  position = 'right',
  coloredBubble = true,
}: InfoBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const Colors = useThemeColor();
  const clickOutside = useClickOutside({wrapperRef});

  const styles = useMemo(
    () => getStyles(badgeColor, Colors, isOpen, size, position),
    [badgeColor, Colors, isOpen, size, position],
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
          style={coloredBubble ? styles.icon : null}
          color={coloredBubble ? badgeColor.foreground : badgeColor.background}
          size={coloredBubble ? size * 0.5 : size * 0.8}
        />
      </TouchableOpacity>
      {isOpen ? (
        <Card style={[styles.indicationCard, textIndicationStyle]}>
          <Text>{indication}</Text>
        </Card>
      ) : null}
    </View>
  );
};

const getStyles = (badgeColor, Colors, isOpen, size, position) =>
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
    indicationCard: {
      position: 'absolute',
      paddingLeft: 10,
      paddingVertical: 10,
      paddingRight: 10,
      zIndex: 99,
      backgroundColor: Colors.backgroundColor,
      [position === 'left' ? 'right' : 'left']:
        Dimensions.get('window').width * 0.08,
    },
  });

export default InfoBubble;
