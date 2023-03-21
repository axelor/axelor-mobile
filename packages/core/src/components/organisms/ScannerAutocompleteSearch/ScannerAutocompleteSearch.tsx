/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useState, useEffect} from 'react';
import {AutoCompleteSearch, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {useCameraScannerValueByKey} from '../../../features/cameraScannerSlice';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../../../hooks/use-scan-activator';

interface AutocompleteSearchProps {
  style?: any;
  objectList: any[];
  value?: string;
  onChangeValue?: (value: any) => void;
  fetchData?: (value: any) => void;
  displayValue?: (value: any) => string;
  placeholder?: string;
  scanKeySearch?: string;
  isFocus?: boolean;
  changeScreenAfter?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  selectLastItem?: boolean;
}

const ScannerAutocompleteSearch = ({
  style,
  objectList,
  value,
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
}: AutocompleteSearchProps) => {
  const [searchText, setSearchText] = useState(value);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(scanKeySearch);
  const scanData = useCameraScannerValueByKey(scanKeySearch);
  const {enable: onScanPress} = useScanActivator(scanKeySearch);
  const {enable: enableScanner} = useScannerDeviceActivator(scanKeySearch);

  useEffect(() => {
    if (scannedValue) {
      setSearchText(scannedValue);
    } else if (scanData?.value != null) {
      setSearchText(scanData.value);
    }
  }, [scanData, scannedValue]);

  const Colors = useThemeColor();

  useEffect(() => {
    if (isFocus) {
      enableScanner();
    }
  }, [enableScanner, isFocus]);

  return (
    <AutoCompleteSearch
      style={style}
      selectLastItem={selectLastItem}
      objectList={objectList}
      value={searchText}
      onChangeValue={result => {
        setSearchText(result);
        onChangeValue(result);
      }}
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
    />
  );
};

export default ScannerAutocompleteSearch;
