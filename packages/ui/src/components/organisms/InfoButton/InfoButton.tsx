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

import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {CardIconButton, CardIndicator} from '../../molecules';

interface InfoButtonProps {
  style?: any;
  textIndicationStyle?: any;
  iconName: string;
  iconColor: string;
  indication: string;
  position?: 'left' | 'right';
  disabled?: boolean;
  onPress: () => void;
  space?: number;
}

const InfoButton = ({
  style,
  textIndicationStyle,
  iconName,
  iconColor,
  indication,
  position = 'left',
  disabled = false,
  onPress = () => {},
  space = Dimensions.get('window').width * 0.15,
}: InfoButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <CardIndicator
      indication={indication}
      position={position}
      isVisible={isVisible}
      style={style}
      textIndicationStyle={textIndicationStyle}
      handleClose={() => setIsVisible(false)}
      space={space}>
      <CardIconButton
        iconName={iconName}
        iconColor={iconColor}
        disabled={disabled}
        onPress={() => {
          onPress();
          setIsVisible(false);
        }}
        onLongPress={() => setIsVisible(current => !current)}
      />
    </CardIndicator>
  );
};

export default InfoButton;
