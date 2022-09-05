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
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

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
    <Screen>
      <SearchContainer>
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
      <AutoCompleteSearchNoQR
        objectList={internalMoveList}
        onChangeValue={item => showInternalMoveDetails(item)}
        fetchData={value => setFilter(value)}
        displayValue={displayStockMoveSeq}
        placeholder={I18n.t('Stock_Ref')}
        oneFilter={true}
        navigate={navigate}
      />
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
