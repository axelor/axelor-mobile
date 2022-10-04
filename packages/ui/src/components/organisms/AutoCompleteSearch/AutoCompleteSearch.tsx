import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../../atoms';
import {SearchBar} from '../../organisms';
import {useThemeColor} from '../../../theme/ThemeContext';

interface AutocompleteItemProps {
  style?: any;
  content: string;
  onPress: (any) => void;
}

const AutocompleteItem = ({style, content, onPress}: AutocompleteItemProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return content == null ? null : (
    <TouchableOpacity style={[styles.item, style]} onPress={onPress}>
      <Text style={styles.text}>{content}</Text>
    </TouchableOpacity>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    item: {
      height: 50,
      flexDirection: 'row',
      backgroundColor: Colors.backgroundColor,
      marginHorizontal: 15,
      paddingLeft: 15,
      paddingVertical: 15,
      borderBottomColor: Colors.primaryColor,
      borderBottomWidth: 1,
      position: 'relative',
      zIndex: 50,
    },
    text: {
      fontSize: 18,
    },
  });

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
      <SearchBar
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

export default AutoCompleteSearch;
