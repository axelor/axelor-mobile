import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen, IconNew} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import {ChipSelect, AutocompleteSearch} from '@/components/organisms';
import {fetchStockCorrections} from '@/modules/stock/features/stockCorrectionSlice';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {StockCorrectionCard} from '@/modules/stock/components/molecules';
import filterList from '@/modules/stock/utils/filter-list';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {useScannerSelector} from '@/features/scannerSlice';
import {searchStockLocationBySerialNumber} from '@/modules/stock/api/stock-location-api';
import {searchProductBySerialNumber} from '@/modules/stock/api/product-api';

const STATUS_DRAFT = 1;
const STATUS_VALIDATED = 2;

const getStatus = option => {
  if (option === STATUS_DRAFT) {
    return 'Draft';
  } else if (option === STATUS_VALIDATED) {
    return 'Validated';
  } else {
    return option;
  }
};

const stockLocationScanKey = 'stock-location';
const productScanKey = 'product';

const filterByName = (item, name) => {
  return item.name.toLowerCase().includes(name.toLowerCase());
};

const displayName = item => item.name;

const StockCorrectionListScreen = ({navigation}) => {
  const {loadingCorrections, stockCorrectionList} = useSelector(
    state => state.stockCorrection,
  );
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {productList} = useSelector(state => state.product);
  const {type: scanKey, value: scannedValue} = useScannerSelector();
  const [stockLocation, setStockLocation] = useState(null);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockCorrections());
    dispatch(fetchStockLocations());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (scannedValue) {
      switch (scanKey) {
        case stockLocationScanKey: {
          searchStockLocationBySerialNumber(scannedValue).then(
            searchedStockLocation => {
              if (searchedStockLocation) {
                setStockLocation(searchedStockLocation);
              } else {
                console.warn(
                  `Stock location not found with serial number: ${scannedValue}`,
                );
              }
            },
          );
          break;
        }
        case productScanKey: {
          searchProductBySerialNumber(scannedValue).then(searchedProduct => {
            if (searchedProduct) {
              setProduct(searchedProduct);
            } else {
              console.warn(
                `Product not found with serial number: ${scannedValue}`,
              );
            }
          });
          break;
        }
        default:
          return;
      }
    }
  }, [scanKey, scannedValue]);

  // Set status filter

  const [draftStatus, setDraftStatus] = useState(false);
  const [validatedStatus, setValidatedStatus] = useState(false);

  const handleDraftFilter = () => {
    if (!draftStatus && validatedStatus) {
      setValidatedStatus(!validatedStatus);
    }
    setDraftStatus(!draftStatus);
  };

  const handleValidatedFilter = () => {
    if (!validatedStatus && draftStatus) {
      setDraftStatus(!draftStatus);
    }
    setValidatedStatus(!validatedStatus);
  };

  // ----------  FILTERS -------------
  const [filteredList, setFilteredList] = useState(stockCorrectionList);

  const filterOnStatus = useCallback(
    list => {
      if (draftStatus) {
        const draftStockCorrectionList = [];
        list.forEach(item => {
          if (item.statusSelect === 1) {
            draftStockCorrectionList.push(item);
          }
        });
        return draftStockCorrectionList;
      } else if (validatedStatus) {
        const validatedStockCorrectionList = [];
        list.forEach(item => {
          if (item.statusSelect === 2) {
            validatedStockCorrectionList.push(item);
          }
        });
        return validatedStockCorrectionList;
      } else {
        return list;
      }
    },
    [draftStatus, validatedStatus],
  );

  // Filter list on search params
  useEffect(() => {
    setFilteredList(
      filterOnStatus(
        filterList(
          filterList(
            stockCorrectionList,
            'stockLocation',
            'id',
            stockLocation?.id ?? '',
          ),
          'product',
          'id',
          product?.id ?? '',
        ),
      ),
    );
  }, [
    draftStatus,
    validatedStatus,
    stockCorrectionList,
    stockLocation,
    product,
    filterOnStatus,
  ]);

  // ----------  NAVIGATION -------------
  const showStockCorrectionDetails = stockCorrection => {
    navigation.navigate('StockCorrectionDetailsScreen', {
      stockCorrection: stockCorrection,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconNew
          onNewPress={() => {
            navigation.navigate('StockCorrectionNewLocationScreen', {});
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <Screen style={styles.container}>
      <AutocompleteSearch
        objectList={stockLocationList}
        value={stockLocation}
        displayValue={displayName}
        filter={filterByName}
        onChangeValue={item => setStockLocation(item)}
        placeholder="Stock location"
        scanKey={stockLocationScanKey}
      />
      <AutocompleteSearch
        objectList={productList}
        value={product}
        onChangeValue={item => setProduct(item)}
        displayValue={displayName}
        filter={filterByName}
        scanKey={productScanKey}
        placeholder="Product"
      />
      <ChipSelect style={styles.chipContainer}>
        <Chip
          style={styles.chip}
          selected={draftStatus}
          title="Draft"
          onPress={handleDraftFilter}
        />
        <Chip
          style={styles.chip}
          selected={validatedStatus}
          title="Validated"
          onPress={handleValidatedFilter}
        />
      </ChipSelect>
      {loadingCorrections ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredList}
          renderItem={({item}) => (
            <StockCorrectionCard
              style={styles.item}
              status={getStatus(item.statusSelect)}
              productFullname={item.product.fullName}
              stockLocation={item.stockLocation.name}
              date={
                item.statusSelect == STATUS_DRAFT
                  ? item.createdOn
                  : item.validationDateT
              }
              onPress={() => showStockCorrectionDetails(item)}
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
  chipContainer: {
    width: '100%',
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  chip: {
    width: Dimensions.get('window').width * 0.4,
    marginHorizontal: 12,
  },
});

export default StockCorrectionListScreen;
