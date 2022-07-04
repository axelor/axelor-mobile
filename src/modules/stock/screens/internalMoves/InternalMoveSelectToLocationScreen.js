import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import {displayItemName} from '@/modules/stock/utils/displayers';

const destinationStockLocationScanKey =
  'destination-stock-location_internal-move-select-to';

const InternalMoveSelectToLocationScreen = ({navigation, route}) => {
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const dispatch = useDispatch();

  const fetchStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(searchStockLocations({searchValue: filterValue}));
    },
    [dispatch],
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
      <AutocompleteSearch
        objectList={stockLocationList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchStockLocationsAPI}
        displayValue={displayItemName}
        scanKeySearch={destinationStockLocationScanKey}
        placeholder="Destination Stock Location"
        isFocus={true}
        changeScreenAfter={true}
      />
    </Screen>
  );
};

export default InternalMoveSelectToLocationScreen;
