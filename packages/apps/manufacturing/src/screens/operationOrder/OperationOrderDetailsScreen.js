/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet} from 'react-native';
import {
  HalfLabelCard,
  HeaderContainer,
  Screen,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  OperationOrderDatesCard,
  OperationOrderHeader,
  OperationOrderLabelTextList,
  OperationOrderStopwatch,
} from '../../components';
import {fetchOperationOrderById} from '../../features/operationOrderSlice';
import {CONSUMED_PRODUCT_CONTEXT} from '../../utils/consumedProductConsts';

function OperationOrderDetailsScreen({route, navigation}) {
  const {operationOrderId} = route.params;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {loadingOrder, operationOrder} = useSelector(
    state => state.operationOrder,
  );

  useContextRegister({
    models: [
      {
        model: 'com.axelor.apps.production.db.OperationOrder',
        id: operationOrder?.id,
      },
      {
        model: 'com.axelor.apps.production.db.Machine',
        id: operationOrder?.machine?.id,
      },
    ],
  });

  const getOperationOrder = useCallback(() => {
    dispatch(fetchOperationOrderById({operationOrderId}));
  }, [dispatch, operationOrderId]);

  useEffect(() => {
    getOperationOrder();
  }, [getOperationOrder]);

  const showConsumedProducts =
    operationOrder?.manufOrder?.isConsProOnOperation === true;

  const handleOpenConsumedProducts = useCallback(() => {
    if (operationOrder == null) {
      return;
    }

    navigation.navigate('OperationOrderConsumedProductListScreen', {
      context: CONSUMED_PRODUCT_CONTEXT.OPERATION_ORDER,
      operationOrder,
      manufOrder: operationOrder?.manufOrder,
    });
  }, [navigation, operationOrder]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <OperationOrderHeader
            manufOrderRef={operationOrder?.manufOrder?.manufOrderSeq}
            name={operationOrder?.operationName}
            status={operationOrder?.statusSelect}
            priority={operationOrder?.priority}
          />
        }
        expandableFilter={false}
      />
      <ScrollView
        style={styles.scrollView}
        refresh={{loading: loadingOrder, fetcher: getOperationOrder}}>
        <OperationOrderDatesCard />
        <OperationOrderLabelTextList />
        {showConsumedProducts && (
          <HalfLabelCard
            style={styles.actionCard}
            iconName="dolly"
            title={I18n.t('Manufacturing_ConsumedProduct')}
            onPress={handleOpenConsumedProducts}
          />
        )}
        <OperationOrderStopwatch />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: null,
  },
  actionCard: {
    marginHorizontal: 20,
  },
});

export default OperationOrderDetailsScreen;
