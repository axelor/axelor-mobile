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
import {useThemeColor, Color} from '../../../theme/';
import Button, {ButtonProps} from '../../molecules/Button/Button';

export interface ToggleButtonProps {
  isActive?: boolean;
  activeColor?: Color;
  inactiveColor?: Color;
  buttonConfig?: ButtonProps;
  isNeutralBackground?: boolean;
  onPress?: (isActive: boolean) => void;
}

const ToggleButton = ({
  isActive = false,
  activeColor,
  inactiveColor,
  buttonConfig,
  isNeutralBackground = false,
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
    setIsSelected(current => {
      const newValue = !current;
      onPress(newValue);
      return newValue;
    });
  }, [onPress]);

  const buttonConfigMemo = useMemo(() => {
    let _buttonColor: Color = isSelected ? _activeColor : _inactiveColor;

    if (isNeutralBackground && !isSelected) {
      _buttonColor = {
        background: _activeColor.background,
        background_light: Colors.backgroundColor,
        foreground: Colors.text,
      };
    }

    return {
      ...buttonConfig,
      color: _buttonColor,
    };
  }, [
    Colors.backgroundColor,
    Colors.text,
    _activeColor,
    _inactiveColor,
    buttonConfig,
    isNeutralBackground,
    isSelected,
  ]);

  const buttonColor = useMemo(
    () => (isSelected ? _activeColor : _inactiveColor),
    [_activeColor, _inactiveColor, isSelected],
  );

  return (
    <Button color={buttonColor} {...buttonConfigMemo} onPress={handlePress} />
  );
};

export default ToggleButton;
