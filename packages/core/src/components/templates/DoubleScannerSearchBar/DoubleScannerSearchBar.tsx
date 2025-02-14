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

import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {checkNullString} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '../../../redux/hooks';
import {ScannerAutocompleteSearch} from '../../organisms';
import {InputBarCodeCard} from '../../molecules';
import {useTranslator} from '../../../i18n/';

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
  alternativeBarcodeList?: any[];
  sliceBarCodeFunction: any;
  sliceFunctionBarCodeData: Object;
  onFetchDataAction: any;
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
}: DoubleScannerSearchBarProps) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {base: baseConfig} = useSelector(state => state.appConfig);

  const [barCode, setBarCode] = useState(null);

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
      onFetchDataAction && onFetchDataAction(searchValue);
      fetchApi({page, searchValue});
    },
    [fetchApi, onFetchDataAction],
  );

  const fetchBarCodeApi = useCallback(() => {
    dispatch(
      sliceBarCodeFunction({
        ...(sliceFunctionBarCodeData ?? {}),
        searchValue: barCode,
      }),
    );
  }, [barCode, dispatch, sliceBarCodeFunction, sliceFunctionBarCodeData]);

  useEffect(() => {
    fetchBarCodeApi();
  }, [fetchBarCodeApi]);

  const handleChangeBarCode = useCallback(_value => {
    checkNullString(_value) ? setBarCode(null) : setBarCode(_value);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <ScannerAutocompleteSearch
          style={styles.searchBar}
          title={showTitle && title}
          objectList={list}
          isFocus={isFocus}
          value={value}
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
        {baseConfig.enableMultiBarcodeOnProducts && (
          <InputBarCodeCard
            style={styles.inputCode}
            placeholder={
              placeholerBarCode ? placeholerBarCode : I18n.t('Base_AltseriaNo')
            }
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
    width: '100%',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  searchBar: {
    flex: 1,
  },
  inputCode: {
    flex: 1,
    marginLeft: 5,
    minHeight: 40,
    alignSelf: 'flex-start',
  },
});

export default DoubleScannerSearchBar;
