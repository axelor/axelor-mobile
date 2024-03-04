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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AutoCompleteSearch,
  HeaderContainer,
  ScrollList,
} from '@axelor/aos-mobile-ui';
import {ScannerAutocompleteSearch} from '../../organisms';
import {useDispatch} from '../../../redux/hooks';
import useTranslator from '../../../i18n/hooks/use-translator';

interface SearchListViewProps {
  list: any[];
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  sliceFunction: any;
  sliceFunctionData?: Object;
  onChangeSearchValue?: () => void;
  displaySearchValue?: () => string;
  searchPlaceholder?: string;
  searchNavigate?: boolean;
  scanKeySearch?: string;
  chipComponent?: any;
  headerChildren?: any;
  renderListItem: (item: any) => any;
}

const SearchListView = ({
  list,
  loading,
  moreLoading,
  isListEnd,
  sliceFunction,
  sliceFunctionData,
  onChangeSearchValue,
  displaySearchValue,
  searchPlaceholder,
  searchNavigate,
  scanKeySearch = null,
  chipComponent,
  headerChildren,
  renderListItem,
}: SearchListViewProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(null);

  const fetchApi = useCallback(
    ({page, searchValue}) => {
      dispatch(
        sliceFunction({
          ...(sliceFunctionData ?? {}),
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch, sliceFunction, sliceFunctionData],
  );

  const fetchSearchAPI = useCallback(
    ({page = 0, searchValue}) => {
      setFilter(searchValue);
      fetchApi({page, searchValue});
    },
    [fetchApi],
  );

  const fetchListAPI = useCallback(
    page => {
      fetchApi({page, searchValue: filter});
    },
    [fetchApi, filter],
  );

  const SearchBar = useMemo(
    () => (scanKeySearch ? ScannerAutocompleteSearch : AutoCompleteSearch),
    [scanKeySearch],
  );

  return (
    <View style={styles.container}>
      <HeaderContainer
        fixedItems={
          <SearchBar
            objectList={list}
            onChangeValue={onChangeSearchValue}
            fetchData={fetchSearchAPI}
            displayValue={displaySearchValue}
            placeholder={searchPlaceholder}
            oneFilter={true}
            navigate={searchNavigate}
            scanKeySearch={scanKeySearch}
          />
        }
        chipComponent={chipComponent}>
        {headerChildren}
      </HeaderContainer>
      <ScrollList
        loadingList={loading}
        data={list}
        renderItem={renderListItem}
        fetchData={fetchListAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchListView;
