import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SearchBar, AutocompleteItem} from '@/components/molecules';
import {useDispatch} from 'react-redux';
import {enableScan, useScannerSelector} from '@/features/scannerSlice';
import Colors from '@/types/colors';

interface AutocompleteSearchProps<T> {
  objectList: T[];
  value?: T;
  onChangeValue?: (value: T) => void;
  displayValue?: (value: T) => string;
  filter?: (item: T, search: string) => boolean;
  placeholder?: string;
  scanKeySearch?: string;
}

const AutocompleteSearch = ({
  objectList,
  value,
  onChangeValue,
  displayValue,
  filter,
  placeholder,
  scanKeySearch,
}: AutocompleteSearchProps) => {
  const [displayList, setDisplayList] = useState(false);
  const [searchText, setSearchText] = useState('');
  const {isEnabled, scanKey} = useScannerSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (value) {
      setSearchText(displayValue(value));
    } else {
      setSearchText('');
    }
  }, [displayValue, value]);

  const handleSelect = item => {
    setDisplayList(false);
    onChangeValue(item);
  };

  const handleChangeText = text => {
    setDisplayList(true);
    setSearchText(text);
  };

  const handleClear = () => {
    setDisplayList(false);
    onChangeValue(null);
    setSearchText('');
  };

  const handlePressScan = () => {
    dispatch(enableScan(scanKeySearch));
  };

  const filteredList = useMemo(() => {
    if (filter) {
      return objectList.filter(item => filter(item, searchText));
    }
    return objectList;
  }, [objectList, filter, searchText]);

  return (
    <View>
      <SearchBar
        valueTxt={searchText}
        style={styles.searchBar}
        placeholder={placeholder}
        onChangeTxt={handleChangeText}
        onClearPress={handleClear}
        onSelection={() => setDisplayList(true)}
        onScanPress={scanKeySearch ? handlePressScan : undefined}
        scanIconColor={
          isEnabled && scanKey === scanKeySearch
            ? Colors.icon.green
            : Colors.icon.dark_grey
        }
      />
      {displayList ? (
        <FlatList
          data={filteredList}
          keyExtractor={item => item.id.toString()}
          extraData={''}
          style={styles.flatListContainer}
          renderItem={({item}) => (
            <AutocompleteItem
              style={styles.flatListItem}
              content={displayValue(item)}
              onPress={() => handleSelect(item)}
            />
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    height: 200, // 4 items : 4*flatListItem.height
  },
  flatListItem: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background.white,
    marginHorizontal: 15,
    paddingLeft: 15,
    paddingVertical: 15,
    fontSize: 18,
    borderBottomColor: Colors.border.green,
    borderBottomWidth: 1,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
});

export default AutocompleteSearch;
