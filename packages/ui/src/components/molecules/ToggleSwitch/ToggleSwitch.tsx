import React, {useMemo, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Text} from '../../atoms';

interface ToggleSwitchProps {
  style?: any;
  leftTitle: string;
  rightTitle: string;
  onSwitch: () => void;
}

const ToggleSwitch = ({
  style,
  leftTitle,
  rightTitle,
  onSwitch = () => {},
}: ToggleSwitchProps) => {
  const Colors = useThemeColor();
  const [active, setActive] = useState(true);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const onLeftPress = () => {
    setActive(true);
    onSwitch();
  };

  const onRightPress = () => {
    setActive(false);
    onSwitch();
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.toggle, active && styles.active]}
        disabled={active}
        onPress={onLeftPress}>
        <Text>{leftTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggle, !active && styles.active]}
        disabled={!active}
        onPress={onRightPress}>
        <Text>{rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      borderColor: Colors.secondaryColor_light,
      borderWidth: 2,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      padding: 2,
    },
    toggle: {
      width: Dimensions.get('window').width * 0.47,
      padding: 5,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundColor: Colors.primaryColor_light,
    },
  });
export default ToggleSwitch;
