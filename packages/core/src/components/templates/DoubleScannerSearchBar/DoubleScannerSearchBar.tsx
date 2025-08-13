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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {checkNullString} from '@axelor/aos-mobile-ui';
import {useDispatch} from '../../../redux/hooks';
import {useTranslator} from '../../../i18n';
import {ScannerAutocompleteSearch} from '../../organisms';
import {InputBarCodeCard} from '../../molecules';

interface DoubleScannerSearchBarProps {
  showTitle?: boolean;
  title?: string;
  list: any[];
  value?: string;
  required?: boolean;
  readonly?: boolean;
  onChangeValue?: (value: any) => void;
  sliceFunction: any;
  sliceFunctionData?: Object;
  displayValue?: (value: any) => string;
  placeholderSearchBar?: string;
  placeholerBarCode?: string;
  scanKeySearch?: string;
  scanKeyBarCode?: string;
  isFocus?: boolean;
  changeScreenAfter?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  selectLastItem?: boolean;
  style?: any;
  showDetailsPopup?: boolean;
  loadingList?: boolean;
  moreLoading?: boolean;
  isListEnd?: boolean;
  isScrollViewContainer?: boolean;
  sliceBarCodeFunction: any;
  sliceFunctionBarCodeData?: Object;
  onFetchDataAction?: any;
  displayBarCodeInput?: boolean;
}

const DoubleScannerSearchBar = ({
  style = null,
  title = '',
  showTitle = false,
  value = null,
  onChangeValue = () => {},
  readonly = false,
  required = false,
  isScrollViewContainer = false,
  sliceFunction,
  sliceFunctionData,
  list,
  loadingList,
  moreLoading,
  isListEnd,
  displayValue,
  showDetailsPopup = true,
  oneFilter,
  placeholderSearchBar,
  sliceBarCodeFunction,
  sliceFunctionBarCodeData,
  selectLastItem,
  scanKeySearch,
  isFocus = true,
  changeScreenAfter,
  navigate,
  scanKeyBarCode,
  placeholerBarCode,
  onFetchDataAction,
  displayBarCodeInput = true,
}: DoubleScannerSearchBarProps) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const timerRef = useRef(null);

  const [_searchValue, setSearchValue] = useState(value);
  const [barCode, setBarCode] = useState(null);

  const fetchAPI = useCallback(
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
      onFetchDataAction && onFetchDataAction(searchValue);
      fetchAPI({page, searchValue});
    },
    [fetchAPI, onFetchDataAction],
  );

  const fetchBarCodeAPI = useCallback(() => {
    dispatch(
      sliceBarCodeFunction({
        ...(sliceFunctionBarCodeData ?? {}),
        searchValue: barCode,
      }),
    );
  }, [barCode, dispatch, sliceBarCodeFunction, sliceFunctionBarCodeData]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      fetchBarCodeAPI();
    }, 500);
  }, [fetchBarCodeAPI]);

  useEffect(() => {
    if (list.length === 1 && selectLastItem) {
      onChangeValue?.(list[0]);
      setSearchValue('');
      setBarCode(null);
    }
  }, [list, onChangeValue, selectLastItem]);

  const handleChangeBarCode = useCallback(_barCode => {
    checkNullString(_barCode) ? setBarCode(null) : setBarCode(_barCode);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <ScannerAutocompleteSearch
          style={styles.searchBar}
          title={showTitle && title}
          objectList={list}
          isFocus={isFocus}
          value={_searchValue}
          required={required}
          selectLastItem={selectLastItem}
          readonly={readonly}
          displayValue={displayValue}
          onChangeValue={onChangeValue}
          fetchData={fetchSearchAPI}
          placeholder={placeholderSearchBar}
          navigate={navigate}
          oneFilter={oneFilter}
          showDetailsPopup={showDetailsPopup}
          loadingList={loadingList}
          moreLoading={moreLoading}
          isListEnd={isListEnd}
          isScrollViewContainer={isScrollViewContainer}
          scanKeySearch={scanKeySearch}
          changeScreenAfter={changeScreenAfter}
        />
        {displayBarCodeInput && (
          <InputBarCodeCard
            style={styles.inputCode}
            placeholder={I18n.t(placeholerBarCode ?? 'Base_AltSerialNo')}
            defaultValue={barCode}
            onChange={handleChangeBarCode}
            scanKeySearch={scanKeyBarCode}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  searchBar: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  inputCode: {
    flex: 1,
    alignSelf: 'flex-start',
    minHeight: 40,
  },
});

export default DoubleScannerSearchBar;
