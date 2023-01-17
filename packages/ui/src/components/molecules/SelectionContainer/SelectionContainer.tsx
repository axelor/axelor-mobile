/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';

interface SelectionItemProps {
  style?: any;
  content: string;
  onPress: (any) => void;
  isSelectedItem?: boolean;
}

const SelectionItem = ({
  style,
  content,
  onPress,
  isSelectedItem = false,
}: SelectionItemProps) => {
  const Colors = useThemeColor();

  return content == null ? null : (
    <TouchableOpacity style={[itemStyles.item, style]} onPress={onPress}>
      <Text style={itemStyles.text} numberOfLines={1}>
        {content}
      </Text>
      {isSelectedItem && (
        <Icon
          style={itemStyles.icon}
          name="check"
          color={Colors.primaryColor.background}
        />
      )}
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  item: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    zIndex: 50,
  },
  text: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

interface SelectionContainerProps {
  objectList: any[];
  displayValue?: (any) => string;
  handleSelect?: (any) => void;
  keyField?: string;
  emptyValue?: boolean;
  isPicker?: boolean;
  selectedItem?: any;
}

const SelectionContainer = ({
  objectList,
  displayValue,
  handleSelect,
  keyField = 'id',
  emptyValue = false,
  isPicker = false,
  selectedItem,
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
    if (
      objectList == null ||
      objectList.length === 0 ||
      !Array.isArray(objectList)
    ) {
      return null;
    }

    const visibleObjects = isPicker
      ? objectList
      : objectList.slice(0, listLength);

    return visibleObjects.map((item, index) => (
      <View key={'item' + index}>
        <SelectionItem
          key={item[keyField]?.toString()}
          content={displayValue(item)}
          onPress={() => handleSelect(item)}
          isSelectedItem={selectedItem?.includes(item)}
        />
        <View
          key={'border' + index}
          style={
            index + 1 === objectList.length ||
            (!isPicker && index + 1 === listLength)
              ? null
              : styles.border
          }
        />
      </View>
    ));
  };

  return (
    <View style={styles.flatListContainer}>
      <ScrollView nestedScrollEnabled={true}>
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
