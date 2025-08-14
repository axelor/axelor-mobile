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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  HeaderContainer,
  Picker,
  Screen,
  KeyboardAvoidingScrollView,
} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
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
  SupplierArrivalTrackingNumberSelect,
  SupplierArrivalOriginInput,
  SupplierArrivalLineDescription,
} from '../../components';
import {fetchProductForSupplier} from '../../features/supplierCatalogSlice';
import {fetchSupplierArrivalLine} from '../../features/supplierArrivalLineSlice';
import {updateStockMoveLineTrackingNumber} from '../../features/trackingNumberSlice';
import {StockMove as StockMoveType, StockMoveLine} from '../../types';
import {useProductByCompany} from '../../hooks';

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
  useContextRegister({
    models: [
      {
        model: 'com.axelor.apps.stock.db.StockMoveLine',
        id: supplierArrivalLineId,
      },
    ],
  });

  const {stock: stockConfig} = useSelector(state => state.appConfig);
  const {loadingSupplierArrivalLine, supplierArrivalLine} = useSelector(
    state => state.supplierArrivalLine,
  );

  const product = useProductByCompany(
    supplierArrivalLine.product?.id ?? productId,
  );

  const trackingNumber = useMemo(
    () => supplierArrivalLine?.trackingNumber,
    [supplierArrivalLine],
  );

  const [toStockLocation, setToStockLocation] = useState(null);
  const [realQty, setRealQty] = useState(0);
  const [origin, setOrigin] = useState();
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
    setOrigin(trackingNumber?.origin);
  }, [trackingNumber?.origin]);

  useEffect(() => {
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

  const handleTrackingNumberSelection = item => {
    if (item !== null) {
      dispatch(
        updateStockMoveLineTrackingNumber({
          trackingNumber: item,
          stockMoveLineId: supplierArrivalLine.id,
          stockMoveLineVersion: supplierArrivalLine.version,
        }),
      );
    }
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
          trackingNumber={trackingNumber}
          origin={origin}
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
        {trackingNumber != null && (
          <SupplierArrivalOriginInput
            setOrigin={setOrigin}
            trackingNumber={trackingNumber}
            readonly={
              supplierArrival.statusSelect === StockMove?.statusSelect.Realized
            }
          />
        )}
        {product.trackingNumberConfiguration != null &&
          trackingNumber == null && (
            <SupplierArrivalTrackingNumberSelect
              supplierArrival={supplierArrival}
              supplierArrivalLine={supplierArrivalLine}
              handleTrackingNumberSelection={handleTrackingNumberSelection}
              product={product}
            />
          )}
        <SupplierProductInfo />
        <SupplierArrivalLineQuantityCard
          realQty={realQty}
          setRealQty={setRealQty}
          supplierArrival={supplierArrival}
          supplierArrivalLine={supplierArrivalLine}
          readonly={readonly}
        />
        {stockConfig?.isManageStockLocationOnStockMoveLine ? (
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
        <SupplierArrivalLineDescription />
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
