import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen, IconNew, Text, Button} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {InternalMoveCard} from '@/modules/stock/components/molecules';
import filterList from '@/modules/stock/utils/filter-list';
import getFromList from '@/modules/stock/utils/get-from-list';
import filterListContain from '@/modules/stock/utils/filter-list-contain';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {fetchInternalMoves} from '@/modules/stock/features/internalMoveSlice';

// STATUS SELECT
const STATUS_DRAFT = 1;
const STATUS_PLANNED = 2;
const STATUS_REALIZED = 3;
const STATUS_CANCELED = 4;

const getStatus = option => {
  if (option === STATUS_DRAFT) {
    return 'Draft';
  } else if (option === STATUS_PLANNED) {
    return 'Planned';
  } else if (option === STATUS_REALIZED) {
    return 'Realized';
  } else if (option === STATUS_CANCELED) {
    return 'Canceled';
  } else {
    return option;
  }
};

// AVAILABLE STATUS SELECT
const STATUS_AVAILABLE = 1;
const STATUS_PARTIALLY_AVAILABLE = 2;
const STATUS_UNAVAILABLE = 3;

const getAvailability = option => {
  if (option === STATUS_AVAILABLE) {
    return 'Available';
  } else if (option === STATUS_PARTIALLY_AVAILABLE) {
    return 'Partially';
  } else if (option === STATUS_UNAVAILABLE) {
    return 'Unavailable';
  } else {
    return option;
  }
};

const InternalMoveListScreen = ({navigation}) => {
  const {loadingInternalMove, internalMoveList} = useSelector(
    state => state.internalMove,
  );
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {productList} = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInternalMoves());
    dispatch(fetchStockLocations());
    dispatch(fetchProducts());
  }, [dispatch]);

  // ----------  FILTERS -------------
  const [filteredList, setFilteredList] = useState(internalMoveList);
  const [queryOriginalLocation, setQueryOriginalLocation] = useState('');
  const [queryDestinationLocation, setQueryDestinationLocation] = useState('');
  const [queryProduct, setQueryProduct] = useState('');

  const handleQueryOriginalLocation = locationId => {
    setQueryOriginalLocation(locationId);
  };

  const handleQueryDestinationLocation = locationId => {
    setQueryDestinationLocation(locationId);
  };

  const handleQueryProductChange = productId => {
    setQueryProduct(productId);
  };

  // Filter list on search params
  useEffect(() => {
    setFilteredList(
      filterListContain(
        filterList(
          filterList(
            internalMoveList,
            'fromStockLocation',
            'id',
            queryOriginalLocation,
          ),
          'toStockLocation',
          'id',
          queryDestinationLocation,
        ),
        'stockMoveLineList',
        'productName',
        getFromList(productList, 'id', queryProduct) == null
          ? ''
          : getFromList(productList, 'id', queryProduct).name,
      ),
    );
  }, [
    internalMoveList,
    queryOriginalLocation,
    queryDestinationLocation,
    queryProduct,
  ]);

  // ----------  NAVIGATION -------------
  const showInternalMoveDetails = internalMove => {
    navigation.navigate('InternalMoveDetailsScreen', {
      internalMove: internalMove,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconNew
          onNewPress={() => {
            navigation.navigate('InternalMoveNewOriginalLocationScreen', {});
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <Screen style={styles.container}>
      <AutocompleteSearch
        objectList={stockLocationList}
        searchName="Original Stock Location"
        searchParam="name"
        setValueSearch={handleQueryOriginalLocation}
      />
      <AutocompleteSearch
        objectList={stockLocationList}
        searchName="Destination Stock Location"
        searchParam="name"
        setValueSearch={handleQueryDestinationLocation}
      />
      <AutocompleteSearch
        objectList={productList}
        searchName="Product"
        searchParam="name"
        setValueSearch={handleQueryProductChange}
      />
      {loadingInternalMove ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredList}
          renderItem={({item}) => (
            <InternalMoveCard
              style={styles.item}
              name={item.stockMoveSeq}
              status={getStatus(item.statusSelect)}
              availability={getAvailability(item.availableStatusSelect)}
              fromStockLocation={item.fromStockLocation.name}
              toStockLocation={item.toStockLocation.name}
              origin={item.origin}
              date={
                item.statusSelect == STATUS_DRAFT
                  ? item.createdOn
                  : item.realDate
              }
              onPress={() => showInternalMoveDetails(item)}
            />
          )}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default InternalMoveListScreen;
