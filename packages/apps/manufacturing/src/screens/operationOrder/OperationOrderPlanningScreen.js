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
import {StyleSheet, TouchableOpacity} from 'react-native';
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

function OperationOrderPlanningScreen({navigation}) {
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
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateToOperationOrder(id)}>
        <Card
          key={id}
          style={[
            styles.containerDetails,
            rendBorderColor(operationOrder.border),
          ]}>
          <Text style={styles.bold}>{operationOrder.ref}</Text>
          <Text>{operationOrder.name}</Text>
          <LabelText iconName="pallet" title={operationOrder.workCenter} />
        </Card>
      </TouchableOpacity>
    );
  };

  const renderDayEvent = ({id, data: operationOrder}) => {
    if (operationOrder == null) {
      return null;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateToOperationOrder(id)}>
        <Card
          key={id}
          style={[styles.container, rendBorderColor(operationOrder.border)]}>
          <Text style={styles.bold}>{operationOrder.ref}</Text>
          <LabelText iconName="pallet" title={operationOrder.workCenter} />
        </Card>
      </TouchableOpacity>
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

const getStyles = Colors =>
  StyleSheet.create({
    containerDetails: {
      alignSelf: 'center',
      width: '100%',
    },
    container: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    bold: {
      fontWeight: 'bold',
    },
  });

export default OperationOrderPlanningScreen;
