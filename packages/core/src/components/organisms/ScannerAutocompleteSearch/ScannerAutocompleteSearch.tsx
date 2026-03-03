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

import React, {useState, useEffect, useCallback} from 'react';
import {AutoCompleteSearch, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  clearScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {
  clearBarcode,
  useCameraScannerValueByKey,
} from '../../../features/cameraScannerSlice';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../../../hooks/use-scan-activator';
import {useIsFocused} from '../../../hooks/use-navigation';
import {useTranslator} from '../../../i18n';
import {useDispatch} from '../../../redux/hooks';

interface AutocompleteSearchProps {
  title?: string;
  objectList: any[];
  value?: string;
  required?: boolean;
  readonly?: boolean;
  onChangeValue?: (value: any) => void;
  fetchData?: ({
    page,
    searchValue,
  }: {
    page: number;
    searchValue: string;
  }) => void;
  displayValue?: (value: any) => string;
  placeholder?: string;
  scanKeySearch?: string;
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
}

const ScannerAutocompleteSearch = ({
  title,
  objectList,
  value,
  required = false,
  readonly = false,
  onChangeValue,
  fetchData,
  displayValue,
  placeholder,
  scanKeySearch,
  isFocus = false,
  changeScreenAfter = false,
  navigate = false,
  oneFilter = false,
  selectLastItem = true,
  style,
  showDetailsPopup = false,
  loadingList,
  moreLoading,
  isListEnd,
  isScrollViewContainer = false,
}: AutocompleteSearchProps) => {
  const I18n = useTranslator();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState(value);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(scanKeySearch);
  const scanData = useCameraScannerValueByKey(scanKeySearch);
  const {enable: onScanPress} = useScanActivator(scanKeySearch);
  const {enable: enableScanner} = useScannerDeviceActivator(scanKeySearch);

  useEffect(() => {
    if (scannedValue) {
      setSearchValue(scannedValue);
      dispatch(clearScan());
    } else if (scanData?.value != null) {
      setSearchValue(scanData.value);
      dispatch(clearBarcode());
    }
  }, [dispatch, scanData, scannedValue]);

  const Colors = useThemeColor();

  useEffect(() => {
    if (isFocus && isFocused) {
      enableScanner();
    }
  }, [enableScanner, isFocus, isFocused]);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleChangeValue = useCallback(
    _value => {
      setSearchValue(_value);
      onChangeValue?.(_value);
    },
    [onChangeValue],
  );

  return (
    <AutoCompleteSearch
      title={title}
      selectLastItem={selectLastItem}
      objectList={objectList}
      value={searchValue}
      required={required}
      readonly={readonly}
      onChangeValue={handleChangeValue}
      fetchData={fetchData}
      displayValue={displayValue}
      placeholder={placeholder}
      changeScreenAfter={changeScreenAfter}
      navigate={navigate}
      oneFilter={oneFilter}
      onSelection={enableScanner}
      onScanPress={onScanPress}
      scanIconColor={
        isEnabled && scanKey === scanKeySearch
          ? Colors.primaryColor.background
          : Colors.secondaryColor_dark.background
      }
      style={style}
      showDetailsPopup={showDetailsPopup}
      translator={I18n.t}
      loadingList={loadingList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      isScrollViewContainer={isScrollViewContainer}
      isScannableInput
    />
  );
};

export default ScannerAutocompleteSearch;
