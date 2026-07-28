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
  HeaderContainer,
  Screen,
  KeyboardAvoidingScrollView,
  useThemeColor,
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
  StockCorrectionQuantityCard,
  StockCorrectionReasonPicker,
  StockCorrectionHtmlInput,
  StockCorrectionTrackingNumberSelect,
  ProductCardInfo,
} from '../../components';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import {fetchStockCorrection} from '../../features/stockCorrectionSlice';
import {useProductByCompany} from '../../hooks';

const StockCorrectionDetailsScreen = ({route}: any) => {
  const {stockCorrectionId} = route?.params ?? {};
  const Colors = useThemeColor();
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
  const [comments, setComments] = useState<string | undefined>();
  const [realQty, setRealQty] = useState<number>(0);
  const [reason, setReason] = useState<any>();

  const databaseQty = useMemo(
    () =>
      stockCorrection?.statusSelect === StockCorrection?.statusSelect.Validated
        ? stockCorrection?.baseQty
        : productIndicators?.realQty,
    [
      StockCorrection?.statusSelect.Validated,
      productIndicators?.realQty,
      stockCorrection,
    ],
  );

  const getStockCorrection = useCallback(() => {
    dispatch((fetchStockCorrection as any)({id: stockCorrectionId}));
  }, [dispatch, stockCorrectionId]);

  useEffect(() => {
    getStockCorrection();
  }, [getStockCorrection]);

  useEffect(() => {
    if (stockCorrection != null) {
      dispatch(
        (fetchProductIndicators as any)({
          version: stockCorrection?.product.version,
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
  )
    return null;

  return (
    <Screen
      removeSpaceOnTop
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
        fixedItems={<StockCorrectionHeader {...stockCorrection} />}
      />
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        refresh={{fetcher: getStockCorrection, loading}}>
        <ProductCardInfo
          product={product}
          trackingNumber={stockCorrection.trackingNumber}
        />
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
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
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    width: '92%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingBottom: 10,
    marginTop: 4,
    marginBottom: 125,
  },
});

export default StockCorrectionDetailsScreen;
