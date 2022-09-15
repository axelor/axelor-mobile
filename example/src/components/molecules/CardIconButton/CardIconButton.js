import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from '@/components/atoms';
import {useThemeColor} from '@/features/themeSlice';

const CardIconButton = ({style, iconName, color, onPress = () => {}}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.4}>
      <Icon size={20} name={iconName} color={color} />
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
