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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';
import {hexToRgb} from '../../../utils';
import {ScrollList} from '../ScrollList';

interface SingleSelectScrollListProps {
  scrollStyle?: any;
  rowStyle?: any;
  loadingList: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  data: any[];
  fetchData: (page?: number) => void;
  keyField?: string;
  renderItem: (opts: {item: any; index?: number}) => any;
  buttonSize?: number;
  defaultSelected?: any;
  onChange: (value: any) => void;
  translator?: (translationKey: string) => string;
}

const SingleSelectScrollList = ({
  scrollStyle,
  rowStyle,
  loadingList = false,
  moreLoading = false,
  isListEnd = true,
  data,
  fetchData,
  keyField = 'id',
  renderItem,
  buttonSize = 20,
  defaultSelected,
  onChange,
  translator,
}: SingleSelectScrollListProps) => {
  const Colors = useThemeColor();

  const [selectedKey, setSelectedKey] = useState<number | string>();

  useEffect(() => {
    setSelectedKey(defaultSelected?.[keyField]);
  }, [defaultSelected, keyField]);

  const styles = useMemo(
    () => getStyles(Colors, buttonSize),
    [Colors, buttonSize],
  );

  const handleRowSelection = useCallback(
    (item: any) => {
      onChange(item);
      setSelectedKey(item[keyField]);
    },
    [keyField, onChange],
  );

  const renderRow = useCallback(
    ({item, index}) => {
      if (item == null) {
        return null;
      }

      const isSelected = item[keyField] === selectedKey;

      return (
        <TouchableOpacity
          testID={`singleSelectScrollListItemContainer-${index}`}
          onPress={() => handleRowSelection(item)}
          activeOpacity={0.7}
          style={[
            styles.container,
            isSelected && styles.selectedCard,
            rowStyle,
          ]}>
          <View
            testID={`singleSelectScrollListItemRadio-${index}`}
            style={[styles.buttonExt, isSelected && styles.selectedButtonExt]}>
            <View style={isSelected && styles.selectedButtonInt} />
          </View>
          <View style={styles.itemContainer}>{renderItem({item, index})}</View>
        </TouchableOpacity>
      );
    },
    [handleRowSelection, keyField, renderItem, rowStyle, selectedKey, styles],
  );

  return (
    <ScrollList
      style={scrollStyle}
      loadingList={loadingList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      data={data}
      fetchData={fetchData}
      renderItem={renderRow}
      translator={translator}
    />
  );
};

const getStyles = (Colors: ThemeColors, size: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 5,
      marginVertical: 2,
      padding: 3,
    },
    selectedCard: {
      backgroundColor: `rgba(${hexToRgb(Colors.primaryColor.background)}, 0.4)`,
      borderColor: Colors.primaryColor.background,
      borderWidth: 1,
      borderRadius: 7,
    },
    buttonExt: {
      alignItems: 'center',
      justifyContent: 'center',
      height: size,
      width: size,
      borderRadius: size,
      borderWidth: 1,
      borderColor: Colors.secondaryColor.background,
      backgroundColor: Colors.backgroundColor,
      marginHorizontal: 5,
    },
    selectedButtonExt: {
      borderColor: Colors.primaryColor.background,
    },
    selectedButtonInt: {
      height: size * 0.7,
      width: size * 0.7,
      borderRadius: size * 0.7,
      backgroundColor: Colors.primaryColor.background,
    },
    itemContainer: {
      flex: 1,
    },
  });

export default SingleSelectScrollList;
