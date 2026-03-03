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
import {Dimensions, StyleSheet} from 'react-native';
import {Icon} from '../../atoms';
import {Color} from '../../../theme';
import {CardIndicator} from '.././../molecules';

interface InfoBubbleProps {
  style?: any;
  textIndicationStyle?: any;
  iconName: string;
  badgeColor: Color;
  indication: string;
  size?: number;
  position?: 'left' | 'right';
  coloredBubble?: boolean;
  usePopup?: boolean;
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
  usePopup = false,
}: InfoBubbleProps) => {
  const styles = useMemo(() => getStyles(badgeColor, size), [badgeColor, size]);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <CardIndicator
      style={style}
      indication={indication}
      position={position}
      isVisible={isVisible}
      handleClose={() => setIsVisible(false)}
      textIndicationStyle={textIndicationStyle}
      usePopup={usePopup}>
      <Icon
        name={iconName}
        style={coloredBubble ? styles.icon : null}
        color={coloredBubble ? badgeColor.foreground : badgeColor.background}
        size={coloredBubble ? size * 0.5 : size * 0.8}
        touchable
        onPress={() => setIsVisible(current => !current)}
      />
    </CardIndicator>
  );
};

const getStyles = (badgeColor: Color, size: number) =>
  StyleSheet.create({
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
  });

export default InfoBubble;
