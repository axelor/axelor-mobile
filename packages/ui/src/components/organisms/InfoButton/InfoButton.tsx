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

import React, {useState, useRef, useEffect, useMemo} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import CardIconButton from '../../molecules/CardIconButton/CardIconButton';
import {useThemeColor} from '../../../theme/ThemeContext';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';
import {Card} from '../../atoms';

interface InfoButtonProps {
  style?: any;
  textIndicationStyle?: any;
  iconName: string;
  indication: string;
  iconColor: string;
  size?: number;
  position?: 'left' | 'right';
  onPress: () => void;
}

const InfoButton = ({
  iconName,
  onPress,
  iconColor,
  indication,
  style,
  textIndicationStyle,
  size = 50,
  position = 'left',
}: InfoButtonProps) => {
  const Colors = useThemeColor();
  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({wrapperRef});

  const [showIndication, setShowIndication] = useState(false);

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && showIndication) {
      setShowIndication(false);
    }
  }, [clickOutside, showIndication]);

  const styles = useMemo(
    () => getStyles(Colors, size, position),
    [Colors, size, position],
  );

  return (
    <View ref={wrapperRef} style={[styles.container]}>
      <CardIconButton
        iconName={iconName}
        iconColor={iconColor}
        onPress={() => {
          onPress();
          setShowIndication(false);
        }}
        onLongPress={() => setShowIndication(true)}
        style={[{width: size, height: size}, style]}
      />
      {showIndication && (
        <View>
          <Card style={[styles.indication, textIndicationStyle]}>
            <Text style={styles.text}>{indication}</Text>
          </Card>
        </View>
      )}
    </View>
  );
};

const getStyles = (Colors, size, position) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    indication: {
      position: 'absolute',
      paddingLeft: 10,
      paddingVertical: 10,
      paddingRight: 10,
      zIndex: 99,
      backgroundColor: Colors.backgroundColor,
      bottom: size,
      elevation: 5,
      [position === 'left' ? 'right' : 'left']:
        Dimensions.get('window').width * 0.08,
    },
    text: {
      color: Colors.text,
    },
  });

export default InfoButton;
