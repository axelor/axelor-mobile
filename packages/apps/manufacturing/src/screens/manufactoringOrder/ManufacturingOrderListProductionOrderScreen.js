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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, ScrollList, HeaderContainer, Text} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  LinkedManufacturingOrderCard,
  ManufacturingOrderHeader,
} from '../../components';
import {fetchLinkedManufOrders} from '../../features/manufacturingOrderSlice';

const ManufacturingOrderListProductionOrderScreen = ({route}) => {
  const manufOrder = route.params.manufOrder;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingLinkMO, moreLoadingLinkMO, isListEndLinkMO, linkedManufOrders} =
    useSelector(state => state.manufacturingOrder);
  const {user} = useSelector(state => state.user);

  const fetchManufOrderAPI = useCallback(
    (page = 0) => {
      dispatch(
        fetchLinkedManufOrders({
          productionOrderList: manufOrder.productionOrderSet,
          companyId: user.activeCompany?.id,
          page,
        }),
      );
    },
    [dispatch, manufOrder.productionOrderSet, user.activeCompany?.id],
  );

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
            <Text style={styles.orderTitle}>
              {I18n.t('Manufacturing_RefOP')}
            </Text>
          </>
        }
      />
      <ScrollList
        loadingList={loadingLinkMO}
        data={linkedManufOrders}
        renderItem={({item}) => (
          <LinkedManufacturingOrderCard
            manufOrderSeq={item.manufOrderSeq}
            statusSelect={item.statusSelect}
          />
        )}
        fetchData={fetchManufOrderAPI}
        moreLoading={moreLoadingLinkMO}
        isListEnd={isListEndLinkMO}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  orderTitle: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
});

export default ManufacturingOrderListProductionOrderScreen;
