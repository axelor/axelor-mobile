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

import React, {useCallback, useEffect, useMemo} from 'react';
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

function OperationOrderDetailsScreen({route, navigation}) {
  const {operationOrderId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

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

  const showConsumedProducts = useMemo(
    () => operationOrder?.manufOrder?.isConsProOnOperation,
    [operationOrder?.manufOrder?.isConsProOnOperation],
  );

  const handleOpenConsumedProducts = useCallback(() => {
    navigation.navigate('ConsumedProductListScreen', {
      operationOrderId: operationOrderId,
      manufOrder: operationOrder.manufOrder,
    });
  }, [navigation, operationOrder.manufOrder, operationOrderId]);

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
      <ScrollView refresh={{loading: loadingOrder, fetcher: getOperationOrder}}>
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
  actionCard: {
    width: '90%',
    height: undefined,
    alignSelf: 'center',
    marginLeft: 0,
    marginRight: 0,
  },
});

export default OperationOrderDetailsScreen;
