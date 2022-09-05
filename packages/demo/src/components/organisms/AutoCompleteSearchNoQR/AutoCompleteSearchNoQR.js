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
  let timeOutRequestCall = useRef();
  let intervalRequestCall = useRef();

  useEffect(() => {
    if (value) {
      setSearchText(displayValue(value));
    }
  }, [displayValue, value]);

  const handleSelect = item => {
    setDisplayList(false);
    if (changeScreenAfter) {
      setSearchText('');
    }
    onChangeValue(item);
  };

  useEffect(() => {
    if (navigate) {
      setSearchText('');
    }
  }, [navigate]);

  const handleClear = () => {
    setDisplayList(false);
    onChangeValue(null);
    setPreviousState(searchText);
    setSearchText('');
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
  }, [handleTimeOut, oneFilter, searchText]);

  const handleTimeOut = useCallback(() => {
    stopInterval();
    if (searchText == null && searchText === '') {
      fetchData(null);
    } else {
      fetchData(searchText);
    }
  }, [fetchData, searchText, stopInterval]);

  const handleAPICall = useCallback(() => {
    if (searchText == null && searchText === '') {
      fetchData(null);
    } else {
      fetchData(searchText);
    }
  }, [fetchData, searchText]);

  useEffect(() => {
    if (objectList != null && searchText != null && searchText !== '') {
      if (objectList.length === 1) {
        handleChangeScreen();
      } else {
        setDisplayList(true);
      }
    }
  }, [handleChangeScreen, objectList, onChangeValue, searchText]);

  const handleChangeScreen = useCallback(() => {
    if (changeScreenAfter || oneFilter) {
      setSearchText('');
    } else {
      setSearchText(displayValue(objectList[0]));
      setDisplayList(false);
    }
    onChangeValue(objectList[0]);
  }, [changeScreenAfter, displayValue, objectList, onChangeValue, oneFilter]);

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
      {displayList && !oneFilter && (
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
