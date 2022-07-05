import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Screen} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import {
  AutocompleteSearch,
  AutoCompleteSearchNoQR,
  ChipSelect,
  ScrollList,
  SearchContainer,
} from '@/components/organisms';
import {useDispatch, useSelector} from 'react-redux';
import filterList from '@/modules/stock/utils/filter-list';
import {searchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {
  displayInventorySeq,
  displayItemName,
} from '@/modules/stock/utils/displayers';
import {
  fetchInventories,
  searchInventories,
} from '@/modules/stock/features/inventorySlice';
import {InventoryCard} from '@/modules/stock/components/organisms';
import Inventory from '@/modules/stock/types/inventory';
import {ColorHook} from '@/themeStore';

const stockLocationScanKey = 'stock-location_inventory-list';

const InventoryListScreen = ({navigation}) => {
  const Colors = ColorHook();
  const {stockLocationList} = useSelector(state => state.stockLocation);
  const [stockLocation, setStockLocation] = useState(null);
  const {loading, moreLoading, isListEnd, inventoryList} = useSelector(
    state => state.inventory,
  );
  const {user} = useSelector(state => state.user);
  const [filteredList, setFilteredList] = useState(inventoryList);
  const [plannedStatus, setPlannedStatus] = useState(false);
  const [inProgressStatus, setInProgressStatus] = useState(false);
  const [completedStatus, setCompletedStatus] = useState(false);
  const [validatedStatus, setValidatedStatus] = useState(false);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();

  const handlePlanifiedFilter = () => {
    if (
      !plannedStatus &&
      (completedStatus || inProgressStatus || validatedStatus)
    ) {
      setInProgressStatus(false);
      setCompletedStatus(false);
      setValidatedStatus(false);
    }
    setPlannedStatus(!plannedStatus);
  };

  const handleInProgressFilter = () => {
    if (
      !inProgressStatus &&
      (completedStatus || plannedStatus || validatedStatus)
    ) {
      setPlannedStatus(false);
      setCompletedStatus(false);
      setValidatedStatus(false);
    }
    setInProgressStatus(!inProgressStatus);
  };

  const handleCompletedFilter = () => {
    if (
      !completedStatus &&
      (inProgressStatus || plannedStatus || validatedStatus)
    ) {
      setPlannedStatus(false);
      setInProgressStatus(false);
      setValidatedStatus(false);
    }
    setCompletedStatus(!completedStatus);
  };

  const handleValidatedFilter = () => {
    if (
      !validatedStatus &&
      (inProgressStatus || plannedStatus || completedStatus)
    ) {
      setPlannedStatus(false);
      setInProgressStatus(false);
      setCompletedStatus(false);
    }
    setValidatedStatus(!validatedStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (plannedStatus) {
          return list.filter(
            item => item.statusSelect === Inventory.status.Planned,
          );
        } else if (inProgressStatus) {
          return list.filter(
            item => item.statusSelect === Inventory.status.InProgress,
          );
        } else if (completedStatus) {
          return list.filter(
            item => item.statusSelect === Inventory.status.Completed,
          );
        } else if (validatedStatus) {
          return list.filter(
            item => item.statusSelect === Inventory.status.Validated,
          );
        } else {
          return list;
        }
      }
    },
    [plannedStatus, inProgressStatus, completedStatus, validatedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(
        filterList(
          inventoryList,
          'stockLocation',
          'id',
          stockLocation?.id ?? '',
        ),
      ),
    );
  }, [filterOnStatus, stockLocation, stockLocationList, inventoryList]);

  const navigateToInventoryDetail = item => {
    if (item != null) {
      setNavigate(true);
      navigation.navigate(
        item.statusSelect === Inventory.status.Planned
          ? 'InventoryPlannedDetailsScreen'
          : 'InventoryStartedDetailsScreen',
        {inventory: item},
      );
    }
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

  const fetchInventoriesAPI = useCallback(
    page => {
      if (filter != null && filter !== '') {
        dispatch(searchInventories({searchValue: filter}));
      } else {
        dispatch(fetchInventories({page: page}));
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
      </SearchContainer>
      <AutoCompleteSearchNoQR
        objectList={inventoryList}
        onChangeValue={item => navigateToInventoryDetail(item)}
        fetchData={value => setFilter(value)}
        displayValue={displayInventorySeq}
        placeholder="Ref."
        oneFilter={true}
        navigate={navigate}
      />
      <ChipSelect scrollable={true}>
        <Chip
          selected={plannedStatus}
          title="Planned"
          onPress={handlePlanifiedFilter}
          selectedColor={Inventory.getStatusColor(
            Inventory.getStatus(Inventory.status.Planned),
            Colors,
          )}
          width={Dimensions.get('window').width * 0.3}
          marginHorizontal={3}
        />
        <Chip
          selected={inProgressStatus}
          title="In Progress"
          onPress={handleInProgressFilter}
          selectedColor={Inventory.getStatusColor(
            Inventory.getStatus(Inventory.status.InProgress),
            Colors,
          )}
          width={Dimensions.get('window').width * 0.3}
          marginHorizontal={3}
        />
        <Chip
          selected={completedStatus}
          title="Completed"
          onPress={handleCompletedFilter}
          selectedColor={Inventory.getStatusColor(
            Inventory.getStatus(Inventory.status.Completed),
            Colors,
          )}
          width={Dimensions.get('window').width * 0.3}
          marginHorizontal={3}
        />
        <Chip
          selected={validatedStatus}
          title="Validated"
          onPress={handleValidatedFilter}
          selectedColor={Inventory.getStatusColor(
            Inventory.getStatus(Inventory.status.Validated),
            Colors,
          )}
          width={Dimensions.get('window').width * 0.3}
          marginHorizontal={3}
        />
      </ChipSelect>
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <InventoryCard
            reference={item.inventorySeq}
            status={Inventory.getStatus(item.statusSelect)}
            date={Inventory.getDate(item)}
            stockLocation={item.stockLocation?.name}
            origin={item.origin}
            style={styles.cardInventory}
            onPress={() => navigateToInventoryDetail(item)}
          />
        )}
        fetchData={fetchInventoriesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        filter={filter != null && filter !== ''}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardInventory: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default InventoryListScreen;
