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

import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useClickOutside,
  OUTSIDE_INDICATOR,
} from '../../../hooks/use-click-outside';
import {SelectionContainer} from '../../molecules';
import {SearchBar} from '../../organisms';

const isValidString = (string: String) => {
  return typeof string === 'string' && string !== '';
};

const TIME_WITHOUT_INPUT = 2000;
const TIME_BETWEEN_CALL = 1000;

interface AutocompleteSearchProps {
  objectList: any[];
  value?: any;
  onChangeValue?: (any) => void;
  fetchData?: (any) => void;
  displayValue?: (any) => string;
  placeholder?: string;
  changeScreenAfter?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onSelection?: () => void;
  onScanPress?: () => void;
  scanIconColor?: string;
  selectLastItem?: boolean;
  style?: any;
}

const AutoCompleteSearch = ({
  objectList,
  value = null,
  onChangeValue,
  fetchData = () => {},
  displayValue,
  placeholder,
  changeScreenAfter = false,
  navigate = false,
  oneFilter = false,
  onSelection = () => {},
  onScanPress,
  scanIconColor = null,
  selectLastItem = true,
  style,
}: AutocompleteSearchProps) => {
  const [displayList, setDisplayList] = useState(false);
  const [previousState, setPreviousState] = useState(null);
  const [selected, setSelected] = useState(value ? true : false);
  const [searchText, setSearchText] = useState(
    value ? displayValue(value) : null,
  );
  let timeOutRequestCall = useRef<number>();
  let intervalRequestCall = useRef<number>();

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
    visible: displayList,
  });

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && displayList) {
      setDisplayList(false);
    }
  }, [clickOutside, displayList]);

  const handleAPICall = useCallback(() => {
    if (!selected) {
      if (searchText == null && searchText === '') {
        fetchData(null);
      } else {
        fetchData(searchText);
      }
    }
  }, [fetchData, searchText, selected]);

  useEffect(() => {
    handleAPICall();
  }, [handleAPICall]);

  const handleSelect = useCallback(
    item => {
      setDisplayList(false);
      setSelected(true);
      setSearchText(changeScreenAfter ? '' : displayValue(item));
      onChangeValue(item);
    },
    [changeScreenAfter, displayValue, onChangeValue],
  );

  useEffect(() => {
    if (oneFilter && navigate != null) {
      setSearchText('');
    }
  }, [navigate, oneFilter]);

  const handleClear = () => {
    setDisplayList(false);
    setSelected(false);
    setPreviousState(searchText);
    setSearchText('');
    onChangeValue(null);
  };

  const stopInterval = useCallback(() => {
    clearInterval(intervalRequestCall.current);
  }, []);

  const handleInterval = useCallback(() => {
    handleAPICall();
  }, [handleAPICall]);

  const handleTimeOut = useCallback(() => {
    stopInterval();
    handleAPICall();
  }, [handleAPICall, stopInterval]);

  useEffect(() => {
    if (!isValidString(previousState) && isValidString(searchText)) {
      const id: any = setInterval(handleInterval, TIME_BETWEEN_CALL);
      intervalRequestCall.current = id;

      return () => {
        stopInterval();
      };
    }
  }, [handleInterval, previousState, searchText, stopInterval]);

  useEffect(() => {
    if (isValidString(searchText)) {
      const id: any = setTimeout(handleTimeOut, TIME_WITHOUT_INPUT);
      timeOutRequestCall.current = id;

      return () => {
        clearTimeout(timeOutRequestCall.current);
      };
    }
  }, [handleTimeOut, searchText]);

  const handleSearchValueChange = useCallback(
    input => {
      if (Array.isArray(objectList) && isValidString(input) && !selected) {
        if (objectList.length === 1 && selectLastItem) {
          setSearchText(
            changeScreenAfter || oneFilter ? '' : displayValue(objectList[0]),
          );
          setDisplayList(false);
          stopInterval();
          onChangeValue(objectList[0]);
        } else {
          setDisplayList(true);
        }
      }
      setPreviousState(searchText);
      setSearchText(input);
    },
    [
      changeScreenAfter,
      displayValue,
      objectList,
      selectLastItem,
      onChangeValue,
      oneFilter,
      searchText,
      selected,
      stopInterval,
    ],
  );

  const handleFocus = useCallback(() => {
    setDisplayList(true);
    onSelection();
  }, [onSelection]);

  const handleSearchPress = useCallback(() => {
    setDisplayList(true);
  }, []);

  useEffect(() => {
    if (isValidString(value)) {
      handleSearchValueChange(value);
    }
  }, [displayValue, handleSearchValueChange, value]);

  const styles = useMemo(() => getStyles(displayList), [displayList]);

  return (
    <View ref={wrapperRef} style={styles.container}>
      <SearchBar
        style={style}
        valueTxt={searchText}
        placeholder={placeholder}
        onClearPress={handleClear}
        onChangeTxt={handleSearchValueChange}
        onSelection={handleFocus}
        onSearchPress={handleSearchPress}
        onScanPress={onScanPress}
        scanIconColor={scanIconColor}
      />
      {displayList && !oneFilter && (
        <SelectionContainer
          style={style}
          objectList={objectList}
          displayValue={displayValue}
          handleSelect={handleSelect}
        />
      )}
    </View>
  );
};

const getStyles = displayList =>
  StyleSheet.create({
    container: {
      zIndex: displayList ? 45 : 0,
    },
  });

export default AutoCompleteSearch;
