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
  HazardPhraseAlert,
  HazardPhraseDropdownCard,
  OperationOrderDatesCard,
  OperationOrderHeader,
  OperationOrderLabelTextList,
  OperationOrderStopwatch,
} from '../../components';
import {fetchOperationOrderById} from '../../features/operationOrderSlice';

const MODELS = {
  Operation: 'com.axelor.apps.production.db.OperationOrder',
  Machine: 'com.axelor.apps.production.db.Machine',
};

function OperationOrderDetailsScreen({route, navigation}) {
  const {operationOrderId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {loadingOrder, operationOrder} = useSelector(
    state => state.operationOrder,
  );

  const [alertVisible, setAlertVisible] = useState(false);

  useContextRegister({
    models: [
      {model: MODELS.Operation, id: operationOrder?.id},
      {model: MODELS.Machine, id: operationOrder?.machine?.id},
    ],
  });

  const getOperationOrder = useCallback(() => {
    dispatch((fetchOperationOrderById as any)({operationOrderId}));
  }, [dispatch, operationOrderId]);

  useEffect(() => {
    getOperationOrder();
  }, [getOperationOrder]);

  const hazardPhraseSet = useMemo(
    () => operationOrder?.prodProcessLine?.hazardPhraseSet,
    [operationOrder?.prodProcessLine?.hazardPhraseSet],
  );

  const hazardPhraseEnabled = useMemo(
    () =>
      baseConfig?.enableProductsSafety &&
      Array.isArray(hazardPhraseSet) &&
      hazardPhraseSet.length > 0,
    [baseConfig?.enableProductsSafety, hazardPhraseSet],
  );

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

  const handleStart = useCallback(() => {
    if (hazardPhraseEnabled) setAlertVisible(true);
  }, [hazardPhraseEnabled]);

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
        {hazardPhraseEnabled && (
          <HazardPhraseDropdownCard data={hazardPhraseSet} />
        )}
        <OperationOrderStopwatch onPlay={handleStart} />
      </ScrollView>
      <HazardPhraseAlert
        isVisible={alertVisible}
        data={hazardPhraseSet}
        handleClose={() => setAlertVisible(false)}
      />
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
