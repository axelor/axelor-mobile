import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {AutocompleteSearch} from '@/components/organisms';
import {displayItemName} from '@/modules/stock/utils/displayers';

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
      <AutocompleteSearch
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
