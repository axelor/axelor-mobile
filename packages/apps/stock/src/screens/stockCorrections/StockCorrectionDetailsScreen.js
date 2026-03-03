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
  HeaderContainer,
  Screen,
  KeyboardAvoidingScrollView,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  StockCorrectionHeader,
  StockCorrectionButtons,
  StockCorrectionProductCardInfo,
  StockCorrectionQuantityCard,
  StockCorrectionReasonPicker,
  StockCorrectionHtmlInput,
  StockCorrectionTrackingNumberSelect,
} from '../../components';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {fetchStockCorrection} from '../../features/stockCorrectionSlice';
import {useProductByCompany} from '../../hooks';

const StockCorrectionDetailsScreen = ({route}) => {
  const stockCorrectionId = route.params.stockCorrectionId;
  const dispatch = useDispatch();
  const {StockCorrection} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockCorrection',
  });

  const {loading, stockCorrection} = useSelector(
    state => state.stockCorrection,
  );
  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);

  const product = useProductByCompany(stockCorrection?.product.id);

  const [saveStatus, setSaveStatus] = useState(true);
  const [comments, setComments] = useState();
  const [realQty, setRealQty] = useState();
  const [reason, setReason] = useState();

  const databaseQty = useMemo(() => {
    if (
      stockCorrection?.statusSelect === StockCorrection?.statusSelect.Validated
    ) {
      return stockCorrection?.baseQty;
    }

    return productIndicators?.realQty;
  }, [
    StockCorrection?.statusSelect.Validated,
    productIndicators?.realQty,
    stockCorrection,
  ]);

  const getStockCorrection = useCallback(() => {
    dispatch(fetchStockCorrection({id: stockCorrectionId}));
  }, [dispatch, stockCorrectionId]);

  useEffect(() => {
    getStockCorrection();
  }, [getStockCorrection]);

  useEffect(() => {
    if (stockCorrection != null) {
      dispatch(
        fetchProductIndicators({
          version: stockCorrection?.product.$version,
          productId: stockCorrection?.product.id,
          companyId: activeCompany?.id,
          stockLocationId: stockCorrection?.stockLocation.id,
        }),
      );
    }
  }, [dispatch, activeCompany, stockCorrection, stockCorrectionId]);

  useEffect(() => {
    setRealQty(stockCorrection?.realQty);
    setReason(stockCorrection?.stockCorrectionReason || {name: '', id: null});
    setComments(stockCorrection?.comments);
  }, [stockCorrection]);

  if (
    stockCorrection?.id !== stockCorrectionId ||
    stockCorrection?.product?.id !== product?.id
  ) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <StockCorrectionButtons
          realQty={realQty}
          reason={reason}
          stockCorrection={stockCorrection}
          saveStatus={saveStatus}
          status={stockCorrection.statusSelect}
          comments={comments}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockCorrectionHeader
            status={stockCorrection.statusSelect}
            stockLocation={stockCorrection.stockLocation}
          />
        }
      />
      <KeyboardAvoidingScrollView
        refresh={{fetcher: getStockCorrection, loading}}
        style={styles.scroll}>
        <StockCorrectionProductCardInfo
          stockProduct={product}
          trackingNumber={stockCorrection.trackingNumber}
        />
        <StockCorrectionTrackingNumberSelect
          product={product}
          stockCorrection={stockCorrection}
          visible={
            stockCorrection.trackingNumber == null &&
            product.trackingNumberConfiguration != null
          }
        />
        <StockCorrectionQuantityCard
          databaseQty={databaseQty}
          realQty={realQty}
          setRealQty={setRealQty}
          setSaveStatus={setSaveStatus}
          status={stockCorrection.statusSelect}
          stockProduct={product}
          readonly={readonly}
        />
        <StockCorrectionReasonPicker
          reason={reason}
          setReason={setReason}
          setSaveStatus={setSaveStatus}
          status={stockCorrection.statusSelect}
          readonly={readonly}
        />
        <StockCorrectionHtmlInput
          setComments={setComments}
          stockCorrection={stockCorrection}
          setSaveStatus={setSaveStatus}
          readonly={readonly}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: null,
    paddingBottom: 100,
  },
});

export default StockCorrectionDetailsScreen;
