import React, {useCallback} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchStockLocations} from '../../features/stockLocationSlice';

const stockLocationScanKey = 'stock-location_stock-correction-new';

const StockCorrectionNewLocationScreen = ({navigation, route}) => {
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {user} = useSelector(state => state.user);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        searchStockLocations({
          searchValue: filterValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation: user.workshopStockLocation,
        }),
      );
    },
    [dispatch, user],
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
      <ScannerAutocompleteSearch
        objectList={stockLocationList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchStockLocationsAPI}
        displayValue={displayItemName}
        scanKeySearch={stockLocationScanKey}
        placeholder={I18n.t('Stock_StockLocation')}
        isFocus={true}
        changeScreenAfter={true}
      />
    </Screen>
  );
};

export default StockCorrectionNewLocationScreen;
