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

import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useThemeColor,
  ViewAllContainer,
  Text,
  Badge,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchLinkedManufOrders} from '../../../features/manufacturingOrderSlice';

const ManufacturingOrderProductionOrderSetView = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {manufOrder, linkedManufOrders} = useSelector(
    state => state.manufacturingOrder,
  );
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    if (manufOrder != null) {
      dispatch(
        (fetchLinkedManufOrders as any)({
          productionOrderList: manufOrder.productionOrderSet,
          companyId: user.activeCompany?.id,
        }),
      );
    }
  }, [dispatch, manufOrder, user.activeCompany?.id]);

  const handleViewProductionOrderRefs = useCallback(() => {
    navigation.navigate('ManufacturingOrderListProductionOrderScreen', {
      manufOrder,
    });
  }, [manufOrder, navigation]);

  if (
    !Array.isArray(manufOrder.productionOrderSet) ||
    manufOrder.productionOrderSet.length === 0 ||
    !Array.isArray(linkedManufOrders) ||
    linkedManufOrders.length === 0
  ) {
    return null;
  }

  return (
    <ViewAllContainer
      onViewPress={handleViewProductionOrderRefs}
      disabled={linkedManufOrders.length === 0}
      translator={I18n.t}>
      <View style={styles.orderTitle}>
        <Text>{I18n.t('Manufacturing_RefOP')}</Text>
      </View>
      <View style={styles.orderSetContainer}>
        {linkedManufOrders.slice(0, 3).map(item => (
          <Badge
            style={styles.orderBadge}
            title={item.manufOrderSeq}
            key={item.id}
            color={Colors.priorityColor}
            numberOfLines={null}
          />
        ))}
      </View>
    </ViewAllContainer>
  );
};
const styles = StyleSheet.create({
  orderTitle: {
    marginHorizontal: 8,
  },
  orderSetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  orderBadge: {
    paddingHorizontal: 10,
    width: null,
  },
});

export default ManufacturingOrderProductionOrderSetView;
