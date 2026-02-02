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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {CustomerDeliveryLineActionCard} from '../../../templates';
import {SearchLineContainer, StockMovePickingWidget} from '../../../organisms';
import {LineVerification, StockMoveLine} from '../../../../types';
import {fetchCustomerDeliveryLines} from '../../../../features/customerDeliveryLineSlice';
import {useCustomerLinesWithRacks, useLineHandler} from '../../../../hooks';

const scanKey = 'trackingNumber-or-product_dustomer-delivery-details';
const massScanKey = 'customer-delivery-line_mass-scan';

const CustomerDeliverySearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMove',
  });
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });
  const {showLine} = useLineHandler();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {customerDelivery} = useSelector(state => state.customerDelivery);
  const {loadingCDLinesList, moreLoading, isListEnd} = useSelector(
    state => state.customerDeliveryLine,
  );
  const {customerDeliveryLineList, totalNumberLines} =
    useCustomerLinesWithRacks(customerDelivery);

  const handleNewLine = useCallback(() => {
    navigation.navigate('CustomerDeliveryLineCreationScreen', {
      customerDelivery,
    });
  }, [customerDelivery, navigation]);

  const handleViewAll = useCallback(() => {
    navigation.navigate('CustomerDeliveryLineListScreen', {customerDelivery});
  }, [customerDelivery, navigation]);

  const handleShowLine = useCallback(
    (item: any, skipVerification = undefined) => {
      showLine({
        move: customerDelivery,
        line: item,
        skipVerification,
        type: LineVerification.type.outgoing,
      });
    },
    [customerDelivery, showLine],
  );

  const handleLineSearch = useCallback(
    (item: any) => handleShowLine(item, true),
    [handleShowLine],
  );

  const sliceFunctionData = useMemo(
    () => ({customerDeliveryId: customerDelivery?.id}),
    [customerDelivery?.id],
  );

  const handleRefresh = useCallback(
    () =>
      dispatch(
        (fetchCustomerDeliveryLines as any)({...sliceFunctionData, page: 0}),
      ),
    [dispatch, sliceFunctionData],
  );

  const filterLine = useCallback(
    (item: any) =>
      StockMoveLine.hideLineQty(item, customerDelivery) ||
      parseFloat(item.realQty) == null ||
      parseFloat(item.realQty) < parseFloat(item.qty),
    [customerDelivery],
  );

  const showLineAdditionIcon = useMemo(() => {
    if (
      readonly ||
      !canCreate ||
      customerDelivery.statusSelect >= StockMove?.statusSelect.Realized
    ) {
      return false;
    }

    if (mobileSettings?.isCustomerDeliveryLineAdditionEnabled == null) {
      return true;
    }

    return mobileSettings.isCustomerDeliveryLineAdditionEnabled;
  }, [
    StockMove?.statusSelect.Realized,
    canCreate,
    customerDelivery,
    mobileSettings,
    readonly,
  ]);

  return (
    <>
      <StockMovePickingWidget
        scanKey={massScanKey}
        stockMoveId={customerDelivery.id}
        stockMoveStatus={customerDelivery.statusSelect}
        totalLines={totalNumberLines}
        onRefresh={handleRefresh}
        handleShowLine={handleLineSearch}
      />
      <SearchLineContainer
        title={I18n.t('Stock_CustomerDeliveryLines')}
        numberOfItems={totalNumberLines}
        objectList={customerDeliveryLineList}
        loading={loadingCDLinesList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchCustomerDeliveryLines}
        sliceFunctionData={sliceFunctionData}
        handleSelect={handleLineSearch}
        scanKey={scanKey}
        onViewPress={handleViewAll}
        filterLine={filterLine}
        showAction={showLineAdditionIcon}
        onAction={handleNewLine}
        renderItem={item => (
          <CustomerDeliveryLineActionCard
            style={styles.card}
            customerDeliveryLine={item}
            handleShowLine={handleShowLine}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});

export default CustomerDeliverySearchLineContainer;
