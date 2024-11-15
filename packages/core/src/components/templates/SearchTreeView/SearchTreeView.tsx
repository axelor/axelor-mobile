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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ActionCardType,
  ActionType,
  AutoCompleteSearch,
  Breadcrumb,
  HeaderContainer,
  TreeView,
} from '@axelor/aos-mobile-ui';
import {ScannerAutocompleteSearch} from '../../organisms';
import {useDispatch} from '../../../redux/hooks';
import useTranslator from '../../../i18n/hooks/use-translator';
import {useIsFocused} from '../../../hooks/use-navigation';

interface SearchTreeViewProps {
  parentList: any[];
  list: any[];
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  sliceParentFunction: any;
  sliceParentFunctionData?: Object;
  sliceFunction: any;
  sliceFunctionData?: Object;
  sliceFunctionDataParentIdName: string;
  sliceFunctionDataNoParentName: string;
  fetchBranchData?: (idParent: number) => Promise<Object[]>;
  branchCondition?: (item: any) => boolean;
  onChangeSearchValue?: (item: any) => void;
  displayParentSearchValue: (item: any) => string;
  displaySearchValue?: (item: any) => string;
  searchParentPlaceholder?: string;
  searchPlaceholder?: string;
  searchNavigate?: boolean;
  scanKeySearch?: string;
  isHideableSearch?: boolean;
  fixedItems?: any;
  topFixedItems?: any;
  chipComponent?: any;
  expandableFilter?: boolean;
  headerChildren?: any;
  headerTopChildren?: any;
  parentFieldName?: string;
  renderBranch?: (item: any) => any;
  getBranchActions?: (branch: any) => ActionCardType[];
  renderLeaf: (item: any) => any;
  actionList?: ActionType[];
  verticalActions?: boolean;
  displayBreadcrumb?: boolean;
}

const SearchTreeView = ({
  parentList,
  list,
  loading,
  moreLoading,
  isListEnd,
  sliceParentFunction,
  sliceParentFunctionData,
  sliceFunction,
  sliceFunctionData,
  sliceFunctionDataParentIdName,
  sliceFunctionDataNoParentName,
  fetchBranchData,
  branchCondition,
  onChangeSearchValue,
  displayParentSearchValue,
  displaySearchValue,
  searchParentPlaceholder,
  searchPlaceholder,
  searchNavigate,
  scanKeySearch = null,
  isHideableSearch = false,
  fixedItems,
  topFixedItems,
  chipComponent,
  expandableFilter,
  headerChildren,
  headerTopChildren,
  parentFieldName,
  renderBranch,
  getBranchActions,
  renderLeaf,
  actionList,
  verticalActions,
  displayBreadcrumb = false,
}: SearchTreeViewProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [filter, setFilter] = useState(null);
  const [parent, setParent] = useState([]);

  const handleChangeParent = value => {
    setParent(current => {
      const _parent = [...current];
      value ? _parent.push(value) : _parent.pop();
      return _parent;
    });
  };

  const fetchParentSearchAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        sliceParentFunction({
          ...(sliceParentFunctionData ?? {}),
          searchValue,
          page,
        }),
      );
    },
    [dispatch, sliceParentFunction, sliceParentFunctionData],
  );

  const fetchApi = useCallback(
    ({page, searchValue}) => {
      dispatch(
        sliceFunction({
          ...(sliceFunctionData ?? {}),
          [sliceFunctionDataParentIdName]: parent.at(-1)?.id,
          [sliceFunctionDataNoParentName]:
            parent.length === 0 && searchValue == null,
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [
      dispatch,
      parent,
      sliceFunction,
      sliceFunctionData,
      sliceFunctionDataNoParentName,
      sliceFunctionDataParentIdName,
    ],
  );

  const fetchSearchAPI = useCallback(
    ({page = 0, searchValue}) => {
      setFilter(searchValue);
      fetchApi({page, searchValue});
    },
    [fetchApi],
  );

  const fetchListAPI = useCallback(
    (page = 0) => {
      fetchApi({page, searchValue: filter});
    },
    [fetchApi, filter],
  );

  useEffect(() => {
    if (isFocused) {
      fetchListAPI();
    }
  }, [fetchListAPI, isFocused]);

  const renderParentSearchBar = useCallback(() => {
    return (
      <AutoCompleteSearch
        objectList={parentList}
        value={parent.at(-1)}
        onChangeValue={handleChangeParent}
        fetchData={fetchParentSearchAPI}
        displayValue={displayParentSearchValue}
        placeholder={searchParentPlaceholder}
        showDetailsPopup={true}
      />
    );
  }, [
    displayParentSearchValue,
    fetchParentSearchAPI,
    parent,
    parentList,
    searchParentPlaceholder,
  ]);

  const renderSearchBar = useCallback(() => {
    const SearchBar = scanKeySearch
      ? ScannerAutocompleteSearch
      : AutoCompleteSearch;

    return (
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
    );
  }, [
    displaySearchValue,
    fetchSearchAPI,
    list,
    onChangeSearchValue,
    scanKeySearch,
    searchNavigate,
    searchPlaceholder,
  ]);

  return (
    <View style={styles.container}>
      <HeaderContainer
        topChildren={
          <>
            {headerTopChildren}
            {renderParentSearchBar()}
          </>
        }
        fixedItems={
          <>
            {topFixedItems}
            {!isHideableSearch && renderSearchBar()}
            {fixedItems}
          </>
        }
        chipComponent={chipComponent}
        expandableFilter={expandableFilter}>
        {isHideableSearch && renderSearchBar()}
        {headerChildren}
      </HeaderContainer>
      {displayBreadcrumb && (
        <Breadcrumb
          style={styles.breadcrumb}
          items={parent.map((item, index) => ({
            title: displayParentSearchValue(item),
            onPress: () => setParent(current => current.slice(0, index + 1)),
          }))}
          onHomePress={() => setParent([])}
        />
      )}
      <TreeView
        loadingList={loading}
        data={list}
        parentFieldName={parentFieldName}
        branchCardInfoButtonIndication={I18n.t('Base_Filter')}
        renderBranch={renderBranch}
        getBranchActions={getBranchActions}
        renderLeaf={renderLeaf}
        fetchData={fetchListAPI}
        fetchBranchData={fetchBranchData}
        branchCondition={branchCondition}
        onBranchFilterPress={handleChangeParent}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        actionList={actionList}
        verticalActions={verticalActions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  breadcrumb: {
    marginTop: 8,
  },
});

export default SearchTreeView;
