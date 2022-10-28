import React, {useCallback} from 'react';
import {ClearableCard, Screen} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {searchStockLocations} from '../../features/stockLocationSlice';
import {displayItemName} from '../../utils/displayers';

const destinationStockLocationScanKey =
  'destination-stock-location_internal-move-select-to';

const InternalMoveSelectToLocationScreen = ({navigation, route}) => {
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

  const handleClearLocation = () => {
    navigation.navigate('InternalMoveSelectFromLocationScreen');
  };

  const handleNavigate = useCallback(
    location => {
      if (location == null) {
        return;
      }
      navigation.navigate('InternalMoveSelectProductScreen', {
        fromStockLocation: route.params.fromStockLocation,
        toStockLocation: location,
      });
    },
    [navigation, route.params.fromStockLocation],
  );

  return (
    <Screen>
      <ClearableCard
        valueTxt={route.params.fromStockLocation.name}
        onClearPress={handleClearLocation}
      />
      <ScannerAutocompleteSearch
        objectList={stockLocationList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchStockLocationsAPI}
        displayValue={displayItemName}
        scanKeySearch={destinationStockLocationScanKey}
        placeholder={I18n.t('Stock_DestinationStockLocation')}
        isFocus={true}
        changeScreenAfter={true}
      />
    </Screen>
  );
};

export default InternalMoveSelectToLocationScreen;
