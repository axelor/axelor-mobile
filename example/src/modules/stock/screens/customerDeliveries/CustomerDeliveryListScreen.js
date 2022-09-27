import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AutoCompleteSearchNoQR,
  Chip,
  ChipSelect,
  Screen,
  SearchContainer,
  ScrollList,
  useThemeColor,
} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {AutocompleteSearch} from '@/components/organisms';
import {CustomerDeliveryCard} from '@/modules/stock/components/organisms';
import {searchDeliveries} from '@/modules/stock/features/customerDeliverySlice';
import filterList from '@/modules/stock/utils/filter-list';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {
  displayItemName,
  displayPartner,
  displayStockMoveSeq,
} from '@/modules/stock/utils/displayers';
import StockMove from '@/modules/stock/types/stock-move';
import {filterClients} from '../../features/partnerSlice';

const stockLocationScanKey = 'stock-location_customer-delivery-list';

const CustomerDeliveryListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
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
    ({page = 0, searchValue = null}) => {
      dispatch(
        searchDeliveries({
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch],
  );

  const handleRefChange = searchValue => {
    setFilter(searchValue);
    dispatch(
      searchDeliveries({
        searchValue: searchValue,
        page: 0,
      }),
    );
  };

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
    <Screen listScreen={true}>
      <SearchContainer
        fixedItems={
          <AutoCompleteSearchNoQR
            objectList={deliveryList}
            onChangeValue={item => navigateToCustomerDelivery(item)}
            fetchData={value => handleRefChange(value)}
            displayValue={displayStockMoveSeq}
            placeholder={I18n.t('Stock_Ref')}
            oneFilter={true}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect style={styles.chipContainer}>
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
          placeholder={I18n.t('Stock_StockLocation')}
        />
        <AutoCompleteSearchNoQR
          objectList={clientList}
          value={customer}
          onChangeValue={item => setCustomer(item)}
          fetchData={fetchPartnerAPI}
          displayValue={displayPartner}
          placeholder={I18n.t('Stock_Customer')}
        />
      </SearchContainer>
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <CustomerDeliveryCard
            reference={item.stockMoveSeq}
            client={item.partner?.fullName}
            status={item.statusSelect}
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
                : item.availableStatusSelect
            }
            onPress={() => navigateToCustomerDelivery(item)}
          />
        )}
        fetchData={page => fetchDeliveriesAPI({page, searchValue: filter})}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
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
