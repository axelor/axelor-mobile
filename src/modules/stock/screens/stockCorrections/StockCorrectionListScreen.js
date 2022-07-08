import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Screen} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import {
  AutocompleteSearch,
  ChipSelect,
  ScrollList,
  SearchContainer,
} from '@/components/organisms';
import {fetchStockCorrections} from '@/modules/stock/features/stockCorrectionSlice';
import {StockCorrectionCard} from '@/modules/stock/components/molecules';
import filterList from '@/modules/stock/utils/filter-list';
import {searchProducts} from '@/modules/stock/features/productSlice';
import {displayItemName} from '@/modules/stock/utils/displayers';
import StockCorrection from '@/modules/stock/types/stock-corrrection';
import {searchStockLocations} from '../../features/stockLocationSlice';
import {useThemeColor} from '@/features/themeSlice';

const stockLocationScanKey = 'stock-location_stock-correction-list';
const productScanKey = 'product_stock-correction-list';

const StockCorrectionListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const {loadingStockCorrection, moreLoading, isListEnd, stockCorrectionList} =
    useSelector(state => state.stockCorrection);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {productList} = useSelector(state => state.product);
  const {user} = useSelector(state => state.user);
  const [stockLocation, setStockLocation] = useState(null);
  const [product, setProduct] = useState(null);
  const [draftStatus, setDraftStatus] = useState(false);
  const [validatedStatus, setValidatedStatus] = useState(false);
  const [filteredList, setFilteredList] = useState(stockCorrectionList);
  const dispatch = useDispatch();

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

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
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
      }
    },
    [draftStatus, validatedStatus],
  );

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

  const showStockCorrectionDetails = stockCorrection => {
    navigation.navigate('StockCorrectionDetailsScreen', {
      stockCorrection: stockCorrection,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="plus"
          color={Colors.primaryColor}
          size={24}
          style={styles.action}
          touchable={true}
          onPress={() => {
            navigation.navigate('StockCorrectionNewLocationScreen', {});
          }}
        />
      ),
    });
  }, [navigation, Colors]);

  const fetchStockCorrectionsAPI = useCallback(
    page => {
      dispatch(fetchStockCorrections({page: page}));
    },
    [dispatch],
  );

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const fetchStockLocationsAPI = useCallback(
    (filterValue, companyId, defaultStockLocation) => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: companyId,
          defaultStockLocation: defaultStockLocation,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Screen>
      <SearchContainer>
        <AutocompleteSearch
          objectList={stockLocationList}
          value={stockLocation}
          onChangeValue={item => setStockLocation(item)}
          fetchData={searchValue =>
            fetchStockLocationsAPI(
              searchValue,
              user.activeCompany?.id,
              user.workshopStockLocation,
            )
          }
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder="Stock location"
          searchBarKey={1}
        />
        <AutocompleteSearch
          objectList={productList}
          value={product}
          onChangeValue={item => setProduct(item)}
          fetchData={fetchProductsAPI}
          displayValue={displayItemName}
          scanKeySearch={productScanKey}
          placeholder="Product"
          searchBarKey={2}
        />
      </SearchContainer>
      <ChipSelect>
        <Chip
          selected={draftStatus}
          title="Draft"
          onPress={handleDraftFilter}
          selectedColor={StockCorrection.getStatusColor(
            StockCorrection.getStatus(StockCorrection.status.Draft),
            Colors,
          )}
        />
        <Chip
          selected={validatedStatus}
          title="Validated"
          onPress={handleValidatedFilter}
          selectedColor={StockCorrection.getStatusColor(
            StockCorrection.getStatus(StockCorrection.status.Validated),
            Colors,
          )}
        />
      </ChipSelect>
      <ScrollList
        loadingList={loadingStockCorrection}
        data={filteredList}
        renderItem={({item}) => (
          <StockCorrectionCard
            style={styles.item}
            status={StockCorrection.getStatus(item.statusSelect)}
            productFullname={item.product.fullName}
            stockLocation={item.stockLocation.name}
            date={
              item.statusSelect === StockCorrection.status.Draft
                ? item.createdOn
                : item.validationDateT
            }
            onPress={() => showStockCorrectionDetails(item)}
          />
        )}
        fetchData={fetchStockCorrectionsAPI}
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
  action: {
    marginRight: 15,
  },
});

export default StockCorrectionListScreen;
