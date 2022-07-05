import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {displayItemName} from '@/modules/stock/utils/displayers';

const originalStockLocationScanKey =
  'original-stock-location__internal-move-select-from';

const InternalMoveSelectFromLocationScreen = ({navigation, route}) => {
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleNavigate = useCallback(
    location => {
      if (location == null) {
        return;
      }
      navigation.navigate('InternalMoveSelectToLocationScreen', {
        fromStockLocation: location,
      });
    },
    [navigation],
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
        scanKeySearch={originalStockLocationScanKey}
        placeholder="Original Stock Location"
        isFocus={true}
        changeScreenAfter={true}
      />
    </Screen>
  );
};

export default InternalMoveSelectFromLocationScreen;
