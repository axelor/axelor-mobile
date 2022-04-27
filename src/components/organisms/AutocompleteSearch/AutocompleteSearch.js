import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SearchBar, AutocompleteItem} from '@/components/molecules';

const AutocompleteSearch = ({
  objectList,
  searchName,
  searchParam,
  setValueSearch,
}) => {
  const [toggleList, setToggleList] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setData(objectList);
    setFilteredList(objectList.slice());
  }, [objectList]);

  const updateQuery = input => {
    setFilteredList(data.slice());
    setQuery(input);
  };

  const filter = object => {
    if (object[searchParam].toLowerCase().includes(query.toLowerCase())) {
      return object[searchParam];
    } else {
      filteredList.splice(filteredList.indexOf(object), 1);
      return null;
    }
  };

  const handleSelect = item => {
    setToggleList(false);
    setQuery(item.name);
    setValueSearch(item.id);
  };

  const handleClear = () => {
    setToggleList(false);
    setQuery('');
    setValueSearch('');
  };

  return (
    <View>
      <SearchBar
        valueTxt={query}
        style={styles.searchBar}
        placeholder={searchName}
        onChangeTxt={updateQuery}
        onClearPress={handleClear}
        onSelection={() => setToggleList(true)}
      />
      {toggleList ? (
        <FlatList
          data={filteredList}
          keyExtractor={item => item.id.toString()}
          extraData={query}
          style={styles.flatListContainer}
          renderItem={({item}) => (
            <AutocompleteItem
              style={styles.flatListItem}
              content={filter(item)}
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
