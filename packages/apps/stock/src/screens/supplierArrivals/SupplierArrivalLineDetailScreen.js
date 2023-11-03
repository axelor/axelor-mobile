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
import {StyleSheet} from 'react-native';
import {
  HeaderContainer,
  Picker,
  Screen,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  StockMoveHeader,
  ProductCardInfo,
  SupplierArrivalLineButtons,
  SupplierArrivalLineQuantityCard,
  SupplierProductInfo,
  StockLocationSearchBar,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchProductForSupplier} from '../../features/supplierCatalogSlice';
import {fetchSupplierArrivalLine} from '../../features/supplierArrivalLineSlice';
import {StockMove, StockMoveLine} from '../../types';

const stockLocationScanKey = 'to-stock-location_supplier-arrival-line-update';

const SupplierArrivalLineDetailScreen = ({route, navigation}) => {
  const {supplierArrival, supplierArrivalLineId, productId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {stockConfig} = useSelector(state => state.stockAppConfig);
  const {productFromId: product} = useSelector(state => state.product);
  const {loadingSupplierArrivalLine, supplierArrivalLine} = useSelector(
    state => state.supplierArrivalLine,
  );

  const trackingNumber = useMemo(
    () => supplierArrivalLine?.trackingNumber,
    [supplierArrivalLine],
  );

  const [toStockLocation, setToStockLocation] = useState(null);
  const [realQty, setRealQty] = useState(0);
  const [conformity, setConformity] = useState({
    name: StockMove.getConformity(StockMove.conformity.None, I18n),
    id: StockMove.conformity.None,
  });

  useEffect(() => {
    setRealQty(
      StockMoveLine.hideLineQty(supplierArrivalLine, supplierArrival)
        ? 0
        : supplierArrivalLine?.realQty || 0,
    );
    setConformity({
      name: StockMove.getConformity(
        supplierArrivalLine?.conformitySelect ?? StockMove.conformity.None,
        I18n,
      ),
      id:
        supplierArrivalLine != null
          ? supplierArrivalLine.conformitySelect
          : StockMove.conformity.None,
    });
    setToStockLocation(supplierArrivalLine?.toStockLocation);
  }, [supplierArrivalLine, I18n, supplierArrival]);

  useEffect(() => {
    dispatch(fetchProductWithId(supplierArrivalLine.product?.id ?? productId));
    dispatch(
      fetchProductForSupplier({
        supplierId: supplierArrival?.partner?.id,
        productId: supplierArrivalLine.product?.id ?? productId,
      }),
    );
  }, [dispatch, productId, supplierArrival, supplierArrivalLine]);

  const getSupplierArrivalLine = useCallback(() => {
    dispatch(
      fetchSupplierArrivalLine({
        supplierArrivalLineId: supplierArrivalLineId,
      }),
    );
  }, [dispatch, supplierArrivalLineId]);

  useEffect(() => {
    getSupplierArrivalLine();
  }, [getSupplierArrivalLine]);

  const handleConformityChange = item => {
    if (item === null) {
      setConformity({
        name: StockMove.getConformity(StockMove.conformity.None, I18n),
        id: StockMove.conformity.None,
      });
    } else {
      setConformity({name: StockMove.getConformity(item, I18n), id: item});
    }
  };

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <SupplierArrivalLineButtons
          conformity={conformity}
          realQty={realQty}
          toStockLocation={toStockLocation}
          supplierArrival={supplierArrival}
          supplierArrivalLine={supplierArrivalLine}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            lineRef={supplierArrivalLine?.name}
            date={StockMove.getStockMoveDate(
              supplierArrival.statusSelect,
              supplierArrival,
            )}
          />
        }
      />
      <ScrollView
        style={styles.container}
        refresh={{
          loading: loadingSupplierArrivalLine,
          fetcher: getSupplierArrivalLine,
        }}>
        <ProductCardInfo
          onPress={handleShowProduct}
          picture={product?.picture}
          code={product?.code}
          name={product?.name}
          trackingNumber={trackingNumber?.trackingNumberSeq}
        />
        <SupplierProductInfo />
        <SupplierArrivalLineQuantityCard
          realQty={realQty}
          setRealQty={setRealQty}
          supplierArrival={supplierArrival}
          supplierArrivalLine={supplierArrivalLine}
        />
        {stockConfig.isManageStockLocationOnStockMoveLine ? (
          <StockLocationSearchBar
            placeholderKey="Stock_ToStockLocation"
            defaultValue={toStockLocation}
            onChange={setToStockLocation}
            scanKey={stockLocationScanKey}
            isFocus={true}
            defaultStockLocation={supplierArrival.toStockLocation}
            readOnly={
              supplierArrival?.statusSelect !== StockMove.status.Planned
            }
          />
        ) : null}
        <Picker
          title={I18n.t('Stock_Conformity')}
          onValueChange={item => handleConformityChange(item)}
          defaultValue={conformity?.id}
          listItems={StockMove.getConformitySelection(I18n)}
          labelField="name"
          valueField="id"
          readonly={supplierArrival?.statusSelect === StockMove.status.Realized}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default SupplierArrivalLineDetailScreen;
