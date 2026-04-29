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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AutoCompleteSearch,
  GridViewColumn,
  ScrollGridView,
} from '@axelor/aos-mobile-ui';
import {FilterContainer, ScannerAutocompleteSearch} from '../../organisms';
import {useDispatch} from '../../../redux/hooks';
import {useActiveFilter} from '../../../header';
import {useIsFocused} from '../../../hooks';
import {useTranslator} from '../../../i18n';

type SortConfig = {field: string; order: 'asc' | 'desc'} | undefined;

interface GridListViewProps {
  style?: any;
  columns: GridViewColumn[];
  list: any[];
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  sliceFunction: any;
  sliceFunctionData?: Object;
  onRowPress?: (row: any) => void;
  sortable?: boolean;
  defaultSort?: SortConfig;
  stickyHeader?: boolean;
  useHeaderContainer?: boolean;
  expandableFilter?: boolean;
  headerChildren?: React.ReactNode;
  headerTopChildren?: React.ReactNode;
  headerFixedItems?: React.ReactNode;
  chipComponent?: React.ReactNode;
  displaySearchBar?: boolean;
  searchPlaceholder?: string;
  scanKeySearch?: string;
}

const GridListView = ({
  style,
  columns,
  list,
  loading,
  moreLoading,
  isListEnd,
  sliceFunction,
  sliceFunctionData,
  onRowPress,
  sortable = false,
  defaultSort,
  stickyHeader = false,
  useHeaderContainer = false,
  expandableFilter,
  headerChildren,
  headerTopChildren,
  headerFixedItems,
  chipComponent,
  displaySearchBar = false,
  searchPlaceholder,
  scanKeySearch,
}: GridListViewProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {activeFilter} = useActiveFilter();

  const [sortState, setSortState] = useState<SortConfig>(defaultSort);
  const [searchValue, setSearchValue] = useState(null);

  const fetchApi = useCallback(
    ({page, searchValue: sv}: {page: number; searchValue: any}) => {
      dispatch(
        sliceFunction({
          ...(sliceFunctionData ?? {}),
          page,
          searchValue: sv,
          sortFields: sortState
            ? [`${sortState.order === 'desc' ? '-' : ''}${sortState.field}`]
            : [],
          filterDomain: activeFilter,
        }),
      );
    },
    [activeFilter, dispatch, sliceFunction, sliceFunctionData, sortState],
  );

  const fetchSearchAPI = useCallback(
    ({page = 0, searchValue: sv}: {page?: number; searchValue: any}) => {
      setSearchValue(sv);
      fetchApi({page, searchValue: sv});
    },
    [fetchApi],
  );

  const fetchListAPI = useCallback(
    (page = 0) => {
      fetchApi({page, searchValue});
    },
    [fetchApi, searchValue],
  );

  useEffect(() => {
    if (isFocused) {
      fetchListAPI(0);
    }
  }, [fetchListAPI, isFocused]);

  const handleSortChange = useCallback((field: string) => {
    setSortState(prev => {
      if (prev?.field !== field) return {field, order: 'asc'};
      if (prev.order === 'asc') return {field, order: 'desc'};
      return undefined;
    });
  }, []);

  const renderSearchBar = useCallback(() => {
    if (!displaySearchBar) return null;

    const SearchBar = scanKeySearch
      ? ScannerAutocompleteSearch
      : AutoCompleteSearch;

    return (
      <SearchBar
        objectList={list}
        fetchData={fetchSearchAPI}
        placeholder={searchPlaceholder ?? I18n.t('Base_Search')}
        oneFilter
        scanKeySearch={scanKeySearch}
        isFocus={scanKeySearch != null}
      />
    );
  }, [
    I18n,
    displaySearchBar,
    fetchSearchAPI,
    list,
    scanKeySearch,
    searchPlaceholder,
  ]);

  return (
    <View style={[styles.container, style]}>
      {useHeaderContainer ? (
        <FilterContainer
          topChildren={headerTopChildren}
          fixedItems={
            <>
              {renderSearchBar()}
              {headerFixedItems}
            </>
          }
          chipComponent={chipComponent}
          expandableFilter={expandableFilter}>
          {headerChildren}
        </FilterContainer>
      ) : (
        renderSearchBar()
      )}
      <ScrollGridView
        style={styles.scrollFlex}
        loadingList={loading}
        columns={columns}
        data={list}
        fetchData={fetchListAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        onRowPress={onRowPress}
        sortable={sortable}
        sortField={sortState?.field}
        sortOrder={sortState?.order}
        onSortChange={handleSortChange}
        stickyHeader={stickyHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollFlex: {
    flex: 1,
  },
});

export default GridListView;
