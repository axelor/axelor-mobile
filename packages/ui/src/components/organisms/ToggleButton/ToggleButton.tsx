import React, {useState, useCallback, useMemo} from 'react';
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
