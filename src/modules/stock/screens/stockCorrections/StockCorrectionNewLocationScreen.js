import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {displayItemName} from '@/modules/stock/utils/displayers';

const stockLocationScanKey = 'stock-location_stock-correction-new';

const StockCorrectionNewLocationScreen = ({navigation, route}) => {
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

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
        fetchData={searchValue =>
          fetchStockLocationsAPI(
            searchValue,
            user.activeCompany?.id,
            user.workshopStockLocation,
          )
        }
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
