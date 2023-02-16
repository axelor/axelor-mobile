import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AnyAction} from '@reduxjs/toolkit';
import {
  AutoCompleteSearch,
  Text,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {stringNoAccent} from '../../../utils/string';
import {useDispatch} from '../../../redux/hooks';

interface AutoCompleteSearchInputProps {
  title?: string;
  objectList: any[];
  value?: any;
  searchField: string;
  onChangeValue?: (any) => void;
  onSelection?: () => void;
  searchAPI?: ({searchValue}: {searchValue: string}) => AnyAction;
  placeholder?: string;
  style?: any;
  styleTxt?: any;
  required?: boolean;
  selectLastItem?: boolean;
}

const AutoCompleteSearchInput = ({
  title,
  objectList,
  value = null,
  searchField,
  onChangeValue,
  onSelection,
  searchAPI,
  placeholder,
  style,
  styleTxt,
  required = false,
  selectLastItem = true,
}: AutoCompleteSearchInputProps) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [filteredList, setFilteredList] = useState(objectList);
  const [searchValue, setSearchValue] = useState(null);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const filterSearchList = useCallback(
    _searchValue => {
      if (_searchValue == null || _searchValue === '') {
        return [];
      }

      const objectFiltredList =
        objectList?.filter(item =>
          stringNoAccent(item[searchField])
            .toLowerCase()
            .includes(stringNoAccent(_searchValue).toLowerCase()),
        ) || [];

      if (objectFiltredList.length === 0 && searchAPI) {
        dispatch(searchAPI({searchValue: _searchValue}));
      }

      return objectFiltredList;
    },
    [dispatch, objectList, searchAPI, searchField],
  );

  useEffect(() => {
    setFilteredList(filterSearchList(searchValue));
  }, [filterSearchList, searchValue]);

  return (
    <View style={style}>
      <Text style={[styles.title, styleTxt]}>{title}</Text>
      <AutoCompleteSearch
        style={[value == null && required ? styles.requiredBorder : null]}
        value={value}
        objectList={filteredList}
        onChangeValue={onChangeValue}
        onSelection={onSelection}
        fetchData={setSearchValue}
        placeholder={placeholder}
        displayValue={item => item[searchField]}
        selectLastItem={selectLastItem}
      />
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      marginHorizontal: 24,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default AutoCompleteSearchInput;
