/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  KeyboardAvoidingScrollView,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
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
import {StockMove as StockMoveType, StockMoveLine} from '../../types';

const stockLocationScanKey = 'to-stock-location_supplier-arrival-line-update';

const SupplierArrivalLineDetailScreen = ({route, navigation}) => {
  const {supplierArrival, supplierArrivalLineId, productId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {getSelectionItems, getItemTitle} = useTypeHelpers();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const {stock: stockConfig} = useSelector(state => state.appConfig);
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
    title: getItemTitle(
      StockMove?.conformitySelect,
      StockMove?.conformitySelect.None,
    ),
    value: StockMove?.conformitySelect.None,
  });

  useEffect(() => {
    setRealQty(
      StockMoveLine.hideLineQty(supplierArrivalLine, supplierArrival)
        ? 0
        : supplierArrivalLine?.realQty || 0,
    );
    setConformity({
      title: getItemTitle(
        StockMove?.conformitySelect,
        supplierArrivalLine?.conformitySelect ??
          StockMove?.conformitySelect.None,
      ),
      value:
        supplierArrivalLine != null
          ? supplierArrivalLine.conformitySelect
          : StockMove?.conformitySelect.None,
    });
    setToStockLocation(supplierArrivalLine?.toStockLocation);
  }, [
    supplierArrivalLine,
    I18n,
    supplierArrival,
    getItemTitle,
    StockMove?.conformitySelect,
  ]);

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
        title: getItemTitle(
          StockMove?.conformitySelect,
          StockMove?.conformitySelect.None,
        ),
        value: StockMove?.conformitySelect.None,
      });
    } else {
      setConformity({
        title: getItemTitle(StockMove?.conformitySelect, item),
        value: item,
      });
    }
  };

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const conformityList = useMemo(() => {
    const conformityToDisplay = [
      StockMove?.conformitySelect.Compliant,
      StockMove?.conformitySelect.Non_Compliant,
    ];

    return getSelectionItems(StockMove?.conformitySelect).filter(({value}) =>
      conformityToDisplay.includes(value),
    );
  }, [StockMove?.conformitySelect, getSelectionItems]);

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
            date={StockMoveType.getStockMoveDate(
              supplierArrival.statusSelect,
              supplierArrival,
            )}
          />
        }
      />
      <KeyboardAvoidingScrollView
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
          readonly={readonly}
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
              readonly ||
              supplierArrival?.statusSelect !== StockMove?.statusSelect.Planned
            }
          />
        ) : null}
        <Picker
          title={I18n.t('Stock_Conformity')}
          onValueChange={item => handleConformityChange(item)}
          defaultValue={conformity?.id}
          listItems={conformityList}
          labelField="title"
          valueField="value"
          readonly={
            readonly ||
            supplierArrival?.statusSelect === StockMove?.statusSelect.Realized
          }
          isScrollViewContainer={true}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default SupplierArrivalLineDetailScreen;
