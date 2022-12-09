import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Color} from '../../../theme/themes';

interface ChipProps {
  selected: boolean;
  title: string;
  onPress: (any) => void;
  selectedColor: Color;
  width?: number;
  marginHorizontal?: number;
}

const Chip = ({
  selected,
  title,
  onPress,
  selectedColor,
  width = Dimensions.get('window').width * 0.4,
  marginHorizontal = 12,
}: ChipProps) => {
  const Colors = useThemeColor();
  const chipColor = useMemo(
    () => (selectedColor == null ? Colors.primaryColor : selectedColor),
    [Colors.primaryColor, selectedColor],
  );

  const colorStyle = useMemo(
    () =>
      selected
        ? getStyles(chipColor, Colors).selected
        : getStyles(chipColor, Colors).notSelected,
    [Colors, chipColor, selected],
  );

  return (
    <TouchableOpacity
      style={getWidth(width, marginHorizontal)}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={[styles.container, colorStyle]}>
        <Text
          textColor={selected ? chipColor.foreground : Colors.text}
          fontSize={14}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (selectedColor, Colors) =>
  StyleSheet.create({
    selected: {
      backgroundColor: selectedColor.background_light,
      borderLeftWidth: 3,
      borderLeftColor: selectedColor.background,
      borderRightWidth: 3,
      borderRightColor: selectedColor.background,
    },
    notSelected: {
      backgroundColor: Colors.backgroundColor,
      borderLeftWidth: 3,
      borderLeftColor: selectedColor.background,
      borderRightWidth: 3,
      borderRightColor: selectedColor.background,
    },
  });

const getWidth = (width, margin) =>
  StyleSheet.create({
    width: width,
    marginHorizontal: margin,
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 5,
    marginVertical: 2,
    borderRadius: 20,
    elevation: 3,
  },
});

export default Chip;
