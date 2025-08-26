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

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {usePermitted, useTranslator} from '@axelor/aos-mobile-core';
import {
  Label,
  Screen,
  ScrollView,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';
import {
  CustomerSearchBar,
  ProductSearchBar,
  SaleQuotationCreationButtons,
  SaleQuotationCreationQuantityCard,
} from '../../components';

const productScanKey = 'product_sale_quotation-creation';

const SaleQuotationCreationScreen = ({route}) => {
  const {clientPartner} = route?.params ?? {};
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.sale.db.SaleOrder',
  });

  const [customer, setCustomer] = useState(clientPartner);
  const [lines, setLines] = useState([]);
  const [product, setProduct] = useState(null);
  const [productQty, setProductQty] = useState(0);
  const [isEditionMode, setIsEditionMode] = useState(false);

  const handleAddLine = () => {
    setLines(prevLines => {
      const newLines = [...prevLines];
      const indexLine = newLines.findIndex(line => line.id === product?.id);

      if (indexLine >= 0) {
        if (isEditionMode) {
          newLines[indexLine].qty = productQty;
          setIsEditionMode(false);
        } else {
          newLines[indexLine].qty += productQty;
        }
      } else {
        newLines.push({
          id: product?.id,
          product: product,
          qty: productQty,
          unit: product?.unit,
        });
      }

      return newLines;
    });

    setProduct(null);
    setProductQty(0);
  };

  const handleEditLine = (line: any) => {
    setIsEditionMode(true);
    setProduct(line.product);
    setProductQty(line.qty);
  };

  if (!canCreate) {
    return (
      <Label
        type="danger"
        style={styles.label}
        message={I18n.t('Base_NoPermForCreate')}
      />
    );
  }

  return (
    <Screen
      fixedItems={
        <SaleQuotationCreationButtons
          isProduct={product != null}
          productQty={productQty}
          isEditionMode={isEditionMode}
          addProduct={handleAddLine}
          lines={lines}
          customerId={customer?.id}
        />
      }>
      <ScrollView style={styles.container}>
        <CustomerSearchBar defaultValue={customer} onChange={setCustomer} />
        {customer && (
          <>
            <ViewAllEditList
              title={I18n.t('Sale_Products')}
              lines={lines.map(line => ({
                ...line,
                name: line.product?.name,
                unitName: line.unit?.name,
              }))}
              currentLineId={isEditionMode ? product?.id : null}
              setLines={setLines}
              handleEditLine={handleEditLine}
              translator={I18n.t}
            />
            {product ? (
              <SaleQuotationCreationQuantityCard
                productQty={productQty}
                setProductQty={setProductQty}
                cancelProduct={() => {
                  setProduct(null);
                  setProductQty(0);
                }}
                productName={product?.name}
              />
            ) : (
              <ProductSearchBar
                scanKey={productScanKey}
                onChange={setProduct}
                isScrollViewContainer
              />
            )}
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: null,
    flex: 1,
  },
  label: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default SaleQuotationCreationScreen;
