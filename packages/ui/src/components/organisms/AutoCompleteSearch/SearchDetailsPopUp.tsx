/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useState, useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {checkNullString} from '../../../utils';
import {Alert} from '../../molecules';
import {AutoCompleteSearch, ScrollList} from '../../organisms';
import ItemCard from './ItemCard';

interface SearchDetailsPopUpProps {
  isVisible: boolean;
  objectList: any[];
  value?: any;
  placeholder?: string;
  displayValue?: (item: any) => string;
  onClose?: () => void;
  onSelect?: (item: any) => void;
  fetchData?: ({
    page,
    searchValue,
  }: {
    page?: number;
    searchValue?: string;
  }) => void;
  loadingList?: boolean;
  moreLoading?: boolean;
  isListEnd?: boolean;
  translator?: (translationKey: string) => string;
}

const SearchDetailsPopUp = ({
  isVisible,
  objectList,
  value = null,
  placeholder,
  displayValue,
  onClose,
  onSelect,
  fetchData,
  loadingList,
  moreLoading,
  isListEnd,
  translator,
}: SearchDetailsPopUpProps) => {
  const [searchText, setSearchText] = useState<string>();

  const fetchAPI = useCallback(
    ({page = 0, searchValue}: {page?: number; searchValue?: string}) => {
      if (isVisible) {
        setSearchText(searchValue);
        fetchData?.({page, searchValue});
      }
    },
    [fetchData, isVisible],
  );

  const filterAPI = useCallback((data: any) => fetchAPI(data), [fetchAPI]);

  const scrollAPI = useCallback((page: number) => fetchAPI({page}), [fetchAPI]);

  return (
    <Alert
      visible={isVisible}
      style={styles.popup}
      cancelButtonConfig={{
        showInHeader: true,
        onPress: onClose,
      }}>
      <View style={styles.container}>
        <AutoCompleteSearch
          objectList={objectList}
          onChangeValue={onSelect}
          fetchData={filterAPI}
          displayValue={displayValue}
          placeholder={placeholder}
          oneFilter={true}
          showDetailsPopup={false}
          style={styles.input}
        />
        <ScrollList
          style={styles.scroll}
          loadingList={loadingList ?? false}
          data={objectList}
          renderItem={({item}) => (
            <ItemCard
              onSelect={() => onSelect?.(item)}
              title={displayValue?.(item)}
              isSelected={value === displayValue?.(item)}
            />
          )}
          fetchData={scrollAPI}
          moreLoading={moreLoading ?? false}
          isListEnd={isListEnd ?? true}
          filter={!checkNullString(searchText)}
          translator={translator}
        />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  popup: {
    height: Dimensions.get('window').height * 0.9,
    maxHeight: null,
    paddingHorizontal: 10,
    paddingRight: 10,
    paddingVertical: 10,
    position: 'absolute',
    gap: 0,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  input: {
    width: '100%',
  },
  scroll: {
    flex: 1,
  },
});

export default SearchDetailsPopUp;
