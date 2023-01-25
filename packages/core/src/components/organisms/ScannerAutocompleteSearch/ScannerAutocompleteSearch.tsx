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

import React, {useState, useEffect, useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AutoCompleteSearch, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  enableScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../../../features/scannerSlice';
import {CameraScanner} from '../../external';

interface AutocompleteSearchProps {
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
  searchBarKey?: number;
  selectLastItem?: boolean;
}

const ScannerAutocompleteSearch = ({
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
  searchBarKey = 1,
  selectLastItem = true,
}: AutocompleteSearchProps) => {
  const [camScan, setCamScan] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [viewCoordinate, setViewCoordinate] = useState(null);
  const [searchText, setSearchText] = useState(value);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(scanKeySearch);
  const dispatch = useDispatch();

  useEffect(() => {
    if (scannedValue) {
      setSearchText(scannedValue);
    } else if (scanData != null && scanData.value != null) {
      setCamScan(false);
      setSearchText(scanData.value);
    }
  }, [scanData, scannedValue]);

  const containerPosition = useMemo(() => {
    return getStyles(searchBarKey, camScan)?.container;
  }, [searchBarKey, camScan]);

  const Colors = useThemeColor();

  return (
    <View
      style={containerPosition}
      onLayout={event => {
        const {x, y} = event.nativeEvent.layout;
        setViewCoordinate({x: x, y: y});
      }}>
      <CameraScanner
        isActive={camScan}
        onScan={setScanData}
        coordinate={viewCoordinate}
        onClose={() => setCamScan(false)}
      />
      <AutoCompleteSearch
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
        isFocus={isFocus}
        changeScreenAfter={changeScreenAfter}
        navigate={navigate}
        oneFilter={oneFilter}
        onSelection={() => {
          scanKeySearch ? dispatch(enableScan(scanKeySearch)) : undefined;
        }}
        onScanPress={() => setCamScan(true)}
        scanIconColor={
          isEnabled && scanKey === scanKeySearch
            ? Colors.primaryColor.background
            : Colors.secondaryColor_dark.background
        }
      />
    </View>
  );
};

const getStyles = (key, isActive) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: isActive ? 20 + key : 20 - key,
      width: Dimensions.get('window').width,
    },
  });

export default ScannerAutocompleteSearch;
