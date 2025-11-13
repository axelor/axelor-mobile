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
import {
  DoubleSearchLineContainer,
  StockMovePickingWidget,
} from '../../../organisms';
import {SupplierArrivalLineActionCard} from '../../../templates';
import {fetchSupplierArrivalLines} from '../../../../features/supplierArrivalLineSlice';
import {useLineHandler, useSupplierLinesWithRacks} from '../../../../hooks';
import {LineVerification, StockMoveLine} from '../../../../types';

const scanKey = 'trackingNumber-or-product_supplier-arrival-details';
const massScanKey = 'supplier-arrival-line_mass-scan';

const SupplierArrivalSearchLineContainer = ({}) => {
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
  const {supplierArrival} = useSelector(state => state.supplierArrival);
  const {loadingSALinesList, moreLoading, isListEnd} = useSelector(
    state => state.supplierArrivalLine,
  );
  const {supplierArrivalLineList, totalNumberLines} =
    useSupplierLinesWithRacks(supplierArrival);

  const handleNewLine = useCallback(() => {
    navigation.navigate('SupplierArrivalLineCreationScreen', {supplierArrival});
  }, [navigation, supplierArrival]);

  const handleViewAll = useCallback(() => {
    navigation.navigate('SupplierArrivalLineListScreen', {supplierArrival});
  }, [navigation, supplierArrival]);

  const handleShowLine = useCallback(
    (item: any, skipVerification: boolean = undefined) => {
      showLine({
        move: supplierArrival,
        line: item,
        skipVerification,
        type: LineVerification.type.incoming,
      });
    },
    [showLine, supplierArrival],
  );

  const handleLineSearch = useCallback(
    (item: any) => handleShowLine(item, true),
    [handleShowLine],
  );

  const handleRefresh = useCallback(() => {
    dispatch(
      (fetchSupplierArrivalLines as any)({
        supplierArrivalId: supplierArrival.id,
        page: 0,
      }),
    );
  }, [dispatch, supplierArrival.id]);

  const filterLine = useCallback(
    (item: any) => {
      return (
        StockMoveLine.hideLineQty(item, supplierArrival) ||
        parseFloat(item.realQty) == null ||
        parseFloat(item.realQty) < parseFloat(item.qty)
      );
    },
    [supplierArrival],
  );

  const showLineAdditionIcon = useMemo(() => {
    if (
      readonly ||
      !canCreate ||
      supplierArrival.statusSelect >= StockMove?.statusSelect.Realized
    ) {
      return false;
    }

    if (mobileSettings?.isSupplierArrivalLineAdditionEnabled == null) {
      return true;
    }

    return mobileSettings.isSupplierArrivalLineAdditionEnabled;
  }, [
    readonly,
    canCreate,
    supplierArrival,
    StockMove?.statusSelect.Realized,
    mobileSettings,
  ]);

  const sliceFunctionData = useMemo(
    () => ({supplierArrivalId: supplierArrival.id}),
    [supplierArrival.id],
  );

  return (
    <>
      <StockMovePickingWidget
        scanKey={massScanKey}
        stockMoveId={supplierArrival.id}
        stockMoveStatus={supplierArrival.statusSelect}
        totalLines={totalNumberLines}
        onRefresh={handleRefresh}
        handleShowLine={handleLineSearch}
      />
      <DoubleSearchLineContainer
        title={I18n.t('Stock_SupplierArrivalLines')}
        numberOfItems={totalNumberLines}
        objectList={supplierArrivalLineList}
        loadingList={loadingSALinesList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchSupplierArrivalLines}
        sliceFunctionData={sliceFunctionData}
        handleSelect={handleLineSearch}
        scanKey={scanKey}
        onViewPress={handleViewAll}
        filterLine={filterLine}
        showAction={showLineAdditionIcon}
        onAction={handleNewLine}
        renderItem={item => (
          <SupplierArrivalLineActionCard
            style={styles.container}
            supplierArrivalLine={item}
            handleShowLine={handleShowLine}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SupplierArrivalSearchLineContainer;
