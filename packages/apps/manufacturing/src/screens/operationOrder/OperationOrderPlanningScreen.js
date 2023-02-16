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
import {StyleSheet} from 'react-native';
import {
  Card,
  LabelText,
  Screen,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {PlanningView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchPlannedOperationOrder} from '../../features/operationOrderSlice';
import OperationOrder from '../../types/operation-order';

function OperationOrderPlanningScreen() {
  const {plannedOperationOrderList, loading} = useSelector(
    state => state.operationOrder,
  );
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

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

  const rendBorderColor = borderColor => {
    return {
      borderLeftWidth: 7,
      borderLeftColor: borderColor,
    };
  };

  const renderDayEvent = ({id, data: operationOrder}) => {
    if (operationOrder == null) {
      return null;
    }
    return (
      <Card
        key={id}
        style={[styles.container, rendBorderColor(operationOrder.border)]}>
        <Text style={styles.bold}>{operationOrder.ref}</Text>
        <Text>{operationOrder.name}</Text>
        <LabelText iconName="pallet" title={operationOrder.workCenter} />
      </Card>
    );
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <PlanningView
        itemList={listItem}
        renderItem={renderDayEvent}
        fetchbyMonth={fetchItemsByMonth}
        loading={loading}
      />
    </Screen>
  );
}

const getStyles = Colors =>
  StyleSheet.create({
    containerListItem: {
      flexDirection: 'row',
      marginVertical: '3%',
    },
    firstItemContainer: {
      flexDirection: 'row',
      marginTop: '5%',
      marginBottom: '3%',
    },
    containerTime: {
      flexDirection: 'column',
    },
    container: {
      alignSelf: 'center',
      width: '100%',
    },
    bold: {
      fontWeight: 'bold',
    },
    borderBottom: {
      position: 'absolute',
      width: '80%',
      borderBottomWidth: 1.5,
      borderBottomColor: Colors.secondaryColor.background,
      bottom: -10,
      right: '10%',
    },
    borderTop: {
      position: 'absolute',
      width: '80%',
      borderTopWidth: 1.5,
      borderTopColor: Colors.secondaryColor.background,
      top: -10,
      right: '10%',
    },
  });

export default OperationOrderPlanningScreen;
