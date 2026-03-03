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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Checkbox} from '../../molecules';
import {ScrollList} from '../../organisms';

interface CheckboxScrollListProps {
  styleRender?: any;
  styleTopCheckbox?: any;
  styleCheckbox?: any;
  styleScrollList?: any;
  loadingList?: boolean;
  data: any[];
  defaultCheckedItems?: any[];
  onCheckedChange: (items: any[]) => void;
  renderItem: (item: any) => any;
  fetchData?: (fetchOptions?: any) => any[] | void;
  moreLoading?: boolean;
  isListEnd?: boolean;
  filter?: boolean;
  translator?: (translationKey: string) => string;
  horizontal?: boolean;
  disabledRefresh?: boolean;
}

const CheckboxScrollList = ({
  styleRender,
  styleTopCheckbox,
  styleCheckbox,
  styleScrollList,
  loadingList = false,
  data,
  defaultCheckedItems,
  onCheckedChange,
  renderItem,
  fetchData = () => [],
  moreLoading = false,
  isListEnd = true,
  filter = false,
  translator,
  horizontal = false,
  disabledRefresh = true,
}: CheckboxScrollListProps) => {
  const Colors = useThemeColor();

  const [checkedItems, setCheckedItems] = useState(defaultCheckedItems ?? []);

  useEffect(() => {
    setCheckedItems(defaultCheckedItems ?? []);
  }, [defaultCheckedItems]);

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={[styles.renderContainer, styleRender]}
        key={index}
        testID="checkboxScrollListRowContainer">
        <Checkbox
          style={[styles.renderCheckbox, styleCheckbox]}
          iconColor={Colors.secondaryColor_dark.background}
          onChange={checked =>
            setCheckedItems(prevItems => {
              const currentItems = checked
                ? [...prevItems, item]
                : prevItems.filter(_item => _item.id !== item.id);
              onCheckedChange(currentItems);
              return currentItems;
            })
          }
          isDefaultChecked={checkedItems.find(_item => _item.id === item.id)}
        />
        <View style={styles.renderItem}>{renderItem({item, index})}</View>
      </View>
    );
  };

  return (
    <View style={styles.container} testID="checkboxScrollListContainer">
      <Checkbox
        style={[styles.checkbox, styleTopCheckbox]}
        styleTxt={styles.checkboxTxt}
        iconColor={Colors.secondaryColor_dark.background}
        title={translator != null ? translator('Base_SelectAll') : 'Select all'}
        onChange={checked =>
          setCheckedItems(() => {
            const currentItems = checked ? data : [];
            onCheckedChange(currentItems);
            return currentItems;
          })
        }
        isDefaultChecked={checkedItems?.length === data?.length}
        isDefaultPartialChecked={
          checkedItems?.length > 0 && checkedItems?.length < data?.length
        }
      />
      <ScrollList
        style={[styles.scrollList, styleScrollList]}
        styleFooter={styles.scrollListFooter}
        loadingList={loadingList}
        data={data}
        renderItem={_renderItem}
        fetchData={fetchData}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        filter={filter}
        translator={translator}
        horizontal={horizontal}
        disabledRefresh={disabledRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  checkbox: {
    width: '100%',
  },
  checkboxTxt: {
    fontWeight: 'normal',
  },
  scrollList: {
    width: '100%',
  },
  scrollListFooter: {
    marginTop: 5,
  },
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  renderCheckbox: {
    marginRight: 5,
  },
  renderItem: {
    flex: 1,
  },
});

export default CheckboxScrollList;
