import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IconNew, Screen} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import {AutocompleteSearch, ChipSelect} from '@/components/organisms';
import {fetchStockCorrections} from '@/modules/stock/features/stockCorrectionSlice';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {StockCorrectionCard} from '@/modules/stock/components/molecules';
import filterList from '@/modules/stock/utils/filter-list';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {filterItemByName} from '@/modules/stock/utils/filters';
import {displayItemName} from '@/modules/stock/utils/displayers';
import useStockLocationScanner from '@/modules/stock/hooks/use-stock-location-scanner';
import useProductScanner from '@/modules/stock/hooks/use-product-scanner';

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

const stockLocationScanKey = 'stock-location_stock-correction-list';
const productScanKey = 'product_stock-correction-list';

const StockCorrectionListScreen = ({navigation}) => {
  const {loadingCorrections, stockCorrectionList} = useSelector(
    state => state.stockCorrection,
  );
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {productList} = useSelector(state => state.product);
  const [stockLocation, setStockLocation] = useState(null);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockCorrections());
    dispatch(fetchStockLocations());
    dispatch(fetchProducts());
  }, [dispatch]);

  const stockLocationScanned = useStockLocationScanner(stockLocationScanKey);
  useEffect(() => {
    if (stockLocationScanned) {
      setStockLocation(stockLocationScanned);
    }
  }, [stockLocationScanned]);

  const productScanned = useProductScanner(productScanKey);
  useEffect(() => {
    if (productScanned) {
      setProduct(productScanned);
    }
  }, [productScanned]);

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
        displayValue={displayItemName}
        filter={filterItemByName}
        onChangeValue={item => setStockLocation(item)}
        placeholder="Stock location"
        scanKey={stockLocationScanKey}
      />
      <AutocompleteSearch
        objectList={productList}
        value={product}
        onChangeValue={item => setProduct(item)}
        displayValue={displayItemName}
        filter={filterItemByName}
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
