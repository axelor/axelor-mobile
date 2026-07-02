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
import {checkNullString} from '../../../utils';
import {BorderBar, HorizontalRule, Icon, Text} from '../../atoms';

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
  multiLineLabels?: boolean;
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
  multiLineLabels = false,
}: SelectionItemProps) => {
  const Colors = useThemeColor();

  const _itemColor = useMemo(
    () => itemColor ?? Colors.primaryColor,
    [Colors.primaryColor, itemColor],
  );

  return (
    <TouchableOpacity
      style={[itemStyles.item, style]}
      onPress={onPress}
      disabled={readonly}
      testID="selectionItemTouchable">
      {isPicker && (
        <Icon
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
          style={[
            itemStyles.text,
            isMoreResultsItem ? itemStyles.alignText : undefined,
          ]}
          numberOfLines={multiLineLabels ? undefined : 1}
          writingType={isMoreResultsItem ? 'title' : undefined}
          textColor={isMoreResultsItem ? _itemColor.background : undefined}>
          {content}
        </Text>
        {itemColor != null && (
          <BorderBar
            style={itemStyles.selectedItem}
            color={_itemColor.background}
          />
        )}
        {!isPicker && !isMoreResultsItem && (
          <Icon
            name="chevron-right"
            size={14}
            color={Colors.secondaryColor.background_light}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  item: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    zIndex: 105,
    paddingHorizontal: 10,
    gap: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  alignText: {
    textAlign: 'center',
  },
  text: {
    flex: 1,
  },
  selectedItem: {
    height: 25,
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
  multiLineLabels?: boolean;
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
  multiLineLabels = false,
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

  const selectionHeight = useMemo(() => {
    return emptyValue || isMoreResultsItem
      ? listLength * 40 + 45
      : listLength * 40 + 5;
  }, [emptyValue, isMoreResultsItem, listLength]);

  const styles = useMemo(
    () => getStyles(Colors, selectionHeight),
    [Colors, selectionHeight],
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
              content={displayValue?.(item) ?? ''}
              onPress={() => handleSelect?.(item)}
              itemColor={item?.color}
              isPicker={isPicker}
              isSelectedItem={selectedKeys.includes(item[keyField])}
              readonly={readonly}
              multiLineLabels={multiLineLabels}
            />
            {index + 1 === objectList?.length ||
            (!isPicker && index + 1 === listLength) ? null : (
              <HorizontalRule
                key={'border' + index}
                style={styles.border}
                color={Colors.secondaryColor.background_light}
                width={0.5}
              />
            )}
          </View>
        ))}
        {isMoreResultsItem && (
          <View>
            <HorizontalRule
              style={styles.border}
              color={Colors.secondaryColor.background_light}
              width={0.5}
            />
            <SelectionItem
              content={moreResultsItemContent}
              onPress={handleMoreResult!}
              isMoreResultsItem
            />
          </View>
        )}
      </>
    );
  }, [
    objectList,
    isPicker,
    listLength,
    translator,
    isMoreResultsItem,
    styles.border,
    handleMoreResult,
    keyField,
    displayValue,
    selectedKeys,
    readonly,
    multiLineLabels,
    Colors.secondaryColor.background_light,
    handleSelect,
  ]);

  const renderListItemContainerPicker = useCallback(() => {
    return (
      <View>
        {emptyValue ? (
          <View>
            <SelectionItem
              key={'null'}
              content={''}
              onPress={() => handleSelect?.(null)}
              readonly={readonly}
              isMoreResultsItem
            />
            <HorizontalRule
              style={styles.border}
              color={Colors.secondaryColor.background_light}
              width={0.5}
            />
          </View>
        ) : null}
        {renderListItemContainer()}
      </View>
    );
  }, [
    Colors.secondaryColor.background_light,
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

const getStyles = (Colors: ThemeColors, height: number) =>
  StyleSheet.create({
    flatListContainer: {
      height: height,
      width: '100%',
      position: 'absolute',
      top: '100%',
      zIndex: 110,
      backgroundColor: Colors.backgroundColor,
      borderRadius: 12,
      borderColor: Colors.secondaryColor.background_light,
      borderWidth: 1,
    },
    border: {
      zIndex: 115,
      width: '100%',
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SelectionContainer;
