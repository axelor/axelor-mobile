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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  HeaderContainer,
  NotesCard,
  Screen,
  ScrollView,
  useDigitFormat,
  usePriceFormat,
} from '@axelor/aos-mobile-ui';
import {
  PriceDetails,
  ProductCard,
  SaleOrderHeader,
  SaleOrderLineDropdownCards,
} from '../../components';
import {fetchSaleOrderLineById} from '../../features/saleOrderLineSlice';

const SaleOrderLineDetailsScreen = ({navigation, route}) => {
  const {saleOrderLineId} = route?.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const formatNumber = useDigitFormat();
  const formatPrice = usePriceFormat();

  const {saleOrder} = useSelector((state: any) => state.sales_saleOrder);
  const {saleOrderLine} = useSelector(
    (state: any) => state.sales_saleOrderLine,
  );

  useEffect(() => {
    dispatch((fetchSaleOrderLineById as any)({saleOrderLineId}));
  }, [dispatch, saleOrderLineId]);

  const priceList = useMemo(
    () => [
      {
        title: I18n.t('Sales_Quantity'),
        value: formatNumber(saleOrderLine.qty),
        unit: saleOrderLine.unit?.name,
      },
      {
        title: I18n.t('Sales_UnitPrice'),
        value: formatPrice(saleOrderLine.price),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sales_UnitDiscounted'),
        value: formatPrice(saleOrderLine.priceDiscounted),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sales_Tax'),
        value: formatPrice(
          saleOrderLine.inTaxPrice - saleOrderLine.priceDiscounted,
        ),
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t(saleOrder.inAti ? 'Sales_TotalATI' : 'Sales_TotalWT'),
        value: formatPrice(
          saleOrder.inAti ? saleOrderLine.inTaxTotal : saleOrderLine.exTaxTotal,
        ),
        unit: saleOrder.currency?.symbol,
        size: 20,
        showLine: true,
      },
    ],
    [I18n, formatNumber, formatPrice, saleOrder, saleOrderLine],
  );

  if (saleOrderLine?.id !== saleOrderLineId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<SaleOrderHeader saleOrder={saleOrder} />}
      />
      <ScrollView style={styles.scrollView}>
        <PriceDetails style={styles.priceDetails} lineList={priceList} />
        <ProductCard
          style={styles.productCard}
          onPress={() => {
            navigation.navigate('ProductSalesDetailsScreen', {
              productId: saleOrderLine.product.id,
            });
          }}
          picture={saleOrderLine.product.picture}
          name={saleOrderLine.product.name}
          code={saleOrderLine.product.code}
          productFamily={saleOrderLine.product.productFamily?.name}
          productCategory={saleOrderLine.product.productCategory?.name}
          description={saleOrderLine.product.description}
          isConfigurator={saleOrderLine.product.configurator?.id != null}
          displayPrice={false}
        />
        <NotesCard
          title={I18n.t('Base_Description')}
          data={saleOrderLine.description}
        />
        <SaleOrderLineDropdownCards saleOrderLine={saleOrderLine} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: null,
  },
  priceDetails: {
    marginVertical: 10,
  },
  productCard: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default SaleOrderLineDetailsScreen;
