import React, {useState, useEffect, useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {AutocompleteItem, SearchBarNoQR} from '@/components/molecules';

const TIME_WITHOUT_INPUT = 1000;
const TIME_BETWEEN_CALL = 1000;

interface AutocompleteSearchProps<T> {
  objectList: T[];
  value?: T;
  onChangeValue?: (value: T) => void;
  fetchData?: (value: T) => void;
  displayValue?: (value: T) => string;
  placeholder?: string;
  isFocus?: Boolean;
  changeScreenAfter?: Boolean;
  navigate?: Boolean;
  oneFilter?: Boolean;
}

const AutoCompleteSearchNoQR = ({
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
}: AutocompleteSearchProps) => {
  const [displayList, setDisplayList] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [previousState, setPreviousState] = useState(null);
  const [newInterval, setNewInterval] = useState(0);
  const [selected, setSelected] = useState(false);
  let timeOutRequestCall = useRef();
  let intervalRequestCall = useRef();

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

  useEffect(() => {
    if (searchText != null) {
      const id = setTimeout(handleTimeOut, TIME_WITHOUT_INPUT);
      timeOutRequestCall.current = id;

      return () => {
        clearTimeout(timeOutRequestCall.current);
      };
    }
  }, [handleTimeOut, searchText]);

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
    if (
      objectList != null &&
      searchText != null &&
      searchText !== '' &&
      !selected
    ) {
      if (objectList.length === 1) {
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
    onChangeValue,
    oneFilter,
    searchText,
    selected,
    stopInterval,
  ]);

  return (
    <View>
      <SearchBarNoQR
        valueTxt={searchText}
        placeholder={placeholder}
        onChangeTxt={input => {
          setPreviousState(searchText);
          setSearchText(input);
        }}
        onClearPress={handleClear}
        onEndFocus={() => setDisplayList(false)}
        isFocus={isFocus}
      />
      {objectList != null &&
        objectList.length > 0 &&
        displayList &&
        !oneFilter && (
          <View style={styles.flatListContainer}>
            {objectList.slice(0, 4).map(item => (
              <AutocompleteItem
                key={item?.id.toString()}
                content={displayValue(item)}
                onPress={() => handleSelect(item)}
              />
            ))}
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    height: 200, // 4 items : 4*flatListItem.height
    width: '100%',
    position: 'absolute',
    top: '90%',
    zIndex: 2,
  },
});

export default AutoCompleteSearchNoQR;
