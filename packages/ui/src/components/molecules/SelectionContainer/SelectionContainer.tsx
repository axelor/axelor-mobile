import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
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
  keyField?: string;
  emptyValue?: boolean;
  isPicker?: boolean;
}

const SelectionContainer = ({
  objectList,
  displayValue,
  handleSelect,
  keyField = 'id',
  emptyValue = false,
  isPicker = false,
}: SelectionContainerProps) => {
  const Colors = useThemeColor();
  const listLength =
    objectList != null && (objectList.length <= 5 ? objectList.length : 5);

  const styles = useMemo(
    () => getStyles(Colors, listLength, emptyValue),
    [Colors, listLength, emptyValue],
  );

  if (objectList == null || objectList.length === 0) {
    return null;
  }

  const renderListItemContainerPicker = () => {
    return (
      <View>
        {emptyValue ? (
          <View>
            <SelectionItem
              key={'null'}
              content={''}
              onPress={() => handleSelect(null)}
            />
            <View style={styles.border} />
          </View>
        ) : null}
        {renderListItemContainer()}
      </View>
    );
  };

  const renderListItemContainer = () => {
    if (objectList == null || objectList.length === 0) {
      return null;
    }

    const visibleObjects = isPicker ? objectList : objectList.slice(0, 5);

    return visibleObjects.map((item, index) => (
      <View key={'item' + index}>
        <SelectionItem
          key={item[keyField]?.toString()}
          content={displayValue(item)}
          onPress={() => handleSelect(item)}
        />
        <View
          key={'border' + index}
          style={
            index + 1 === objectList.length || (!isPicker && index + 1 === 5)
              ? null
              : styles.border
          }
        />
      </View>
    ));
  };

  return (
    <View style={styles.flatListContainer}>
      <ScrollView>
        {isPicker ? renderListItemContainerPicker() : renderListItemContainer()}
      </ScrollView>
    </View>
  );
};

const getStyles = (Colors, listLength, emptyValue) =>
  StyleSheet.create({
    flatListContainer: {
      height: emptyValue ? listLength * 40 + 45 : listLength * 40 + 5,
      width: '90%',
      position: 'absolute',
      top: '95%',
      zIndex: 51,
      backgroundColor: Colors.backgroundColor,
      marginLeft: 18,
      borderRadius: 10,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      elevation: 2,
    },
    border: {
      borderBottomColor: Colors.secondaryColor.background,
      borderBottomWidth: 1,
      zIndex: 52,
      width: '104%',
      left: -14,
    },
  });

export default SelectionContainer;
