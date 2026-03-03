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
import {StyleSheet, View} from 'react-native';
import {
  ChipSelect,
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  filterChip,
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  ManufacturingOrderHeader,
  ManufacturingOrderCard,
} from '../../../components';
import {fetchChildrenOfManufacturingOrder} from '../../../features/manufacturingOrderSlice';

const ChildrenManufOrderListScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {ManufOrder} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const [filteredList, setFilteredList] = useState(childrenManufOrders);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const {
    loadingChildrenMO,
    moreLoadingChildrenMO,
    isListEndChildrenMO,
    childrenManufOrders,
  } = useSelector(state => state.manufacturingOrder);
  const {user} = useSelector(state => state.user);

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'statusSelect');
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(childrenManufOrders));
  }, [filterOnStatus, childrenManufOrders]);

  const fetchManufOrdersAPI = useCallback(
    (page = 0) => {
      dispatch(
        fetchChildrenOfManufacturingOrder({
          parentManufOrderId: manufOrder?.id,
          companyId: user.activeCompany?.id,
          page,
        }),
      );
    },
    [dispatch, manufOrder?.id, user.activeCompany?.id],
  );

  const handleViewItem = item => {
    if (item != null) {
      navigation.popTo('ManufacturingOrderDetailsScreen', {
        manufacturingOrderId: item.id,
      });
    }
  };

  const statusList = useMemo(() => {
    const statusToDisplay = [
      ManufOrder?.statusSelect.Draft,
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
          <>
            <ManufacturingOrderHeader
              parentMO={manufOrder.parentMO}
              reference={manufOrder.manufOrderSeq}
              status={manufOrder.statusSelect}
              priority={manufOrder.prioritySelect}
            />
            <View style={styles.titleContainer}>
              <Text>{I18n.t('Manufacturing_ChildrenMO')}</Text>
            </View>
          </>
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
        loadingList={loadingChildrenMO}
        data={filteredList}
        renderItem={({item}) => (
          <ManufacturingOrderCard
            reference={item.manufOrderSeq}
            status={item.statusSelect}
            style={styles.item}
            priority={item.prioritySelect == null ? null : item.prioritySelect}
            productName={item.product.fullName}
            qty={item.qty}
            unit={item.unit}
            link={{ordersRef: item.saleOrderSet, client: item.clientPartner}}
            plannedStartDate={item.plannedStartDateT}
            plannedEndDate={item.plannedEndDateT}
            realStartDate={item.realStartDateT}
            realEndDate={item.realEndDateT}
            onPress={() => handleViewItem(item)}
          />
        )}
        fetchData={fetchManufOrdersAPI}
        isListEnd={isListEndChildrenMO}
        moreLoading={moreLoadingChildrenMO}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginBottom: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default ChildrenManufOrderListScreen;
