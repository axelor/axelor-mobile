import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon} from '../../atoms';

interface CardIconButtonProps {
  style?: any;
  iconName: string;
  iconColor: string;
  onPress: (any) => void;
}

const CardIconButton = ({
  style,
  iconName,
  iconColor,
  onPress = () => {},
}: CardIconButtonProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.4}>
      <Icon size={20} name={iconName} color={iconColor} />
    </TouchableOpacity>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: '90%',
      borderRadius: 8,
      alignSelf: 'center',
      elevation: 0,
      justifyContent: 'center',
      backgroundColor: Colors.backgroundColor,
      margin: 2,
    },
  });

export default CardIconButton;
