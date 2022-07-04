import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import {
  AutocompleteSearch,
  AutoCompleteSearchNoQR,
  ChipSelect,
  ScrollList,
  SearchContainer,
} from '@/components/organisms';
import filterList from '@/modules/stock/utils/filter-list';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {filterSuppliers} from '../../features/partnerSlice';
import {
  displayItemName,
  displayPartner,
  displayStockMoveSeq,
} from '@/modules/stock/utils/displayers';
import {
  fetchSupplierArrivals,
  searchSupplierArrivals,
} from '@/modules/stock/features/supplierArrivalSlice';
import {SupplierArrivalCard} from '@/modules/stock/components/organisms';
import StockMove from '@/modules/stock/types/stock-move';
import {ColorHook} from '@/themeStore';

const stockLocationScanKey = 'stock-location_supplier-arrival-list';

const SupplierArrivalListScreen = ({navigation}) => {
  const Colors = ColorHook();
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const [stockLocation, setStockLocation] = useState(null);
  const {supplierList} = useSelector(state => state.partner);
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
      dispatch(searchStockLocations({searchValue: filterValue}));
    },
    [dispatch],
  );

  const fetchPartnerAPI = useCallback(
    filterValue => {
      dispatch(filterSuppliers({searchValue: filterValue}));
    },
    [dispatch],
  );

  const fetchSupplierArrivalsAPI = useCallback(
    page => {
      if (filter != null && filter !== '') {
        dispatch(searchSupplierArrivals({searchValue: filter}));
      } else {
        dispatch(fetchSupplierArrivals({page: page}));
      }
    },
    [dispatch, filter],
  );

  return (
    <Screen>
      <SearchContainer>
        <AutocompleteSearch
          objectList={stockLocationList}
          value={stockLocation}
          onChangeValue={item => setStockLocation(item)}
          fetchData={fetchStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder="Stock location"
        />
        <AutoCompleteSearchNoQR
          objectList={supplierList}
          value={partner}
          onChangeValue={item => setPartner(item)}
          fetchData={fetchPartnerAPI}
          displayValue={displayPartner}
          placeholder="Supplier"
        />
      </SearchContainer>
      <AutoCompleteSearchNoQR
        placeholder="Ref."
        objectList={supplierArrivalsList}
        displayValue={displayStockMoveSeq}
        onChangeValue={item => navigateToSupplierDetail(item)}
        oneFilter={true}
        fetchData={value => setFilter(value)}
        navigate={navigate}
      />
      <ChipSelect>
        <Chip
          selected={planifiedStatus}
          title="Planned"
          onPress={handlePlanifiedFilter}
          selectedColor={StockMove.getStatusColor(
            StockMove.getStatus(StockMove.status.Planned),
            Colors,
          )}
        />
        <Chip
          selected={validatedStatus}
          title="Realized"
          onPress={handleValidatedFilter}
          selectedColor={StockMove.getStatusColor(
            StockMove.getStatus(StockMove.status.Realized),
            Colors,
          )}
        />
      </ChipSelect>
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <SupplierArrivalCard
            reference={item.stockMoveSeq}
            client={item.partner?.fullName}
            status={StockMove.getStatus(item.statusSelect)}
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
        filter={filter != null && filter !== ''}
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
