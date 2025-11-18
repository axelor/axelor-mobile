/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  ScannerAutocompleteSearch,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Indicator} from './IndicatorBadge';
import {displayLine} from '../../../utils/displayers';

export interface SearchLineContainerProps {
  style?: any;
  title: string;
  numberOfItems: number;
  showAction?: boolean;
  onAction?: () => void;
  objectList: any[];
  handleSelect: (item: any) => void;
  handleSearch?: (data: {page: number; searchValue: string}) => void;
  scanKey: string;
  onViewPress: () => void;
  renderItem: (item: any, index: number) => ReactNode;
  filterLine?: (item: any) => boolean;
  renderCustomSearchBar?: () => React.JSX.Element;
}

const SearchLineContainer = ({
  style,
  title,
  numberOfItems,
  showAction = false,
  onAction,
  objectList,
  handleSelect,
  handleSearch,
  scanKey,
  onViewPress,
  renderItem,
  filterLine,
  renderCustomSearchBar,
}: SearchLineContainerProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [navigate, setNavigate] = useState(false);

  const _handleSelect = useCallback(
    (item: any) => {
      setNavigate(current => !current);
      handleSelect(item);
    },
    [handleSelect],
  );

  const item = useMemo(() => {
    if (!Array.isArray(objectList) || objectList.length === 0) {
      return null;
    }

    const filteredList = objectList.filter(filterLine);

    const itemToDisplay =
      filteredList?.length > 0 ? filteredList[0] : objectList[0];

    const itemIndex = objectList.findIndex(
      _item => _item.id === itemToDisplay.id,
    );

    return {data: itemToDisplay, index: itemIndex};
  }, [filterLine, objectList]);

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
      {renderCustomSearchBar != null ? (
        renderCustomSearchBar()
      ) : (
        <ScannerAutocompleteSearch
          style={styles.searchBar}
          objectList={objectList}
          onChangeValue={_handleSelect}
          fetchData={handleSearch}
          displayValue={displayLine}
          scanKeySearch={scanKey}
          placeholder={I18n.t('Stock_SearchLine')}
          isFocus={true}
          changeScreenAfter={true}
          oneFilter={true}
          navigate={navigate}
        />
      )}
      <View style={styles.cardContainer}>
        {!item ? (
          <Text style={styles.text}>{I18n.t('Base_NoData')}</Text>
        ) : (
          renderItem(item.data, item.index)
        )}
      </View>
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
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    paddingRight: 16,
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
    marginHorizontal: 1,
    marginVertical: 2,
    width: '100%',
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
