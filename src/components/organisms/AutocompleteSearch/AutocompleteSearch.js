import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SearchBar, AutocompleteItem} from '@/components/molecules';
import {useDispatch} from 'react-redux';
import {enableScan} from '@/features/scannerSlice';

interface AutocompleteSearchProps<T> {
  objectList: T[];
  value?: T;
  onChangeValue?: (value: T) => void;
  displayValue?: (value: T) => string;
  filter?: (item: T, search: string) => boolean;
  placeholder?: string;
  scanKey?: string;
}

const AutocompleteSearch = ({
  objectList,
  value,
  onChangeValue,
  displayValue,
  filter,
  placeholder,
  scanKey,
}: AutocompleteSearchProps) => {
  const [displayList, setDisplayList] = useState(false);
  const [searchText, setSearchText] = useState('');
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
    dispatch(enableScan(scanKey));
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
        onScanPress={scanKey ? handlePressScan : undefined}
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
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    paddingLeft: 15,
    paddingVertical: 15,
    fontSize: 18,
    borderBottomColor: '#84DCB7',
    borderBottomWidth: 1,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
});

export default AutocompleteSearch;
