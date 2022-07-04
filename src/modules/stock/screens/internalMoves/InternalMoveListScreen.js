import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen, Icon} from '@/components/atoms';
import {
  AutocompleteSearch,
  AutoCompleteSearchNoQR,
  ChipSelect,
  ScrollList,
  SearchContainer,
} from '@/components/organisms';
import {InternalMoveCard} from '@/modules/stock/components/organisms';
import filterList from '@/modules/stock/utils/filter-list';
import {
  filterSecondStockLocations,
  searchStockLocations,
} from '@/modules/stock/features/stockLocationSlice';
import {
  fetchInternalMoves,
  searchInternalMoves,
} from '@/modules/stock/features/internalMoveSlice';
import {
  displayItemName,
  displayStockMoveSeq,
} from '@/modules/stock/utils/displayers';
import StockMove from '@/modules/stock/types/stock-move';
import {Chip} from '@/components/molecules';
import {ColorHook} from '@/themeStore';

const stockOriginalLocationScanKey =
  'stock-original-location_internal-move-list';
const stockDestinationLocationScanKey =
  'stock-destination-location_internal-move-list';

const InternalMoveListScreen = ({navigation}) => {
  const Colors = ColorHook();
  const {loadingInternalMove, moreLoading, isListEnd, internalMoveList} =
    useSelector(state => state.internalMove);
  const {
    stockLocationList: stockLocationListFirstFilter,
    stockLocationListMultiFilter: stockLocationListSecondFilter,
  } = useSelector(state => state.stockLocation);
  const [originalStockLocation, setOriginalStockLocation] = useState(null);
  const [destinationStockLocation, setDestinationStockLocation] =
    useState(null);
  const [filteredList, setFilteredList] = useState(internalMoveList);
  const [draftStatus, setDraftStatus] = useState(false);
  const [plannedStatus, setPlannedStatus] = useState(false);
  const [realizedStatus, setRealizedStatus] = useState(false);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();

  const handleDraftFilter = () => {
    if (!draftStatus && (realizedStatus || plannedStatus)) {
      setPlannedStatus(false);
      setRealizedStatus(false);
    }
    setDraftStatus(!draftStatus);
  };

  const handlePlannedFilter = () => {
    if (!plannedStatus && (realizedStatus || draftStatus)) {
      setDraftStatus(false);
      setRealizedStatus(false);
    }
    setPlannedStatus(!plannedStatus);
  };

  const handleRealizedFilter = () => {
    if (!realizedStatus && (plannedStatus || draftStatus)) {
      setDraftStatus(false);
      setPlannedStatus(false);
    }
    setRealizedStatus(!realizedStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (draftStatus) {
          return list.filter(
            item => item.statusSelect === StockMove.status.Draft,
          );
        } else if (plannedStatus) {
          return list.filter(
            item => item.statusSelect === StockMove.status.Planned,
          );
        } else if (realizedStatus) {
          return list.filter(
            item => item.statusSelect === StockMove.status.Realized,
          );
        } else {
          return list;
        }
      }
    },
    [draftStatus, plannedStatus, realizedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(
        filterList(
          filterList(
            internalMoveList,
            'fromStockLocation',
            'id',
            originalStockLocation?.id ?? '',
          ),
          'toStockLocation',
          'id',
          destinationStockLocation?.id ?? '',
        ),
      ),
    );
  }, [
    internalMoveList,
    originalStockLocation,
    destinationStockLocation,
    filterOnStatus,
  ]);

  const showInternalMoveDetails = internalMove => {
    if (internalMove != null) {
      setNavigate(true);
      navigation.navigate('InternalMoveDetailsGeneralScreen', {
        internalMove: internalMove,
      });
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="plus"
          color={Colors.primaryColor}
          size={24}
          style={styles.action}
          touchable={true}
          onPress={() => {
            navigation.navigate('InternalMoveSelectFromLocationScreen', {});
          }}
        />
      ),
    });
  }, [Colors, navigation]);

  const fetchInternalMovesAPI = useCallback(
    page => {
      if (filter != null && filter !== '') {
        dispatch(searchInternalMoves({searchValue: filter, page: page}));
      } else {
        dispatch(fetchInternalMoves({page: page}));
      }
    },
    [dispatch, filter],
  );

  const fetchOriginalStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(searchStockLocations({searchValue: filterValue}));
    },
    [dispatch],
  );

  const fetchDestinationStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(filterSecondStockLocations({searchValue: filterValue}));
    },
    [dispatch],
  );

  return (
    <Screen>
      <SearchContainer>
        <AutocompleteSearch
          objectList={stockLocationListFirstFilter}
          value={originalStockLocation}
          onChangeValue={item => setOriginalStockLocation(item)}
          fetchData={fetchOriginalStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockOriginalLocationScanKey}
          placeholder="Original Stock Location"
          searchBarKey={1}
        />
        <AutocompleteSearch
          objectList={stockLocationListSecondFilter}
          value={destinationStockLocation}
          onChangeValue={item => setDestinationStockLocation(item)}
          fetchData={fetchDestinationStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockDestinationLocationScanKey}
          placeholder="Destination Stock Location"
          searchBarKey={2}
        />
      </SearchContainer>
      <AutoCompleteSearchNoQR
        objectList={internalMoveList}
        onChangeValue={item => showInternalMoveDetails(item)}
        fetchData={value => setFilter(value)}
        displayValue={displayStockMoveSeq}
        placeholder="Ref."
        oneFilter={true}
        navigate={navigate}
      />
      <ChipSelect>
        <Chip
          selected={draftStatus}
          title="Draft"
          onPress={handleDraftFilter}
          selectedColor={StockMove.getStatusColor(
            StockMove.getStatus(StockMove.status.Draft),
            Colors,
          )}
          width={Dimensions.get('window').width * 0.3}
          marginHorizontal={3}
        />
        <Chip
          selected={plannedStatus}
          title="Planned"
          onPress={handlePlannedFilter}
          selectedColor={StockMove.getStatusColor(
            StockMove.getStatus(StockMove.status.Planned),
            Colors,
          )}
          width={Dimensions.get('window').width * 0.3}
          marginHorizontal={3}
        />
        <Chip
          selected={realizedStatus}
          title="Realized"
          onPress={handleRealizedFilter}
          selectedColor={StockMove.getStatusColor(
            StockMove.getStatus(StockMove.status.Realized),
            Colors,
          )}
          width={Dimensions.get('window').width * 0.3}
          marginHorizontal={3}
        />
      </ChipSelect>
      <ScrollList
        loadingList={loadingInternalMove}
        data={filteredList}
        renderItem={({item}) => (
          <InternalMoveCard
            style={styles.item}
            name={item.stockMoveSeq}
            status={StockMove.getStatus(item.statusSelect)}
            availability={
              item.availableStatusSelect == null
                ? null
                : StockMove.getAvailability(item.availableStatusSelect)
            }
            fromStockLocation={item.fromStockLocation.name}
            toStockLocation={item.toStockLocation.name}
            origin={item.origin}
            date={
              item.statusSelect === StockMove.status.Draft
                ? item.createdOn
                : item.statusSelect === StockMove.status.Planned
                ? item.estimatedDate
                : item.realDate
            }
            onPress={() => showInternalMoveDetails(item)}
          />
        )}
        fetchData={fetchInternalMovesAPI}
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
  action: {
    marginRight: 15,
  },
});

export default InternalMoveListScreen;
