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

import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {
  useClickOutside,
  OUTSIDE_INDICATOR,
} from '../../../hooks/use-click-outside';
import {SelectionContainer} from '../../molecules';
import {SearchBar} from '../../organisms';
import SearchDetailsPopUp from './SearchDetailsPopUp';

const isValidString = (string: String) => {
  return typeof string === 'string' && string !== '';
};

const TIME_WITHOUT_INPUT = 2000;
const TIME_BETWEEN_CALL = 1000;

const ITEM_HEIGHT = 40;

interface AutocompleteSearchProps {
  objectList: any[];
  value?: any;
  onChangeValue?: (item: any) => void;
  fetchData?: ({
    page,
    searchValue,
  }: {
    page: number;
    searchValue: string;
  }) => void;
  displayValue?: (item: any) => string;
  placeholder?: string;
  changeScreenAfter?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onSelection?: () => void;
  onScanPress?: () => void;
  scanIconColor?: string;
  selectLastItem?: boolean;
  style?: any;
  showDetailsPopup?: boolean;
  loadingList?: boolean;
  moreLoading?: boolean;
  isListEnd?: boolean;
  translator?: (translationKey: string) => string;
  isScrollViewContainer?: boolean;
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
  showDetailsPopup = false,
  loadingList,
  moreLoading,
  isListEnd,
  translator,
  isScrollViewContainer = false,
}: AutocompleteSearchProps) => {
  const [displayList, setDisplayList] = useState(false);
  const [previousState, setPreviousState] = useState(null);
  const [selected, setSelected] = useState(value ? true : false);
  const [isPopupVisible, setPopupIsVisible] = useState(false);
  const [searchText, setSearchText] = useState(
    value ? displayValue(value) : null,
  );
  let timeOutRequestCall = useRef<number>();
  let intervalRequestCall = useRef<number>();
  const inputRef = useRef<TextInput>(null);

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
  });

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && displayList) {
      inputRef?.current?.blur();
      setDisplayList(false);
    }
  }, [clickOutside, displayList]);

  const fetchDataAPI = useCallback(
    ({page = 0, searchValue}) => {
      fetchData({page, searchValue});
    },
    [fetchData],
  );

  const handleAPICall = useCallback(() => {
    if (!selected) {
      fetchDataAPI({
        searchValue: isValidString(searchText) ? searchText : null,
      });
    }
  }, [fetchDataAPI, searchText, selected]);

  useEffect(() => {
    handleAPICall();
  }, [handleAPICall]);

  const handleSelect = useCallback(
    item => {
      if (item !== null) {
        inputRef?.current?.blur();
        setDisplayList(false);
        setSelected(true);
        setSearchText(changeScreenAfter ? '' : displayValue(item));
        setPopupIsVisible(false);
        onChangeValue?.(item);
      }
    },
    [changeScreenAfter, displayValue, onChangeValue],
  );

  useEffect(() => {
    if (oneFilter && navigate != null) {
      setSearchText('');
    }
  }, [navigate, oneFilter]);

  const handleClear = useCallback(() => {
    setSelected(false);
    setPreviousState(searchText);
    setSearchText('');
    onChangeValue?.(null);
  }, [onChangeValue, searchText]);

  const stopInterval = useCallback(() => {
    clearInterval(intervalRequestCall.current);
  }, []);

  const stopTimeout = useCallback(() => {
    clearTimeout(timeOutRequestCall.current);
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
        stopTimeout();
      };
    }
  }, [handleTimeOut, searchText, stopTimeout]);

  const handleSearchValueChange = useCallback(
    input => {
      if (Array.isArray(objectList) && isValidString(input) && !selected) {
        if (objectList.length === 1 && selectLastItem) {
          setSearchText(
            changeScreenAfter || oneFilter ? '' : displayValue(objectList[0]),
          );
          setDisplayList(false);
          stopInterval();
          onChangeValue?.(objectList[0]);
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

  const handleDetailsView = useCallback(() => {
    stopInterval();
    stopTimeout();
    setPopupIsVisible(true);
    setDisplayList(false);
  }, [stopInterval, stopTimeout]);

  useEffect(() => {
    if (isValidString(value)) {
      handleSearchValueChange(value);
    }

    if (value != null && isValidString(displayValue(value))) {
      handleSearchValueChange(displayValue(value));
      setSelected(true);
      setDisplayList(false);
    }

    if (value == null && selected) {
      handleClear();
    }
  }, [displayValue, handleClear, handleSearchValueChange, selected, value]);

  const marginBottom = useMemo(() => {
    if (isScrollViewContainer && displayList) {
      return 5 * ITEM_HEIGHT + 5;
    }

    return null;
  }, [isScrollViewContainer, displayList]);

  const styles = useMemo(
    () => getStyles(displayList, marginBottom),
    [displayList, marginBottom],
  );

  return (
    <View
      ref={wrapperRef}
      style={[
        styles.marginContainer,
        Platform.OS === 'ios' ? styles.searchBarContainer : null,
      ]}>
      <SearchBar
        inputRef={inputRef}
        style={[styles.alignContainer, style]}
        valueTxt={searchText}
        placeholder={placeholder}
        onClearPress={handleClear}
        onChangeTxt={handleSearchValueChange}
        onSelection={handleFocus}
        onSearchPress={handleDetailsView}
        disableSearchPress={!showDetailsPopup}
        onScanPress={onScanPress}
        scanIconColor={scanIconColor}
        selected={selected}
      />
      {displayList && !oneFilter && (
        <SelectionContainer
          style={[styles.alignContainer, style]}
          objectList={objectList}
          displayValue={displayValue}
          handleSelect={handleSelect}
          handleMoreResult={handleDetailsView}
          translator={translator}
        />
      )}
      <SearchDetailsPopUp
        isVisible={isPopupVisible}
        objectList={objectList}
        value={searchText}
        placeholder={placeholder}
        displayValue={displayValue}
        onClose={() => setPopupIsVisible(false)}
        onSelect={handleSelect}
        fetchData={fetchData}
        loadingList={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={translator}
      />
    </View>
  );
};

const getStyles = (displayList, marginBottom) =>
  StyleSheet.create({
    searchBarContainer: {
      zIndex: displayList ? 45 : 0,
    },
    marginContainer: {
      marginBottom: marginBottom,
      width: '100%',
      alignSelf: 'center',
    },
    alignContainer: {
      alignSelf: 'center',
    },
  });

export default AutoCompleteSearch;
