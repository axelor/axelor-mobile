/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  AutoCompleteSearch,
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  filterList,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {InternalMoveCard, StockLocationSearchBar} from '../../components';
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
  const dispatch = useDispatch();

  const {loadingInternalMoveList, moreLoading, isListEnd, internalMoveList} =
    useSelector(state => state.internalMove);

  const [originalStockLocation, setOriginalStockLocation] = useState(null);
  const [destinationStockLocation, setDestinationStockLocation] =
    useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);

  const filterOnStatus = useCallback(
    list => filterChip(list, selectedStatus, 'statusSelect'),
    [selectedStatus],
  );

  const showInternalMoveDetails = internalMove => {
    if (internalMove != null) {
      setNavigate(current => !current);
      navigation.navigate('InternalMoveDetailsGeneralScreen', {
        internalMoveId: internalMove?.id,
      });
    }
  };

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

  const searchInternalMovesAPI = useCallback(
    ({page = 0, searchValue}) => {
      setFilter(searchValue);
      dispatch(
        searchInternalMoves({
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch],
  );

  const filteredList = useMemo(
    () =>
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
    [
      internalMoveList,
      originalStockLocation,
      destinationStockLocation,
      filterOnStatus,
    ],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <AutoCompleteSearch
            objectList={internalMoveList}
            onChangeValue={item => showInternalMoveDetails(item)}
            fetchData={searchInternalMovesAPI}
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
        <StockLocationSearchBar
          placeholderKey="Stock_OriginalStockLocation"
          defaultValue={originalStockLocation}
          onChange={setOriginalStockLocation}
          scanKey={stockOriginalLocationScanKey}
        />
        <StockLocationSearchBar
          placeholderKey="Stock_DestinationStockLocation"
          defaultValue={destinationStockLocation}
          onChange={setDestinationStockLocation}
          scanKey={stockDestinationLocationScanKey}
          secondFilter={true}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loadingInternalMoveList}
        data={filteredList}
        renderItem={({item}) => (
          <InternalMoveCard
            name={item.stockMoveSeq}
            status={item.statusSelect}
            availability={item.availableStatusSelect}
            fromStockLocation={item.fromStockLocation.name}
            toStockLocation={item.toStockLocation.name}
            origin={item.origin}
            date={StockMove.getStockMoveDate(item.statusSelect, item)}
            onPress={() => showInternalMoveDetails(item)}
          />
        )}
        fetchData={fetchInternalMovesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default InternalMoveListScreen;
