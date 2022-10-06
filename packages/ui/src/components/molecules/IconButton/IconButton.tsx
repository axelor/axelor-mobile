import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Text} from '../../atoms';

interface IconButtonProps {
  style?: any;
  color?: string;
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

  const styles = useMemo(() => {
    return getStyles(color == null ? Colors.primaryColor : color);
  }, [Colors, color]);

  const commonStyle = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      style={[styles.container, commonStyle.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Icon name={iconName} size={15} color={Colors.text} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = backgroundColor =>
  StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: 10,
    },
  });

export default IconButton;
