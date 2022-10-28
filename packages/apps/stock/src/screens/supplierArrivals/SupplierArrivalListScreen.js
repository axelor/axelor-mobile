import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AutoCompleteSearch,
  Chip,
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {SupplierArrivalCard} from '../../components';
import {searchStockLocations} from '../../features/stockLocationSlice';
import {filterSuppliers} from '../../features/partnerSlice';
import {searchSupplierArrivals} from '../../features/supplierArrivalSlice';
import {
  displayItemName,
  displayPartner,
  displayStockMoveSeq,
} from '../../utils/displayers';
import {filterList} from '../../utils/list';
import StockMove from '../../types/stock-move';

const stockLocationScanKey = 'stock-location_supplier-arrival-list';

const SupplierArrivalListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const [stockLocation, setStockLocation] = useState(null);
  const {supplierList} = useSelector(state => state.partner);
  const {user} = useSelector(state => state.user);
  const [partner, setPartner] = useState(null);
  const {loading, moreLoading, isListEnd, supplierArrivalsList} = useSelector(
    state => state.supplierArrival,
  );
  const [filteredList, setFilteredList] = useState(supplierArrivalsList);
  const [planifiedStatus, setplanifiedStatus] = useState(false);
  const [validatedStatus, setValidatedStatus] = useState(false);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();

  const handlePlanifiedFilter = () => {
    if (!planifiedStatus && validatedStatus) {
      setValidatedStatus(!validatedStatus);
    }
    setplanifiedStatus(!planifiedStatus);
  };

  const handleValidatedFilter = () => {
    if (!validatedStatus && planifiedStatus) {
      setplanifiedStatus(!planifiedStatus);
    }
    setValidatedStatus(!validatedStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (planifiedStatus) {
          return list.filter(
            item => item.statusSelect === StockMove.status.Planned,
          );
        } else if (validatedStatus) {
          return list.filter(
            item => item.statusSelect === StockMove.status.Realized,
          );
        } else {
          return list;
        }
      }
    },
    [planifiedStatus, validatedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(
        filterList(
          filterList(
            supplierArrivalsList,
            'toStockLocation',
            'id',
            stockLocation?.id ?? '',
          ),
          'partner',
          'id',
          partner?.id ?? '',
        ),
      ),
    );
  }, [filterOnStatus, partner, stockLocation, supplierArrivalsList]);

  const navigateToSupplierDetail = item => {
    if (item != null) {
      setNavigate(true);
      navigation.navigate('SupplierArrivalDetailsScreen', {
        supplierArrival: item,
      });
    }
  };

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

  const fetchPartnerAPI = useCallback(
    filterValue => {
      dispatch(filterSuppliers({searchValue: filterValue}));
    },
    [dispatch],
  );

  const fetchSupplierArrivalsAPI = useCallback(
    page => {
      dispatch(
        searchSupplierArrivals({
          searchValue: filter,
          page: page,
        }),
      );
    },
    [dispatch, filter],
  );

  const handleRefChange = useCallback(
    searchValue => {
      setFilter(searchValue);
      dispatch(
        searchSupplierArrivals({
          searchValue: searchValue,
          page: 0,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <AutoCompleteSearch
            placeholder={I18n.t('Stock_Ref')}
            objectList={supplierArrivalsList}
            displayValue={displayStockMoveSeq}
            onChangeValue={item => navigateToSupplierDetail(item)}
            oneFilter={true}
            fetchData={handleRefChange}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect>
            <Chip
              selected={planifiedStatus}
              title={I18n.t('Stock_Status_Planned')}
              onPress={handlePlanifiedFilter}
              selectedColor={StockMove.getStatusColor(
                StockMove.status.Planned,
                Colors,
              )}
            />
            <Chip
              selected={validatedStatus}
              title={I18n.t('Stock_Status_Realized')}
              onPress={handleValidatedFilter}
              selectedColor={StockMove.getStatusColor(
                StockMove.status.Realized,
                Colors,
              )}
            />
          </ChipSelect>
        }>
        <ScannerAutocompleteSearch
          objectList={stockLocationList}
          value={stockLocation}
          onChangeValue={item => setStockLocation(item)}
          fetchData={fetchStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder={I18n.t('Stock_StockLocation')}
        />
        <AutoCompleteSearch
          objectList={supplierList}
          value={partner}
          onChangeValue={item => setPartner(item)}
          fetchData={fetchPartnerAPI}
          displayValue={displayPartner}
          placeholder={I18n.t('Stock_Supplier')}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <SupplierArrivalCard
            reference={item.stockMoveSeq}
            client={item.partner?.fullName}
            status={item.statusSelect}
            date={
              item.statusSelect === StockMove.status.Planned
                ? item.estimatedDate
                : item.realDate
            }
            onPress={() => navigateToSupplierDetail(item)}
            origin={item.origin}
            style={styles.cardDelivery}
          />
        )}
        fetchData={fetchSupplierArrivalsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardDelivery: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default SupplierArrivalListScreen;
