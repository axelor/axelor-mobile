import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useThemeColor} from '@/features/themeSlice';
import {Icon} from '@/components/atoms';

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

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      <Icon name={iconName} size={15} color={Colors.text} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (backgroundColor, Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      paddingVertical: 5,
      marginVertical: 5,
      borderRadius: 35,
      width: '40%',
      height: 40,
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
