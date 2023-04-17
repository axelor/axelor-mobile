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

import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Badge,
  Card,
  LabelText,
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  clipboardProvider,
} from '@axelor/aos-mobile-core';
import {ManufacturingOrderHeader} from '../../components/organisms';
import {fetchLinkedManufOrders} from '../../features/manufacturingOrderSlice';
import ManufacturingOrder from '../../types/manufacturing-order';

const ManufacturingOrderListProductionOrderScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {loadingLinkMO, moreLoadingLinkMO, isListEndLinkMO, linkedManufOrders} =
    useSelector(state => state.manufacturingOrder);
  const dispatch = useDispatch();

  const fetchManufOrderAPI = useCallback(
    (page = 0) => {
      dispatch(
        fetchLinkedManufOrders({
          productionOrderList: manufOrder.productionOrderSet,
          page,
        }),
      );
    },
    [dispatch, manufOrder],
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
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                clipboardProvider.copyToClipboard(item?.manufOrderSeq)
              }>
              <Card style={styles.itemContainer}>
                <LabelText
                  style={styles.itemTitle}
                  title={item.manufOrderSeq}
                  iconName="tag"
                />
                <Badge
                  title={ManufacturingOrder.getStatus(item.statusSelect, I18n)}
                  color={ManufacturingOrder.getStatusColor(
                    item.statusSelect,
                    Colors,
                  )}
                />
              </Card>
            </TouchableOpacity>
          );
        }}
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
  itemContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '10%',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
});

export default ManufacturingOrderListProductionOrderScreen;
