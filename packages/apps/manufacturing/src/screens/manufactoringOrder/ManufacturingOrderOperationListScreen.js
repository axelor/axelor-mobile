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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ChipSelect,
  Screen,
  ScrollList,
  HeaderContainer,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ManufacturingOrderHeader, OperationOrderCard} from '../../components';
import {fetchOperationOrders} from '../../features/operationOrderSlice';

const ManufacturingOrderOperationListScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {ManufOrder} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {
    loadingList: loadingOperations,
    moreLoading,
    isListEnd,
    operationOrderList,
  } = useSelector(state => state.operationOrder);

  const [filteredList, setFilteredList] = useState(operationOrderList);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = item => {
    navigation.navigate('OperationOrderDetailsScreen', {
      operationOrderId: item.id,
    });
  };

  const fetchOperationOrdersAPI = useCallback(
    page => {
      dispatch(
        fetchOperationOrders({
          manufOrderId: manufOrder?.id,
          page: page,
        }),
      );
    },
    [dispatch, manufOrder?.id],
  );

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'statusSelect');
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(operationOrderList));
  }, [operationOrderList, filterOnStatus]);

  const statusList = useMemo(() => {
    const statusToDisplay = [
      ManufOrder?.statusSelect.Planned,
      ManufOrder?.statusSelect.InProgress,
      ManufOrder?.statusSelect.StandBy,
      ManufOrder?.statusSelect.Finished,
    ];

    return getSelectionItems(ManufOrder?.statusSelect, selectedStatus).filter(
      ({value}) => statusToDisplay.includes(value),
    );
  }, [ManufOrder?.statusSelect, getSelectionItems, selectedStatus]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
          />
        }
      />
      <ScrollList
        loadingList={loadingOperations}
        data={filteredList}
        renderItem={({item}) => (
          <OperationOrderCard
            style={styles.item}
            status={item.statusSelect}
            operationName={item.operationName}
            workcenter={item.workCenter.name}
            plannedDuration={item.plannedDuration}
            priority={item.priority}
            onPress={() => handleShowLine(item)}
          />
        )}
        fetchData={fetchOperationOrdersAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

export default ManufacturingOrderOperationListScreen;
