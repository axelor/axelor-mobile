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

import React, {useCallback, useMemo, useState} from 'react';
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  filterChip,
  PlanningView,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {fetchPlannedStockMoves} from '../../features/stockMoveSlice';
import {
  PlanningStockMoveCard,
  StockMovePlanningFilters,
} from '../../components';

function StockMovePlanningScreen() {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {planningList, loadingPlanning} = useSelector(
    state => state.stock_stockMove,
  );

  const [selectedType, setSelectedType] = useState<number | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [fromStockLocation, setFromStockLocation] = useState<any>();
  const [toStockLocation, setToStockLocation] = useState<any>();
  const [partner, setPartner] = useState<any>();

  const filteredList = useMemo(() => {
    if (planningList == null || planningList.length === 0) return [];
    const withTime = (date: string, time: string): string =>
      date.includes('T') ? date : `${date}T${time}`;

    return filterChip(planningList, selectedStatus, 'statusSelect')
      .filter((_m: any) => _m.estimatedDate != null || _m.realDate != null)
      .map((_m: any) => ({
        id: _m.id,
        startDate: withTime(_m.realDate ?? _m.estimatedDate, '00:00:00'),
        endDate: withTime(_m.realDate ?? _m.estimatedDate, '23:59:59'),
        data: {
          id: _m.id,
          statusSelect: _m.statusSelect,
          typeSelect: _m.typeSelect,
          stockMoveSeq: _m.stockMoveSeq,
          partner: _m.partner?.fullName,
          fromStockLocation: _m.fromStockLocation?.name,
          toStockLocation: _m.toStockLocation?.name,
        },
      }));
  }, [planningList, selectedStatus]);

  const fetchItemsByMonth = useCallback(
    ({date}: any) => {
      dispatch(
        (fetchPlannedStockMoves as any)({
          date,
          companyId: user.activeCompany?.id,
          typeSelect: selectedType,
          fromStockLocationId: fromStockLocation?.id,
          toStockLocationId: toStockLocation?.id,
          partnerId: partner?.id,
        }),
      );
    },
    [
      dispatch,
      fromStockLocation?.id,
      partner?.id,
      selectedType,
      toStockLocation?.id,
      user.activeCompany?.id,
    ],
  );

  const renderItem = useCallback(({id, data: move}: any) => {
    if (move == null) return null;

    return (
      <PlanningStockMoveCard
        key={id}
        id={move.id}
        statusSelect={move.statusSelect}
        typeSelect={move.typeSelect}
        stockMoveSeq={move.stockMoveSeq}
        partner={move.partner}
        fromStockLocation={move.fromStockLocation}
        toStockLocation={move.toStockLocation}
      />
    );
  }, []);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={true}>
        <StockMovePlanningFilters
          selectedType={selectedType}
          onChangeType={_v => {
            setSelectedType(_v);
            setFromStockLocation(null);
            setToStockLocation(null);
            setPartner(null);
          }}
          selectedStatus={selectedStatus}
          onChangeStatus={setSelectedStatus}
          fromStockLocation={fromStockLocation}
          onChangeFromStockLocation={setFromStockLocation}
          toStockLocation={toStockLocation}
          onChangeToStockLocation={setToStockLocation}
          partner={partner}
          onChangePartner={setPartner}
        />
      </HeaderContainer>
      <PlanningView
        loading={loadingPlanning}
        itemList={filteredList}
        renderItem={renderItem}
        renderFullDayItem={renderItem}
        fetchbyMonth={fetchItemsByMonth}
      />
    </Screen>
  );
}

export default StockMovePlanningScreen;
