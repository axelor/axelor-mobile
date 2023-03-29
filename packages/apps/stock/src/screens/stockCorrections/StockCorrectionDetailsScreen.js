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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {HeaderContainer, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  StockCorrectionHeader,
  StockCorrectionButtons,
  StockCorrectionProductCardInfo,
  StockCorrectionQuantityCard,
  StockCorrectionReasonPicker,
} from '../../components';
import {fetchStockCorrectionReasons} from '../../features/stockCorrectionReasonSlice';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import StockCorrection from '../../types/stock-corrrection';
import {
  clearStockCorrection,
  fetchStockCorrection,
} from '../../features/stockCorrectionSlice';

const CREATION_MODE = 'creation';
const VISUALISATION_MODE = 'visualisation';

const StockCorrectionDetailsScreen = ({route}) => {
  const stockCorrectionId = route.params.stockCorrectionId;
  const routeProduct = route.params.stockProduct;
  const routeLocation = route.params.stockLocation;
  const routeTrackingNumber = route.params.trackingNumber || null;
  const dispatch = useDispatch();

  const mode = useMemo(
    () =>
      route.params.stockCorrectionId != null
        ? VISUALISATION_MODE
        : CREATION_MODE,
    [route.params.stockCorrectionId],
  );

  const {stockCorrection} = useSelector(state => state.stockCorrection);
  const {loadingProduct, productFromId} = useSelector(state => state.product);
  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);

  useEffect(() => {
    dispatch(fetchStockCorrectionReasons());
    if (stockCorrectionId != null) {
      dispatch(fetchStockCorrection({id: stockCorrectionId}));
    } else {
      dispatch(clearStockCorrection());
    }
  }, [dispatch, stockCorrectionId]);

  useEffect(() => {
    if (stockCorrection != null) {
      dispatch(fetchProductWithId(stockCorrection.product.id));
    }

    if (stockCorrectionId != null) {
      if (stockCorrection != null) {
        dispatch(
          fetchProductIndicators({
            version: stockCorrection.product.$version,
            productId: stockCorrection.product.id,
            companyId: activeCompany?.id,
            stockLocationId: stockCorrection.stockLocation.id,
          }),
        );
      }
    } else {
      dispatch(
        fetchProductIndicators({
          version: routeProduct.version,
          productId: routeProduct.id,
          companyId: activeCompany?.id,
          stockLocationId: routeLocation.id,
        }),
      );
    }
  }, [
    dispatch,
    activeCompany,
    stockCorrection,
    routeProduct,
    routeLocation,
    stockCorrectionId,
  ]);

  const [loading, setLoading] = useState(true); // Indicator for initialisation of variables
  const [saveStatus, setSaveStatus] = useState(); // Inidicator for changes

  const [status, setStatus] = useState();
  const [stockLocation, setStockLocation] = useState();
  const [stockProduct, setStockProduct] = useState();
  const [trackingNumber, setTrackingNumber] = useState();
  const [databaseQty, setDatabaseQty] = useState();
  const [realQty, setRealQty] = useState();
  const [reason, setReason] = useState();

  const initVariables = useCallback(() => {
    if (mode === CREATION_MODE) {
      setStatus(StockCorrection.status.Draft);
      setStockLocation(routeLocation);
      setStockProduct(routeProduct);
      setTrackingNumber(routeTrackingNumber);
      if (productIndicators.id !== routeProduct.id) {
        setLoading(true);
        return;
      } else {
        setDatabaseQty(productIndicators?.realQty);
        setRealQty(productIndicators?.realQty);
      }
      setReason({name: '', id: null});

      setSaveStatus(false);
    } else {
      if (stockCorrection == null) {
        setLoading(true);
        return;
      }

      setStatus(stockCorrection.statusSelect);
      setStockLocation(stockCorrection.stockLocation);
      setStockProduct(productFromId);
      setTrackingNumber(stockCorrection.trackingNumber);

      if (stockCorrection.statusSelect === StockCorrection.status.Validated) {
        setDatabaseQty(stockCorrection.baseQty);
      } else {
        setDatabaseQty(productIndicators?.realQty);
      }

      setRealQty(stockCorrection.realQty);
      setReason(stockCorrection.stockCorrectionReason);

      setSaveStatus(true);
    }
    setLoading(false);
  }, [
    mode,
    productFromId,
    productIndicators,
    routeTrackingNumber,
    routeLocation,
    routeProduct,
    stockCorrection,
  ]);

  useEffect(() => {
    initVariables();
  }, [initVariables]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <StockCorrectionButtons
          realQty={realQty}
          reason={reason}
          stockCorrection={stockCorrection}
          externeNavigation={route.params.externeNavigation}
          saveStatus={saveStatus}
          status={status}
          stockLocation={stockLocation}
          stockProduct={stockProduct}
          trackingNumber={trackingNumber}
        />
      }
      loading={loadingProduct}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockCorrectionHeader
            status={status}
            stockLocation={stockLocation}
          />
        }
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <StockCorrectionProductCardInfo
            stockProduct={stockProduct}
            trackingNumber={trackingNumber}
          />
          <StockCorrectionQuantityCard
            databaseQty={databaseQty}
            realQty={realQty}
            setRealQty={setRealQty}
            setSaveStatus={setSaveStatus}
            status={status}
            stockProduct={stockProduct}
          />
          <StockCorrectionReasonPicker
            reason={reason}
            setReason={setReason}
            setSaveStatus={setSaveStatus}
            status={status}
          />
        </ScrollView>
      )}
    </Screen>
  );
};

export default StockCorrectionDetailsScreen;
