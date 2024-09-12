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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';
import {ScrollList} from '../ScrollList';

interface SingleSelectScrollListProps {
  scrollStyle?: any;
  rowStyle?: any;
  loading: boolean;
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
  loading = false,
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
          onPress={() => handleRowSelection(item)}
          style={[
            styles.container,
            isSelected && styles.selectedCard,
            rowStyle,
          ]}>
          <View style={styles.buttonExt}>
            {isSelected ? <View style={styles.buttonInt} /> : null}
          </View>
          {renderItem({item, index})}
        </TouchableOpacity>
      );
    },
    [handleRowSelection, keyField, renderItem, rowStyle, selectedKey, styles],
  );

  return (
    <ScrollList
      style={scrollStyle}
      loadingList={loading}
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
      margin: 5,
      flex: 1,
      minWidth: 100,
      padding: 10,
    },
    selectedCard: {
      backgroundColor: Colors.backgroundColor,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      borderRadius: 7,
      elevation: 2,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
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
    },
    buttonInt: {
      height: size * 0.7,
      width: size * 0.7,
      borderRadius: size * 0.7,
      backgroundColor: Colors.primaryColor.background,
    },
  });

export default SingleSelectScrollList;
