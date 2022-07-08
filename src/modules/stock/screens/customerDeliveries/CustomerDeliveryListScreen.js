import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Screen} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import {
  AutocompleteSearch,
  AutoCompleteSearchNoQR,
  ChipSelect,
  ScrollList,
  SearchContainer,
} from '@/components/organisms';
import {CustomerDeliveryCard} from '@/modules/stock/components/organisms';
import {
  fetchDeliveries,
  searchDeliveries,
} from '@/modules/stock/features/customerDeliverySlice';
import filterList from '@/modules/stock/utils/filter-list';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {
  displayItemName,
  displayPartner,
  displayStockMoveSeq,
} from '@/modules/stock/utils/displayers';
import StockMove from '@/modules/stock/types/stock-move';
import {filterClients} from '../../features/partnerSlice';
import {useThemeColor} from '@/features/themeSlice';

const stockLocationScanKey = 'stock-location_customer-delivery-list';

const CustomerDeliveryListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const [stockLocation, setStockLocation] = useState(null);
  const [customer, setCustomer] = useState(null);
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const {clientList} = useSelector(state => state.partner);
  const {loading, moreLoading, isListEnd, deliveryList} = useSelector(
    state => state.customerDelivery,
  );
  const {user} = useSelector(state => state.user);
  const [filteredList, setFilteredList] = useState(deliveryList);
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
            deliveryList,
            'fromStockLocation',
            'id',
            stockLocation?.id ?? '',
          ),
          'partner',
          'id',
          customer?.id ?? '',
        ),
      ),
    );
  }, [filterOnStatus, stockLocation, deliveryList, customer]);

  const navigateToCustomerDelivery = item => {
    if (item != null) {
      setNavigate(true);
      navigation.navigate('CustomerDeliveryDetailScreen', {
        customerDelivery: item,
      });
    }
  };

  const fetchDeliveriesAPI = useCallback(
    page => {
      if (filter != null && filter !== '') {
        dispatch(searchDeliveries({searchValue: filter}));
      } else {
        dispatch(fetchDeliveries({page: page}));
      }
    },
    [dispatch, filter],
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

  const fetchPartnerAPI = useCallback(
    filterValue => {
      dispatch(filterClients({searchValue: filterValue}));
    },
    [dispatch],
  );

  return (
    <Screen>
      <SearchContainer>
        <AutocompleteSearch
          objectList={stockLocationList}
          value={stockLocation}
          onChangeValue={item => setStockLocation(item)}
          fetchData={searchValue =>
            fetchStockLocationsAPI(
              searchValue,
              user.activeCompany?.id,
              user.workshopStockLocation,
            )
          }
          displayValue={displayItemName}
          scanKeySearch={stockLocationScanKey}
          placeholder="Stock location"
        />
        <AutoCompleteSearchNoQR
          objectList={clientList}
          value={customer}
          onChangeValue={item => setCustomer(item)}
          fetchData={fetchPartnerAPI}
          displayValue={displayPartner}
          placeholder="Customer"
        />
      </SearchContainer>
      <AutoCompleteSearchNoQR
        objectList={deliveryList}
        onChangeValue={item => navigateToCustomerDelivery(item)}
        fetchData={value => setFilter(value)}
        displayValue={displayStockMoveSeq}
        placeholder="Ref."
        oneFilter={true}
        navigate={navigate}
      />
      <ChipSelect style={styles.chipContainer}>
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
          <CustomerDeliveryCard
            reference={item.stockMoveSeq}
            client={item.partner?.fullName}
            status={StockMove.getStatus(item.statusSelect)}
            date={
              item.statusSelect === StockMove.status.Draft
                ? item.createdOn
                : item.statusSelect === StockMove.status.Planned
                ? item.estimatedDate
                : item.realDate
            }
            origin={item.origin}
            style={styles.item}
            availability={
              item.availableStatusSelect == null
                ? null
                : StockMove.getAvailability(item.availableStatusSelect)
            }
            onPress={() => navigateToCustomerDelivery(item)}
          />
        )}
        fetchData={fetchDeliveriesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        filter={filter != null && filter !== ''}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default CustomerDeliveryListScreen;
