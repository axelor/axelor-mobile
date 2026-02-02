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

import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Indicator} from './IndicatorBadge';
import {displayLine} from '../../../utils/displayers';

interface Props {
  style?: any;
  title: string;
  numberOfItems: number;
  showAction?: boolean;
  onAction?: () => void;
  objectList: any[];
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  sliceFunction: any;
  sliceFunctionData?: Object;
  handleSelect: (item: any) => void;
  scanKey: string;
  onViewPress: () => void;
  renderItem: (item: any) => ReactNode;
  filterLine: (item: any) => boolean;
}

const SearchLineContainer = ({
  style,
  title,
  numberOfItems,
  showAction = false,
  onAction,
  objectList,
  loading,
  moreLoading,
  isListEnd,
  sliceFunction,
  sliceFunctionData,
  handleSelect,
  scanKey,
  onViewPress,
  renderItem,
  filterLine,
}: Props) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [navigate, setNavigate] = useState(false);

  const {mobileSettings} = useSelector(state => state.appConfig);

  const _handleSelect = useCallback(
    (item: any) => {
      setNavigate(current => !current);
      handleSelect(item);
    },
    [handleSelect],
  );

  const showSimplifiedDisplay = useMemo(
    () => mobileSettings?.isSimplifiedStockMoveLineDisplayEnabled,
    [mobileSettings?.isSimplifiedStockMoveLineDisplayEnabled],
  );

  const filteredList = useMemo(() => {
    if (showSimplifiedDisplay) {
      if (!Array.isArray(objectList) || objectList.length === 0) {
        return [];
      }

      const _list = objectList.filter(filterLine);
      return [_list?.at(0) ?? objectList[0]];
    }

    return (
      objectList?.sort((a, b) => {
        const condA = filterLine(a);
        const condB = filterLine(b);
        return condA === condB ? 0 : condA ? -1 : 1;
      }) ?? []
    );
  }, [filterLine, objectList, showSimplifiedDisplay]);

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <Text>{title}</Text>
        <View style={styles.headerIcons}>
          <Indicator indicator={numberOfItems} />
          {showAction && (
            <Icon
              style={styles.icon}
              name="plus-lg"
              color={Colors.primaryColor.background}
              size={20}
              touchable={true}
              onPress={onAction}
            />
          )}
        </View>
      </View>
      <SearchListView
        list={filteredList}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={showSimplifiedDisplay ?? isListEnd}
        sliceFunction={sliceFunction}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={_handleSelect}
        displaySearchValue={displayLine}
        searchPlaceholder={I18n.t('Stock_SearchLine')}
        scanKeySearch={scanKey}
        useHeaderContainer={false}
        searchNavigate={navigate}
        renderListItem={({item}) => renderItem(item)}
      />
      {showSimplifiedDisplay && (
        <TouchableOpacity onPress={onViewPress} activeOpacity={0.9}>
          <View style={styles.iconContainer}>
            <Text style={styles.txtDetails}>{I18n.t('Base_ViewAll')}</Text>
            <Icon
              name="chevron-right"
              color={Colors.secondaryColor.background_light}
              size={20}
            />
          </View>
        </TouchableOpacity>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    paddingRight: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  searchBar: {
    width: '100%',
  },
  cardContainer: {
    marginBottom: 2,
    width: '100%',
  },
  text: {
    alignSelf: 'center',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 2,
    elevation: 3,
  },
  txtDetails: {
    fontSize: 14,
    marginHorizontal: 15,
  },
});

export default SearchLineContainer;
