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

import React, {useEffect, useMemo, useState} from 'react';
import {HeaderContainer, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  StockCorrectionHeader,
  StockCorrectionButtons,
  StockCorrectionProductCardInfo,
  StockCorrectionQuantityCard,
  StockCorrectionReasonPicker,
  StockCorrectionTrackingNumberSelect,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import StockCorrection from '../../types/stock-corrrection';
import {fetchStockCorrection} from '../../features/stockCorrectionSlice';

const StockCorrectionDetailsScreen = ({route}) => {
  const stockCorrectionId = route.params.stockCorrectionId;
  const dispatch = useDispatch();

  const {stockCorrection} = useSelector(state => state.stockCorrection);
  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {productFromId: product} = useSelector(state => state.product);

  const [saveStatus, setSaveStatus] = useState(true);
  const [realQty, setRealQty] = useState();
  const [reason, setReason] = useState();

  const databaseQty = useMemo(() => {
    if (stockCorrection?.statusSelect === StockCorrection.status.Validated) {
      return stockCorrection?.baseQty;
    }

    return productIndicators?.realQty;
  }, [productIndicators?.realQty, stockCorrection]);

  useEffect(() => {
    dispatch(fetchStockCorrection({id: stockCorrectionId}));
  }, [dispatch, stockCorrectionId]);

  useEffect(() => {
    if (stockCorrection != null) {
      dispatch(fetchProductWithId(stockCorrection?.product.id));
    }

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
      <ScrollView>
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
        />
        <StockCorrectionReasonPicker
          reason={reason}
          setReason={setReason}
          setSaveStatus={setSaveStatus}
          status={stockCorrection.statusSelect}
        />
      </ScrollView>
    </Screen>
  );
};

export default StockCorrectionDetailsScreen;
