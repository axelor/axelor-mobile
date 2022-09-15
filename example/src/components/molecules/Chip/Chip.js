import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useThemeColor} from '@/features/themeSlice';

const Chip = ({
  selected,
  title,
  onPress,
  selectedColor,
  width = Dimensions.get('window').width * 0.4,
  marginHorizontal = 12,
}) => {
  const Colors = useThemeColor();

  const colorStyle = useMemo(() => {
    const color =
      selectedColor == null
        ? {
            backgroundColor: Colors.primaryColor_light,
            borderColor: Colors.primaryColor,
          }
        : selectedColor;

    return selected
      ? getStyles(color, Colors).selected
      : getStyles(color, Colors).notSelected;
  }, [Colors, selected, selectedColor]);

  return (
    <TouchableOpacity
      style={getWidth(width, marginHorizontal)}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={[styles.container, colorStyle]}>
        <Text
          style={
            selected
              ? styles.chipTxt
              : getStyles(selectedColor, Colors).textColor
          }>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (selectedColor, Colors) =>
  StyleSheet.create({
    selected: {
      backgroundColor: selectedColor.backgroundColor,
      borderLeftWidth: 3,
      borderLeftColor: selectedColor.borderColor,
      borderRightWidth: 3,
      borderRightColor: selectedColor.borderColor,
    },
    notSelected: {
      backgroundColor: Colors.backgroundColor,
      borderLeftWidth: 3,
      borderLeftColor: selectedColor.borderColor,
      borderRightWidth: 3,
      borderRightColor: selectedColor.borderColor,
    },
    textColor: {
      fontSize: 14,
      color: selectedColor.borderColor,
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
  chipTxt: {
    fontSize: 14,
  },
});

export default Chip;
