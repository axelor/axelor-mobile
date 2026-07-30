/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {InternalMoveCard, StockLocationSearchBar} from '../../components';
import {searchInternalMoves} from '../../features/internalMoveSlice';
import {displayStockMoveSeq} from '../../utils';

const stockOriginalLocationScanKey =
  'stock-original-location_internal-move-list';
const stockDestinationLocationScanKey =
  'stock-destination-location_internal-move-list';
const scanKey = 'stock-move_internal-move-list';

const InternalMoveListScreen = ({navigation}: any) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {loadingInternalMoveList, moreLoading, isListEnd, internalMoveList} =
    useSelector(state => state.internalMove);
  const {user} = useSelector(state => state.user);

  const [originalStockLocation, setOriginalStockLocation] = useState<any>();
  const [destinationStockLocation, setDestinationStockLocation] =
    useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [navigate, setNavigate] = useState(false);

  const showInternalMoveDetails = (_item: any) => {
    if (_item != null) {
      setNavigate(current => !current);
      navigation.navigate('InternalMoveDetailsGeneralScreen', {
        internalMoveId: _item?.id,
      });
    }
  };

  const statusList = useMemo(() => {
    const statusToDisplay = [
      StockMove?.statusSelect.Draft,
      StockMove?.statusSelect.Planned,
      StockMove?.statusSelect.Realized,
    ];

    return getSelectionItems(StockMove?.statusSelect, selectedStatus).filter(
      ({value}) => statusToDisplay.includes(value),
    );
  }, [StockMove?.statusSelect, getSelectionItems, selectedStatus]);

  const sliceFunctionData = useMemo(
    () => ({
      fromStockLocationId: originalStockLocation?.id,
      toStockLocationId: destinationStockLocation?.id,
      statusList: selectedStatus,
      companyId: user.activeCompany?.id,
    }),
    [
      destinationStockLocation?.id,
      originalStockLocation?.id,
      selectedStatus,
      user.activeCompany?.id,
    ],
  );

  return (
    <Screen>
      <SearchListView
        list={internalMoveList}
        loading={loadingInternalMoveList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchInternalMoves}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={showInternalMoveDetails}
        displaySearchValue={displayStockMoveSeq}
        searchPlaceholder={I18n.t('Stock_Ref')}
        searchNavigate={navigate}
        scanKeySearch={scanKey}
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
          />
        }
        headerChildren={
          <>
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
              secondFilter
            />
          </>
        }
        renderListItem={({item}) => (
          <InternalMoveCard
            {...item}
            onPress={() => showInternalMoveDetails(item)}
          />
        )}
      />
    </Screen>
  );
};

export default InternalMoveListScreen;
