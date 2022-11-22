import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Text} from '../../atoms';
import {Color} from '../../../theme/themes';

interface ButtonProps {
  style?: any;
  color?: Color;
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const Button = ({
  style,
  color,
  title,
  onPress = () => {},
  disabled = false,
}: ButtonProps) => {
  const Colors = useThemeColor();
  const buttonColor = useMemo(
    () => (color != null ? color : Colors.primaryColor),
    [Colors, color],
  );

  const styles = useMemo(() => {
    return getStyles(buttonColor.background);
  }, [buttonColor]);

  const commonStyles = useMemo(() => {
    return getCommonStyles(Colors);
  }, [Colors]);

  return (
    <TouchableOpacity
      style={[styles.colorButton, commonStyles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={styles.text}
        fontSize={15}
        textColor={buttonColor.foreground}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = backgroundColor =>
  StyleSheet.create({
    colorButton: {
      backgroundColor: backgroundColor,
    },
    text: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default Button;
