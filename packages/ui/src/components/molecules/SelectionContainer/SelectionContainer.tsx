import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';

interface SelectionItemProps {
  style?: any;
  content: string;
  onPress: (any) => void;
}

const SelectionItem = ({style, content, onPress}: SelectionItemProps) => {
  return content == null ? null : (
    <TouchableOpacity style={[itemStyles.item, style]} onPress={onPress}>
      <Text style={itemStyles.text}>{content}</Text>
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  item: {
    height: 40,
    flexDirection: 'row',
    position: 'relative',
    width: '104%',
    left: -14,
    top: -10,
    zIndex: 50,
  },
  text: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
  },
});

interface SelectionContainerProps {
  objectList: any[];
  displayValue?: (any) => string;
  handleSelect?: (any) => void;
}

const SelectionContainer = ({
  objectList,
  displayValue,
  handleSelect,
}: SelectionContainerProps) => {
  const Colors = useThemeColor();
  const listLength =
    objectList != null && (objectList.length <= 5 ? objectList.length : 5);

  const styles = useMemo(
    () => getStyles(Colors, listLength),
    [Colors, listLength],
  );

  if (objectList == null || objectList.length === 0) {
    return null;
  }

  return (
    <View style={styles.flatListContainer}>
      {objectList != null &&
        objectList.length > 0 &&
        objectList.slice(0, 5).map((item, index) => (
          <View key={'item' + index}>
            <SelectionItem
              key={item?.id.toString()}
              content={displayValue(item)}
              onPress={() => handleSelect(item)}
            />
            <View
              key={'border' + index}
              style={
                index + 1 === objectList.length || index + 1 === 5
                  ? null
                  : styles.border
              }
            />
          </View>
        ))}
    </View>
  );
};

const getStyles = (Colors, listLength) =>
  StyleSheet.create({
    flatListContainer: {
      height: listLength * 40 + 5,
      width: '91%',
      position: 'absolute',
      top: '99%',
      zIndex: 51,
      backgroundColor: Colors.backgroundColor,
      marginHorizontal: 15,
      paddingLeft: 15,
      paddingVertical: 10,
      borderRadius: 10,
      borderColor: Colors.secondaryColor,
      borderWidth: 1,
      elevation: 2,
    },
    border: {
      borderBottomColor: Colors.secondaryColor,
      borderBottomWidth: 1,
      zIndex: 52,
      width: '104%',
      left: -14,
      top: -10,
    },
  });

export default SelectionContainer;
