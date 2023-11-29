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

import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {Color} from '../../../theme/themes';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Button} from '../../molecules';
import {ButtonProps} from '../../molecules/Button/Button';

export interface ToggleButtonProps {
  isActive?: boolean;
  color?: Color;
  activeColor?: Color;
  inactiveColor?: Color;
  buttonConfig?: ButtonProps;
  onPress?: () => void;
}

const ToggleButton = ({
  isActive = false,
  activeColor,
  inactiveColor,
  buttonConfig,
  onPress = () => {},
}: ToggleButtonProps) => {
  const Colors = useThemeColor();

  const [isSelected, setIsSelected] = useState(isActive);

  useEffect(() => {
    setIsSelected(isActive);
  }, [isActive]);

  const _activeColor = useMemo(() => {
    return activeColor != null ? activeColor : Colors.primaryColor;
  }, [Colors, activeColor]);

  const _inactiveColor = useMemo(() => {
    return inactiveColor != null ? inactiveColor : Colors.secondaryColor;
  }, [Colors, inactiveColor]);

  const handlePress = useCallback(() => {
    setIsSelected(current => !current);
    onPress();
  }, [onPress]);

  const buttonColor = useMemo(
    () => (isSelected ? _activeColor : _inactiveColor),
    [_activeColor, _inactiveColor, isSelected],
  );

  return <Button color={buttonColor} {...buttonConfig} onPress={handlePress} />;
};

export default ToggleButton;
