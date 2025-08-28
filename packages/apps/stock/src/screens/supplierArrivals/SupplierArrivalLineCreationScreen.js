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

import React, {useCallback, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  FormHtmlInput,
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  ProductTrackingNumberSearchBar,
  StockLocationSearchBar,
  StockMoveHeader,
  SupplierArrivalLineCreationButton,
  SupplierArrivalLineQuantityCard,
  SupplierProductInfo,
} from '../../components';
import {default as StockMoveType} from '../../types/stock-move';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchProductForSupplier} from '../../features/supplierCatalogSlice';

const stockLocationScanKey = 'to-stock-location_supplier-arrival-line-creation';
const itemScanKey = 'product-tracking-number_supplier-arrival-line-creation';

const CREATION_STEP = {
  product_trackingNumber: 1,
  toStockLocation: 2,
  validation: 3,
};

const SupplierArrivalLineCreationScreen = ({route, navigation}) => {
  const {supplierArrival} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {getSelectionItems, getItemTitle} = useTypeHelpers();

  const {productFromId: product} = useSelector(state => state.product);
  const {stock: stockConfig} = useSelector(state => state.appConfig);

  const [_product, setProduct] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [realQty, setRealQty] = useState(0);
  const [description, setDescription] = useState('');
  const [toStockLocation, setToStockLocation] = useState(
    supplierArrival.toStockLocation,
  );
  const [conformity, setConformity] = useState({
    title: getItemTitle(
      StockMove?.conformitySelect,
      StockMove?.conformitySelect.None,
    ),
    value: StockMove?.conformitySelect.None,
  });
  const [currentStep, setCurrentStep] = useState(
    CREATION_STEP.product_trackingNumber,
  );

  const handleProductTrackingNumberChange = _value => {
    if (_value == null) {
      handleReset(CREATION_STEP.product_trackingNumber);
    } else {
      const selectedProduct = _value?.product != null ? _value.product : _value;
      const selectedTrackingNumber = _value?.product != null ? _value : null;
      setProduct(selectedProduct);
      setTrackingNumber(selectedTrackingNumber);

      dispatch(fetchProductWithId(selectedProduct?.id));
      dispatch(
        fetchProductForSupplier({
          supplierId: supplierArrival?.partner?.id,
          productId: selectedProduct?.id,
        }),
      );

      handleNextStep(CREATION_STEP.product_trackingNumber);
    }
  };

  const handleToStockLocationChange = useCallback(
    _value => {
      if (_value == null) {
        handleReset(CREATION_STEP.toStockLocation);
      } else {
        setToStockLocation(_value);
        handleNextStep(CREATION_STEP.toStockLocation);
      }
    },
    [handleNextStep, handleReset],
  );

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

  const handleReset = useCallback(
    (_step = CREATION_STEP.product_trackingNumber) => {
      setCurrentStep(_step);

      if (_step <= CREATION_STEP.toStockLocation) {
        setToStockLocation(null);
      }

      if (_step <= CREATION_STEP.product_trackingNumber) {
        setProduct(null);
        setTrackingNumber(null);
        setRealQty(0);
        setDescription('');
      }

      if (_step === CREATION_STEP.validation) {
        setRealQty(0);
        setDescription('');
      }
    },
    [],
  );

  const handleNextStep = useCallback(_current => {
    setCurrentStep(() => {
      if (_current <= CREATION_STEP.product_trackingNumber) {
        return CREATION_STEP.toStockLocation;
      }
      if (_current <= CREATION_STEP.toStockLocation) {
        return CREATION_STEP.validation;
      }
      return _current;
    });
  }, []);

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
        <SupplierArrivalLineCreationButton
          supplierArrival={supplierArrival}
          product={product}
          trackingNumber={trackingNumber}
          toStockLocation={toStockLocation}
          realQty={realQty}
          conformity={conformity}
          description={description}
          visible={_product != null}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            status={supplierArrival.statusSelect}
            date={StockMoveType.getStockMoveDate(
              supplierArrival.statusSelect,
              supplierArrival,
            )}
          />
        }
      />
      <KeyboardAvoidingScrollView>
        <View style={styles.stockView}>
          {currentStep >= CREATION_STEP.product_trackingNumber ? (
            <ProductTrackingNumberSearchBar
              defaultValue={trackingNumber || _product}
              scanKey={itemScanKey}
              onChange={handleProductTrackingNumberChange}
              isFocus={true}
              isScrollViewContainer={product != null}
            />
          ) : null}
          {currentStep >= CREATION_STEP.toStockLocation ? (
            <>
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
              />
              {stockConfig?.isManageStockLocationOnStockMoveLine ? (
                <StockLocationSearchBar
                  placeholderKey="Stock_ToStockLocation"
                  defaultValue={toStockLocation}
                  onChange={handleToStockLocationChange}
                  scanKey={stockLocationScanKey}
                  isFocus={currentStep === CREATION_STEP.toStockLocation}
                  defaultStockLocation={supplierArrival.toStockLocation}
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
                  supplierArrival?.statusSelect ===
                  StockMove?.statusSelect.Realized
                }
                isScrollViewContainer={true}
              />
              <FormHtmlInput
                defaultValue={description}
                onChange={setDescription}
              />
            </>
          ) : null}
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  stockView: {
    alignItems: 'center',
    marginTop: '2%',
    paddingBottom: 100,
  },
});

export default SupplierArrivalLineCreationScreen;
