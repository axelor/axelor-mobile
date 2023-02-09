import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Color} from '../../../theme/themes';
import {Badge} from '../../molecules';
import {Text} from '../../atoms';

interface MultiSelectValueProps {
  color?: Color;
  itemList: string[];
  style?: any;
  title: string;
}

const MultiSelectValue = ({
  color,
  itemList,
  style,
  title,
}: MultiSelectValueProps) => {
  const Colors = useThemeColor();

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {itemList != null && itemList?.length > 0
        ? itemList.map((item, index) => (
            <Badge
              key={'index' + index}
              title={item}
              color={color || Colors.primaryColor}
              style={styles.badge}
            />
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  badge: {
    width: null,
    marginVertical: 2,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 14,
    marginRight: 10,
  },
});

export default MultiSelectValue;
