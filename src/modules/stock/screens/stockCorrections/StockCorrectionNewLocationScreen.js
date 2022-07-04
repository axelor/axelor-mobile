import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {displayItemName} from '@/modules/stock/utils/displayers';

const stockLocationScanKey = 'stock-location_stock-correction-new';

const StockCorrectionNewLocationScreen = ({navigation, route}) => {
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const dispatch = useDispatch();

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(searchStockLocations({searchValue: filterValue}));
    },
    [dispatch],
  );

  const handleNavigate = useCallback(
    location => {
      if (location == null) {
        return;
      }
      navigation.navigate('StockCorrectionNewProductScreen', {
        stockLocation: location,
      });
    },
    [navigation],
  );

  return (
    <Screen>
      <AutocompleteSearch
        objectList={stockLocationList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchStockLocationsAPI}
        displayValue={displayItemName}
        scanKeySearch={stockLocationScanKey}
        placeholder="Stock Location"
        isFocus={true}
        changeScreenAfter={true}
      />
    </Screen>
  );
};

export default StockCorrectionNewLocationScreen;
