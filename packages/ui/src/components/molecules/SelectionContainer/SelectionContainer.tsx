/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color, ThemeColors, useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';
import {checkNullString} from '../../../utils';

interface SelectionItemProps {
  style?: any;
  content: string;
  onPress: () => void;
  isPicker?: boolean;
  itemColor?: Color;
  isSelectedItem?: boolean;
  readonly?: boolean;
}

const SelectionItem = ({
  style,
  content,
  onPress,
  isPicker = false,
  itemColor,
  isSelectedItem = false,
  readonly = false,
}: SelectionItemProps) => {
  const Colors = useThemeColor();

  const _itemColor = useMemo(
    () => itemColor ?? Colors.primaryColor,
    [Colors.primaryColor, itemColor],
  );

  const indicatorStyles = useMemo(
    () => getIndicatorColor(_itemColor.background),
    [_itemColor],
  );

  const itemStyles = useMemo(() => getItemStyles(isPicker), [isPicker]);

  return (
    <TouchableOpacity
      style={[itemStyles.item, style]}
      onPress={onPress}
      disabled={readonly}>
      {isPicker && (
        <Icon
          style={itemStyles.icon}
          name={isSelectedItem ? 'check-square-fill' : 'square'}
          color={
            readonly
              ? Colors.secondaryColor.background_light
              : Colors.secondaryColor_dark.background
          }
        />
      )}
      <Text style={itemStyles.text} numberOfLines={1}>
        {content}
      </Text>
      {itemColor != null && <View style={indicatorStyles.selectedItem} />}
    </TouchableOpacity>
  );
};

const getIndicatorColor = color => {
  return StyleSheet.create({
    selectedItem: {
      backgroundColor: color,
      width: 7,
      height: 32,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
  });
};

const getItemStyles = isPicker =>
  StyleSheet.create({
    item: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      zIndex: 105,
    },
    text: {
      width: isPicker ? '85%' : '100%',
      marginVertical: 5,
      marginLeft: isPicker ? 0 : 10,
      fontSize: 16,
    },
    icon: {
      margin: 10,
    },
  });

interface SelectionContainerProps {
  style?: any;
  objectList: any[];
  displayValue?: (item: any) => string;
  handleSelect?: (item: any) => void;
  keyField?: string;
  emptyValue?: boolean;
  isPicker?: boolean;
  selectedItem?: any[];
  readonly?: boolean;
  translator?: (key: string, values?: Object) => string;
  title?: string;
}

const SelectionContainer = ({
  style,
  objectList,
  displayValue,
  handleSelect,
  keyField = 'id',
  emptyValue = false,
  isPicker = false,
  selectedItem = [],
  readonly = false,
  translator,
  title,
}: SelectionContainerProps) => {
  const Colors = useThemeColor();

  const listLength = useMemo(() => {
    if (objectList == null || objectList.length === 0) {
      return 1;
    } else {
      return objectList.length <= 5 ? objectList.length : 5;
    }
  }, [objectList]);

  const styles = useMemo(
    () => getStyles(Colors, listLength, emptyValue),
    [Colors, listLength, emptyValue],
  );

  const selectedKeys = useMemo(
    () => selectedItem?.map(_item => _item?.[keyField]) ?? [],
    [keyField, selectedItem],
  );

  const renderEmptyState = useCallback(() => {
    const _title =
      (checkNullString(title) ? translator?.('Base_Data') : title) ?? 'data';
    const lowerTitle = _title.toLowerCase();

    const message =
      translator != null
        ? translator('Base_NoDataPicker', {title: lowerTitle})
        : `No ${lowerTitle} available.`;

    return (
      <View style={[styles.flatListContainer, styles.emptyContainer]}>
        <Text>{message}</Text>
      </View>
    );
  }, [title, styles, translator]);

  const renderListItemContainer = useCallback(() => {
    if (!Array.isArray(objectList) || objectList.length === 0) {
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
          itemColor={item?.color}
          isPicker={isPicker}
          isSelectedItem={selectedKeys.includes(item[keyField])}
          readonly={readonly}
        />
        <View
          key={'border' + index}
          style={
            index + 1 === objectList?.length ||
            (!isPicker && index + 1 === listLength)
              ? null
              : styles.border
          }
        />
      </View>
    ));
  }, [
    displayValue,
    handleSelect,
    isPicker,
    keyField,
    listLength,
    objectList,
    readonly,
    selectedKeys,
    styles.border,
  ]);

  const renderListItemContainerPicker = useCallback(() => {
    return (
      <View>
        {emptyValue ? (
          <View>
            <SelectionItem
              key={'null'}
              content={''}
              onPress={() => handleSelect(null)}
              readonly={readonly}
            />
            <View style={styles.border} />
          </View>
        ) : null}
        {renderListItemContainer()}
      </View>
    );
  }, [
    emptyValue,
    handleSelect,
    readonly,
    renderListItemContainer,
    styles.border,
  ]);

  if (objectList == null || objectList.length === 0) {
    return renderEmptyState();
  }

  return (
    <View style={[styles.flatListContainer, style]}>
      <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled={true}>
        {isPicker ? renderListItemContainerPicker() : renderListItemContainer()}
      </ScrollView>
    </View>
  );
};

const getStyles = (
  Colors: ThemeColors,
  listLength: number,
  emptyValue: boolean,
) =>
  StyleSheet.create({
    flatListContainer: {
      height: emptyValue ? listLength * 40 + 45 : listLength * 40 + 5,
      width: '100%',
      position: 'absolute',
      top: '94%',
      zIndex: 110,
      backgroundColor: Colors.backgroundColor,
      borderRadius: 7,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      elevation: 2,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    border: {
      borderBottomColor: Colors.secondaryColor.background,
      borderBottomWidth: 1,
      zIndex: 115,
      width: '104%',
      left: -14,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SelectionContainer;
