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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  DoubleScannerSearchBar,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  default as SearchLineContainer,
  SearchLineContainerProps,
} from '../SearchLineContainer/SearchLineContainer';
import {searchAlternativeBarcode} from '../../../features/alternativeBarcodeSlice';
import {displayLine} from '../../../utils';

interface DoubleSearchLineContainerProps extends SearchLineContainerProps {
  loadingList: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  sliceFunction: any;
  sliceFunctionData?: any;
}

const DoubleSearchLineContainer = ({
  scanKey,
  handleSelect,
  objectList,
  loadingList,
  moreLoading,
  isListEnd,
  sliceFunction,
  sliceFunctionData,
  ...props
}: DoubleSearchLineContainerProps) => {
  const I18n = useTranslator();

  const [navigate, setNavigate] = useState(false);

  const _handleSelect = useCallback(
    (item: any) => {
      setNavigate(current => !current);
      handleSelect(item);
    },
    [handleSelect],
  );

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {alternativeBarcodeList} = useSelector(
    state => state.stock_alternativeBarcode,
  );

  const _sliceFunctionData = useMemo(
    () => ({...(sliceFunctionData ?? {}), alternativeBarcodeList}),
    [alternativeBarcodeList, sliceFunctionData],
  );

  const renderDoubleSearchBar = useCallback(() => {
    return (
      <DoubleScannerSearchBar
        style={styles.searchbar}
        onChangeValue={_handleSelect}
        displayValue={displayLine}
        placeholderSearchBar={I18n.t('Stock_SearchLine')}
        list={objectList}
        loadingList={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={sliceFunction}
        sliceFunctionData={_sliceFunctionData}
        sliceBarCodeFunction={searchAlternativeBarcode}
        scanKeySearch={scanKey}
        navigate={navigate}
        oneFilter={true}
        isFocus={true}
        changeScreenAfter={true}
        selectLastItem={true}
        scanKeyBarCode={`${scanKey}_alternative-barcode`}
        displayBarCodeInput={baseConfig?.enableMultiBarcodeOnProducts}
      />
    );
  }, [
    I18n,
    _handleSelect,
    _sliceFunctionData,
    baseConfig?.enableMultiBarcodeOnProducts,
    isListEnd,
    loadingList,
    moreLoading,
    navigate,
    objectList,
    scanKey,
    sliceFunction,
  ]);

  return (
    <SearchLineContainer
      {...props}
      objectList={objectList}
      handleSelect={handleSelect}
      scanKey={scanKey}
      renderCustomSearchBar={renderDoubleSearchBar}
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    width: '100%',
  },
});

export default DoubleSearchLineContainer;
