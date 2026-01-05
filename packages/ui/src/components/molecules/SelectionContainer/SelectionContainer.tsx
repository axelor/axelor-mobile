/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {RefObject, useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color, ThemeColors, useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';
import {checkNullString} from '../../../utils';

const MAX_LIST_LENGTH = 5;

interface SelectionItemProps {
  style?: any;
  content: string;
  onPress: () => void;
  isPicker?: boolean;
  itemColor?: Color;
  isSelectedItem?: boolean;
  readonly?: boolean;
  isMoreResultsItem?: boolean;
}

const SelectionItem = ({
  style,
  content,
  onPress,
  isPicker = false,
  itemColor,
  isSelectedItem = false,
  readonly = false,
  isMoreResultsItem = false,
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

  const itemStyles = useMemo(
    () => getItemStyles(isPicker, isMoreResultsItem),
    [isMoreResultsItem, isPicker],
  );

  return (
    <TouchableOpacity
      style={[itemStyles.item, style]}
      onPress={onPress}
      disabled={readonly}
      testID="selectionItemTouchable">
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
      <View style={itemStyles.textContainer}>
        <Text
          style={itemStyles.text}
          numberOfLines={1}
          writingType={isMoreResultsItem ? 'title' : null}>
          {content}
        </Text>
        {itemColor != null && <View style={indicatorStyles.selectedItem} />}
      </View>
    </TouchableOpacity>
  );
};

const getIndicatorColor = (color: string) => {
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

const getItemStyles = (isPicker: boolean, isMoreResultsItem: boolean) =>
  StyleSheet.create({
    item: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      zIndex: 105,
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: isMoreResultsItem ? 'center' : 'space-between',
      alignItems: 'center',
      flex: 1,
    },
    text: {
      width: isPicker ? '85%' : isMoreResultsItem ? null : '100%',
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
  handleMoreResult?: () => void;
  keyField?: string;
  emptyValue?: boolean;
  isPicker?: boolean;
  selectedItem?: any[];
  readonly?: boolean;
  translator?: (key: string, values?: Object) => string;
  title?: string;
  wrapperRef?: RefObject<any>;
}

const SelectionContainer = ({
  style,
  objectList,
  displayValue,
  handleSelect,
  handleMoreResult,
  keyField = 'id',
  emptyValue = false,
  isPicker = false,
  selectedItem = [],
  readonly = false,
  translator,
  title,
  wrapperRef,
}: SelectionContainerProps) => {
  const Colors = useThemeColor();

  const [isMoreResultsItem, setIsMoreResultsItem] = useState(false);

  const listLength = useMemo(() => {
    if (objectList == null || objectList.length === 0) {
      return 1;
    } else {
      if (objectList.length <= MAX_LIST_LENGTH) {
        return objectList.length;
      } else {
        setIsMoreResultsItem(!isPicker);
        return isPicker ? MAX_LIST_LENGTH : MAX_LIST_LENGTH - 1;
      }
    }
  }, [isPicker, objectList]);

  const styles = useMemo(
    () => getStyles(Colors, listLength, emptyValue || isMoreResultsItem),
    [Colors, listLength, emptyValue, isMoreResultsItem],
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
        ? translator('Base_NoDataAvailable', {title: lowerTitle})
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

    const moreResultsItemContent =
      translator != null ? translator('Base_MoreResults') : 'More results...';

    return (
      <>
        {visibleObjects.map((item, index) => (
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
        ))}
        {isMoreResultsItem && (
          <View>
            <View style={styles.border} />
            <SelectionItem
              content={moreResultsItemContent}
              onPress={handleMoreResult}
              isMoreResultsItem={isMoreResultsItem}
            />
          </View>
        )}
      </>
    );
  }, [
    displayValue,
    handleMoreResult,
    handleSelect,
    isMoreResultsItem,
    isPicker,
    keyField,
    listLength,
    objectList,
    readonly,
    selectedKeys,
    styles.border,
    translator,
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
    <View
      ref={wrapperRef}
      style={[styles.flatListContainer, style]}
      testID="selectionContainerWrapper">
      <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled={true}>
        {isPicker ? renderListItemContainerPicker() : renderListItemContainer()}
      </ScrollView>
    </View>
  );
};

const getStyles = (Colors: ThemeColors, listLength: number, addItem: boolean) =>
  StyleSheet.create({
    flatListContainer: {
      height: addItem ? listLength * 40 + 45 : listLength * 40 + 5,
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
      width: '100%',
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SelectionContainer;
