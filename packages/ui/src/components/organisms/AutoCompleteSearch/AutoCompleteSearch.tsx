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
  title?: string;
  objectList: any[];
  value?: any;
  required?: boolean;
  readonly?: boolean;
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
  isScannableInput?: boolean;
}

const AutoCompleteSearch = ({
  title,
  objectList,
  value = null,
  required = false,
  readonly = false,
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
  isScannableInput,
}: AutocompleteSearchProps) => {
  const [displayList, setDisplayList] = useState(false);
  const [previousState, setPreviousState] = useState(null);
  const [selected, setSelected] = useState(value ? true : false);
  const [isPopupVisible, setPopupIsVisible] = useState(false);
  const [searchText, setSearchText] = useState(
    value ? displayValue(value) : null,
  );
  let timeOutRequestCall = useRef<number>(null);
  let intervalRequestCall = useRef<number>(null);
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

  const handleLastItem = useCallback(
    (set: any[]) => {
      if (isValidString(searchText) && !selected) {
        if (set.length === 1 && selectLastItem) {
          const shouldResetValue = changeScreenAfter || oneFilter;
          setSearchText(shouldResetValue ? '' : displayValue(set[0]));
          setDisplayList(false);
          stopInterval();
          onChangeValue?.(set[0]);
        } else {
          setDisplayList(true);
        }
      }
    },
    [
      changeScreenAfter,
      displayValue,
      onChangeValue,
      oneFilter,
      searchText,
      selectLastItem,
      selected,
      stopInterval,
    ],
  );

  useEffect(() => {
    if (Array.isArray(objectList)) handleLastItem(objectList);
    // Only declench itself when objectList change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectList]);

  const handleFocus = useCallback(() => {
    setDisplayList(true);
    onSelection();
    handleAPICall();
  }, [handleAPICall, onSelection]);

  const handleDetailsView = useCallback(() => {
    stopInterval();
    stopTimeout();
    setPopupIsVisible(true);
    setDisplayList(false);
  }, [stopInterval, stopTimeout]);

  const handleSearchValueChange = useCallback(
    (input: string) => {
      setPreviousState(searchText);
      setSearchText(input);
      setSelected(false);
    },
    [searchText],
  );

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
      const visibleListLength = Math.max(
        !Array.isArray(objectList) ? 0 : Math.min(objectList.length, 5),
        1,
      );

      return visibleListLength * ITEM_HEIGHT + 5;
    }

    return null;
  }, [displayList, isScrollViewContainer, objectList]);

  const styles = useMemo(
    () => getStyles(displayList, marginBottom),
    [displayList, marginBottom],
  );

  return (
    <View
      ref={wrapperRef}
      style={[
        styles.container,
        Platform.OS === 'ios' ? styles.containerZIndex : null,
        style,
      ]}>
      <SearchBar
        title={title}
        inputRef={inputRef}
        style={styles.alignContainer}
        valueTxt={searchText}
        placeholder={placeholder}
        required={required}
        readonly={readonly}
        onClearPress={handleClear}
        onChangeTxt={handleSearchValueChange}
        onSelection={handleFocus}
        onSearchPress={handleDetailsView}
        disableSearchPress={!showDetailsPopup}
        onScanPress={onScanPress}
        scanIconColor={scanIconColor}
        selected={selected}
        isScannableInput={isScannableInput}
      />
      {displayList && !oneFilter && (
        <SelectionContainer
          style={styles.alignContainer}
          objectList={objectList}
          displayValue={displayValue}
          handleSelect={handleSelect}
          handleMoreResult={handleDetailsView}
          translator={translator}
        />
      )}
      {isPopupVisible && (
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
      )}
    </View>
  );
};

const getStyles = (displayList: boolean, marginBottom: number) =>
  StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
      marginBottom: marginBottom,
    },
    containerZIndex: {
      zIndex: displayList ? 100 : 0,
    },
    alignContainer: {
      alignSelf: 'center',
    },
  });

export default AutoCompleteSearch;
