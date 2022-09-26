import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {getCommonStyles} from '@/components/commons-styles';

const IconButton = ({
  style,
  color,
  title,
  iconName,
  onPress = () => {},
  disabled = false,
}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(color == null ? Colors.primaryColor : color, Colors);
  }, [Colors, color]);

  const commonStyles = useMemo(() => {
    return getCommonStyles(Colors);
  }, [Colors]);

  return (
    <TouchableOpacity
      style={[styles.colorButton, commonStyles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Icon name={iconName} size={15} color={Colors.text} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (backgroundColor, Colors) =>
  StyleSheet.create({
    colorButton: {
      backgroundColor: backgroundColor,
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors.text,
      textAlign: 'center',
      marginLeft: 10,
    },
  });

export default IconButton;
