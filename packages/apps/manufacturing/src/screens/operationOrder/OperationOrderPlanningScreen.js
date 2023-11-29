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

import React, {useCallback, useMemo} from 'react';
import {ObjectCard, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {PlanningView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchPlannedOperationOrder} from '../../features/operationOrderSlice';
import OperationOrder from '../../types/operation-order';

function OperationOrderPlanningScreen({navigation}) {
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {plannedOperationOrderList, loading} = useSelector(
    state => state.operationOrder,
  );

  const listItem = useMemo(
    () =>
      OperationOrder.getCalendarListItems(plannedOperationOrderList, Colors),
    [Colors, plannedOperationOrderList],
  );

  const fetchItemsByMonth = useCallback(
    date => {
      dispatch(fetchPlannedOperationOrder(date));
    },
    [dispatch],
  );

  const navigateToOperationOrder = id => {
    if (id != null) {
      navigation.navigate('OperationOrderDetailsScreen', {
        operationOrderId: id,
      });
    }
  };

  const rendBorderColor = borderColor => {
    return {
      borderLeftWidth: 7,
      borderLeftColor: borderColor,
    };
  };

  const renderDayEventDetails = ({id, data: operationOrder}) => {
    if (operationOrder == null) {
      return null;
    }

    return (
      <ObjectCard
        onPress={() => navigateToOperationOrder(operationOrder?.id)}
        key={id}
        style={rendBorderColor(operationOrder.border)}
        upperTexts={{
          items: [
            {isTitle: true, displayText: operationOrder.ref},
            {displayText: operationOrder.name},
            {iconName: 'pallet', indicatorText: operationOrder.workCenter},
          ],
        }}
      />
    );
  };

  const renderDayEvent = ({id, data: operationOrder}) => {
    if (operationOrder == null) {
      return null;
    }

    return (
      <ObjectCard
        onPress={() => navigateToOperationOrder(operationOrder?.id)}
        key={id}
        style={rendBorderColor(operationOrder.border)}
        upperTexts={{
          items: [
            {isTitle: true, displayText: operationOrder.ref},
            {iconName: 'pallet', indicatorText: operationOrder.workCenter},
          ],
        }}
      />
    );
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <PlanningView
        itemList={listItem}
        renderItem={renderDayEventDetails}
        renderFullDayItem={renderDayEvent}
        fetchbyMonth={fetchItemsByMonth}
        loading={loading}
      />
    </Screen>
  );
}

export default OperationOrderPlanningScreen;
