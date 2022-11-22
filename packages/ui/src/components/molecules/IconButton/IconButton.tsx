import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Text} from '../../atoms';
import {Color} from '../../../theme/themes';

interface IconButtonProps {
  style?: any;
  color?: Color;
  title: string;
  iconName: string;
  onPress: (any) => void;
  disabled?: boolean;
}

const IconButton = ({
  style,
  color,
  title,
  iconName,
  onPress = () => {},
  disabled = false,
}: IconButtonProps) => {
  const Colors = useThemeColor();
  const buttonColor = useMemo(
    () => (color == null ? Colors.primaryColor : color),
    [Colors.primaryColor, color],
  );

  const styles = useMemo(() => {
    return getStyles(buttonColor);
  }, [buttonColor]);

  const commonStyle = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      style={[styles.container, commonStyle.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Icon name={iconName} size={15} color={buttonColor.foreground} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
    text: {
      color: color.foreground,
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: 10,
    },
  });

export default IconButton;
