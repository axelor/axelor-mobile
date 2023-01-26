import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  ChipSelect,
  Chip,
  AutoCompleteSearch,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchCatalog, fetchCatalogType} from '../../features/catalogSlice';
import {CatalogCard} from '../../components';
import Catalog from '../../types/catalog';

const CatalogListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const {loadingCatalog, moreLoading, isListEnd, catalogList, catalogTypeList} =
    useSelector(state => state.catalog);
  const [filteredList, setFilteredList] = useState(catalogList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);
  const [catalog, setCatalog] = useState(null);

  const fetchCatalogAPI = useCallback(
    page => {
      dispatch(fetchCatalog({searchValue: filter, page: page}));
    },
    [dispatch, filter],
  );

  const fetchCatalogFilter = useCallback(
    searchValue => {
      setFilter(searchValue);
      dispatch(fetchCatalog({searchValue: searchValue, page: 0}));
    },
    [dispatch],
  );

  const updateStatus = status => {
    if (isSelected(status)) {
      setSelectedStatus(
        selectedStatus?.filter(activeStatus => activeStatus.id !== status.id),
      );
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const isSelected = status => {
    return (
      selectedStatus?.find(activeStatus => activeStatus.id === status.id) !=
      null
    );
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (selectedStatus.length > 0) {
          return list?.filter(item =>
            selectedStatus.find(status => item?.catalogType?.id === status.id),
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
  );

  useEffect(() => {
    dispatch(fetchCatalogType());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(filterOnStatus(catalogList));
  }, [catalogList, filterOnStatus]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <AutoCompleteSearch
              objectList={catalogList}
              value={catalog}
              onChangeValue={setCatalog}
              fetchData={fetchCatalogFilter}
              placeholder={I18n.t('Crm_Catalogs')}
              oneFilter={true}
              selectLastItem={false}
            />
          </View>
        }
        chipComponent={
          <ChipSelect scrollable={true}>
            {catalogTypeList.map((status, index) => {
              return (
                <Chip
                  key={index}
                  selected={isSelected(status)}
                  title={status.name}
                  onPress={() => updateStatus(status)}
                  selectedColor={Catalog.getStatusColor(index, Colors)}
                  marginHorizontal={5}
                />
              );
            })}
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loadingCatalog}
        data={filteredList}
        renderItem={({item}) => (
          <CatalogCard
            style={styles.item}
            id={item.id}
            version={item.version}
            description={item.description}
            name={item.name}
            category={item.catalogType?.name}
            catalogueType={item.catalogType}
            allCatalogType={catalogTypeList}
            pdfFile={item.pdfFile}
          />
        )}
        fetchData={fetchCatalogAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {
    alignItems: 'center',
  },
  toggleSwitchContainer: {
    width: '90%',
    height: 40,
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default CatalogListScreen;
