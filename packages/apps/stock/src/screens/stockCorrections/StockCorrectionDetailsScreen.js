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

import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  HeaderContainer,
  PopUpOneButton,
  Screen,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
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

const StockCorrectionDetailsScreen = ({navigation, route}) => {
  const I18n = useTranslator();
  const {loadingProduct, productFromId} = useSelector(state => state.product);
  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {mobileSettings} = useSelector(state => state.config);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockCorrectionReasons());
    if (route.params.stockCorrection != null) {
      dispatch(fetchProductWithId(route.params.stockCorrection.product.id));
    }

    dispatch(
      fetchProductIndicators({
        version:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.product.$version
            : route.params.stockProduct.version,
        productId:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.product.id
            : route.params.stockProduct.id,
        companyId: activeCompany?.id,
        stockLocationId:
          route.params.stockCorrection != null
            ? route.params.stockCorrection.stockLocation.id
            : route.params.stockLocation.id,
      }),
    );
  }, [dispatch, activeCompany?.id, route.params]);

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
    if (route.params.stockCorrection == null) {
      setStatus(StockCorrection.status.Draft);
      setStockLocation(route.params.stockLocation);
      setStockProduct(route.params.stockProduct);
      setTrackingNumber(
        route.params.trackingNumber == null
          ? null
          : route.params.trackingNumber,
      );
      if (productIndicators.id !== route.params.stockProduct.id) {
        setLoading(true);
        return;
      } else {
        setDatabaseQty(productIndicators?.realQty);
        setRealQty(productIndicators?.realQty);
      }
      setReason({name: '', id: null});

      setSaveStatus(false);
    } else {
      const stockCorrection = route.params.stockCorrection;
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
  }, [productFromId, productIndicators, route.params]);

  useEffect(() => {
    initVariables();
  }, [initVariables]);

  const [popUp, setPopUp] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.StockCorrection"
          modelId={route.params.stockCorrection?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, route.params.stockCorrection]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <StockCorrectionButtons
          navigation={navigation}
          realQty={realQty}
          reason={reason}
          stockCorrection={route.params.stockCorrection}
          externeNavigation={route.params.externeNavigation}
          saveStatus={saveStatus}
          setPopUp={setPopUp}
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
          <PopUpOneButton
            visible={popUp}
            title={I18n.t('Auth_Warning')}
            data={I18n.t('Stock_ReasonRequired')}
            btnTitle={I18n.t('Auth_Close')}
            onPress={() => setPopUp(!popUp)}
          />
          <StockCorrectionProductCardInfo
            navigation={navigation}
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
