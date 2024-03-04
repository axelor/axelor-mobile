/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Card, Text} from '../../atoms';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';
import {checkNullString} from '../../../utils';
import {useThemeColor} from '../../../theme';

interface CardIndicatorProps {
  style?: any;
  textIndicationStyle?: any;
  indication?: string;
  position?: 'left' | 'right';
  children: any;
}

const CardIndicator = ({
  style,
  indication,
  textIndicationStyle,
  position = 'right',
  children,
}: CardIndicatorProps) => {
  const Colors = useThemeColor();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({wrapperRef});

  const styles = useMemo(
    () => getStyles(Colors, isOpen, position),
    [Colors, isOpen, position],
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
        {children}
      </TouchableOpacity>
      {!checkNullString(indication) && isOpen ? (
        <Card style={[styles.indicationCard, textIndicationStyle]}>
          <Text>{indication}</Text>
        </Card>
      ) : null}
    </View>
  );
};

const getStyles = (Colors, isOpen, position) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 5,
      zIndex: isOpen ? 50 : 0,
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

export default CardIndicator;
