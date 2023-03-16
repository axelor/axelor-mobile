/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  AutoCompleteSearch,
  ChipSelect,
  Icon,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  filterList,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {InternalMoveCard} from '../../components';
import {
  filterSecondStockLocations,
  searchStockLocations,
} from '../../features/stockLocationSlice';
import {searchInternalMoves} from '../../features/internalMoveSlice';
import {displayStockMoveSeq} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

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
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'statusSelect');
    },
    [selectedStatus],
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
      setNavigate(current => !current);
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
          color={Colors.primaryColor.background}
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
      dispatch(
        searchInternalMoves({
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
        searchInternalMoves({
          searchValue: searchValue,
          page: 0,
        }),
      );
    },
    [dispatch],
  );

  const fetchOriginalStockLocationsAPI = useCallback(
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

  const fetchDestinationStockLocationsAPI = useCallback(
    filterValue => {
      dispatch(
        filterSecondStockLocations({
          searchValue: filterValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation: user.workshopStockLocation,
        }),
      );
    },
    [dispatch, user],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <AutoCompleteSearch
            objectList={internalMoveList}
            onChangeValue={item => showInternalMoveDetails(item)}
            fetchData={handleRefChange}
            displayValue={displayStockMoveSeq}
            placeholder={I18n.t('Stock_Ref')}
            oneFilter={true}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            width={Dimensions.get('window').width * 0.3}
            marginHorizontal={3}
            selectionItems={[
              {
                title: I18n.t('Stock_Status_Draft'),
                color: StockMove.getStatusColor(StockMove.status.Draft, Colors),
                key: StockMove.status.Draft,
              },
              {
                title: I18n.t('Stock_Status_Planned'),
                color: StockMove.getStatusColor(
                  StockMove.status.Planned,
                  Colors,
                ),
                key: StockMove.status.Planned,
              },
              {
                title: I18n.t('Stock_Status_Realized'),
                color: StockMove.getStatusColor(
                  StockMove.status.Realized,
                  Colors,
                ),
                key: StockMove.status.Realized,
              },
            ]}
          />
        }>
        <ScannerAutocompleteSearch
          objectList={stockLocationListFirstFilter}
          value={originalStockLocation}
          onChangeValue={item => setOriginalStockLocation(item)}
          fetchData={fetchOriginalStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockOriginalLocationScanKey}
          placeholder={I18n.t('Stock_OriginalStockLocation')}
          searchBarKey={1}
        />
        <ScannerAutocompleteSearch
          objectList={stockLocationListSecondFilter}
          value={destinationStockLocation}
          onChangeValue={item => setDestinationStockLocation(item)}
          fetchData={fetchDestinationStockLocationsAPI}
          displayValue={displayItemName}
          scanKeySearch={stockDestinationLocationScanKey}
          placeholder={I18n.t('Stock_DestinationStockLocation')}
          searchBarKey={2}
        />
      </HeaderContainer>
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
