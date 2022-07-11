import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import {displayItemName} from '@/modules/stock/utils/displayers';
import useTranslator from '@/hooks/use-translator';

const destinationStockLocationScanKey =
  'destination-stock-location_internal-move-select-to';

const InternalMoveSelectToLocationScreen = ({navigation, route}) => {
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {user} = useSelector(state => state.user);
  const I18n = useTranslator();
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
        fetchData={searchValue =>
          fetchStockLocationsAPI(
            searchValue,
            user.activeCompany?.id,
            user.workshopStockLocation,
          )
        }
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
