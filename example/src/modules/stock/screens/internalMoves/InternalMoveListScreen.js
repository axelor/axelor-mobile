import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AutoCompleteSearchNoQR,
  Chip,
  ChipSelect,
  Icon,
  SearchContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {AutocompleteSearch} from '@/components/organisms';
import {InternalMoveCard} from '@/modules/stock/components/organisms';
import filterList from '@/modules/stock/utils/filter-list';
import {
  filterSecondStockLocations,
  searchStockLocations,
} from '@/modules/stock/features/stockLocationSlice';
import {searchInternalMoves} from '@/modules/stock/features/internalMoveSlice';
import {
  displayItemName,
  displayStockMoveSeq,
} from '@/modules/stock/utils/displayers';
import StockMove from '@/modules/stock/types/stock-move';

const stockOriginalLocationScanKey =
  'stock-original-location_internal-move-list';
const stockDestinationLocationScanKey =
  'stock-destination-location_internal-move-list';

const InternalMoveListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {loadingInternalMove, moreLoading, isListEnd, internalMoveList} =
    useSelector(state => state.internalMove);
  const {
    stockLocationList: stockLocationListFirstFilter,
    stockLocationListMultiFilter: stockLocationListSecondFilter,
  } = useSelector(state => state.stockLocation);
  const {user} = useSelector(state => state.user);
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
    ({page = 0, searchValue}) => {
      dispatch(
        searchInternalMoves({
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
      searchInternalMoves({
        searchValue: searchValue,
        page: 0,
      }),
    );
  };

  const fetchOriginalStockLocationsAPI = useCallback(
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

  const fetchDestinationStockLocationsAPI = useCallback(
    (filterValue, companyId, defaultStockLocation) => {
      dispatch(
        filterSecondStockLocations({
          searchValue: filterValue,
          companyId: companyId,
          defaultStockLocation: defaultStockLocation,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Screen listScreen={true}>
      <SearchContainer
        fixedItems={
          <AutoCompleteSearchNoQR
            objectList={internalMoveList}
            onChangeValue={item => showInternalMoveDetails(item)}
            fetchData={value => handleRefChange(value)}
            displayValue={displayStockMoveSeq}
            placeholder={I18n.t('Stock_Ref')}
            oneFilter={true}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect>
            <Chip
              selected={draftStatus}
              title={I18n.t('Stock_Status_Draft')}
              onPress={handleDraftFilter}
              selectedColor={StockMove.getStatusColor(
                StockMove.status.Draft,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={3}
            />
            <Chip
              selected={plannedStatus}
              title={I18n.t('Stock_Status_Planned')}
              onPress={handlePlannedFilter}
              selectedColor={StockMove.getStatusColor(
                StockMove.status.Planned,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={3}
            />
            <Chip
              selected={realizedStatus}
              title={I18n.t('Stock_Status_Realized')}
              onPress={handleRealizedFilter}
              selectedColor={StockMove.getStatusColor(
                StockMove.status.Realized,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={3}
            />
          </ChipSelect>
        }>
        <AutocompleteSearch
          objectList={stockLocationListFirstFilter}
          value={originalStockLocation}
          onChangeValue={item => setOriginalStockLocation(item)}
          fetchData={searchValue =>
            fetchOriginalStockLocationsAPI(
              searchValue,
              user.activeCompany?.id,
              user.workshopStockLocation,
            )
          }
          displayValue={displayItemName}
          scanKeySearch={stockOriginalLocationScanKey}
          placeholder={I18n.t('Stock_OriginalStockLocation')}
          searchBarKey={1}
        />
        <AutocompleteSearch
          objectList={stockLocationListSecondFilter}
          value={destinationStockLocation}
          onChangeValue={item => setDestinationStockLocation(item)}
          fetchData={searchValue =>
            fetchDestinationStockLocationsAPI(
              searchValue,
              user.activeCompany?.id,
              user.workshopStockLocation,
            )
          }
          displayValue={displayItemName}
          scanKeySearch={stockDestinationLocationScanKey}
          placeholder={I18n.t('Stock_DestinationStockLocation')}
          searchBarKey={2}
        />
      </SearchContainer>
      <ScrollList
        loadingList={loadingInternalMove}
        data={filteredList}
        renderItem={({item}) => (
          <InternalMoveCard
            style={styles.item}
            name={item.stockMoveSeq}
            status={item.statusSelect}
            availability={
              item.availableStatusSelect == null
                ? null
                : item.availableStatusSelect
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
        fetchData={page => fetchInternalMovesAPI({page, searchValue: filter})}
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
  action: {
    marginRight: 15,
  },
});

export default InternalMoveListScreen;
