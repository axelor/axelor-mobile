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

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View} from 'react-native';
import {SelectionContainer} from '../../molecules';
import {SearchBar} from '../../organisms';

const TIME_WITHOUT_INPUT = 1000;
const TIME_BETWEEN_CALL = 1000;

interface AutocompleteSearchProps {
  objectList: any[];
  value?: any;
  onChangeValue?: (any) => void;
  fetchData?: (any) => void;
  displayValue?: (any) => string;
  placeholder?: string;
  isFocus?: boolean;
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
  isFocus = false,
  changeScreenAfter = false,
  navigate = false,
  oneFilter = false,
  onSelection,
  onScanPress,
  scanIconColor = null,
  selectLastItem = true,
  style,
}: AutocompleteSearchProps) => {
  const [displayList, setDisplayList] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [previousState, setPreviousState] = useState(null);
  const [newInterval, setNewInterval] = useState(0);
  const [selected, setSelected] = useState(false);
  let timeOutRequestCall = useRef<number>();
  let intervalRequestCall = useRef<number>();

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
    if (value) {
      setSelected(true);
      setSearchText(displayValue(value));
    } else {
      handleAPICall();
    }
  }, [displayValue, handleAPICall, value]);

  const handleSelect = item => {
    setDisplayList(false);
    setSelected(true);
    if (changeScreenAfter) {
      setSearchText('');
    }
    onChangeValue(item);
  };

  useEffect(() => {
    if (navigate && oneFilter) {
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

  useEffect(() => {
    if (
      (previousState === '' || previousState == null) &&
      searchText != null &&
      searchText !== ''
    ) {
      const id = setInterval(
        () => setNewInterval(state => state + 1),
        TIME_BETWEEN_CALL,
      );
      intervalRequestCall.current = id;
    }
  }, [previousState, searchText]);

  const stopInterval = useCallback(() => {
    clearInterval(intervalRequestCall.current);
    setNewInterval(0);
  }, []);

  useEffect(() => {
    if (newInterval > 0) {
      handleAPICall();
    }
  }, [handleAPICall, newInterval]);

  const handleTimeOut = useCallback(() => {
    stopInterval();
    if (!selected) {
      if (searchText == null && searchText === '') {
        fetchData(null);
      } else {
        fetchData(searchText);
      }
    }
  }, [fetchData, searchText, selected, stopInterval]);

  useEffect(() => {
    if (searchText != null) {
      const id: number = setTimeout(handleTimeOut, TIME_WITHOUT_INPUT);
      timeOutRequestCall.current = id;

      return () => {
        clearTimeout(timeOutRequestCall.current);
      };
    }
  }, [handleTimeOut, searchText]);

  useEffect(() => {
    if (
      objectList != null &&
      searchText != null &&
      searchText !== '' &&
      !selected
    ) {
      if (objectList.length === 1 && selectLastItem === true) {
        if (changeScreenAfter || oneFilter) {
          setSearchText('');
        } else {
          setSearchText(displayValue(objectList[0]));
          setDisplayList(false);
        }
        stopInterval();
        onChangeValue(objectList[0]);
      } else {
        setDisplayList(true);
      }
    }
  }, [
    changeScreenAfter,
    displayValue,
    objectList,
    selectLastItem,
    onChangeValue,
    oneFilter,
    searchText,
    selected,
    stopInterval,
  ]);

  return (
    <View>
      <SearchBar
        style={style}
        valueTxt={searchText}
        placeholder={placeholder}
        onClearPress={handleClear}
        onChangeTxt={input => {
          setPreviousState(searchText);
          setSearchText(input);
        }}
        onSelection={onSelection}
        onEndFocus={() => setDisplayList(false)}
        isFocus={isFocus}
        onScanPress={onScanPress}
        scanIconColor={scanIconColor}
      />
      {displayList && !oneFilter && (
        <SelectionContainer
          objectList={objectList}
          displayValue={displayValue}
          handleSelect={handleSelect}
        />
      )}
    </View>
  );
};

export default AutoCompleteSearch;
