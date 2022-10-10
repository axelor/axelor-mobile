import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {useThemeColor} from '../../../theme/ThemeContext';

interface IconProps {
  style?: any;
  name: string;
  FontAwesome5?: boolean;
  color?: string;
  size?: number;
  touchable?: boolean;
  visible?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const Icon = ({
  style,
  name,
  FontAwesome5 = true,
  color,
  size = 18,
  touchable = false,
  visible = true,
  onPress = () => {},
  disabled = false,
}: IconProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(
      Colors,
      color == null ? Colors.secondaryColor_dark : color,
      touchable ? disabled : false,
      size,
    );
  }, [Colors, color, disabled, size, touchable]);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} disabled={!touchable || disabled}>
        {FontAwesome5 ? (
          <Icon5 name={name} style={styles.icon} />
        ) : (
          <Icon4 name={name} style={styles.icon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (Colors, color, disabled, size) =>
  StyleSheet.create({
    icon: {
      color: disabled ? Colors.secondaryColor_light : color,
      fontSize: size,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Icon;
