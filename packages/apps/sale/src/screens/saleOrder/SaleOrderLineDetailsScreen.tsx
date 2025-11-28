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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useContextRegister,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  HeaderContainer,
  NotesCard,
  Screen,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {
  ProductCard,
  SaleOrderHeader,
  SaleOrderLineDropdownCards,
  SaleOrderLinePriceDetails,
} from '../../components';
import {fetchSaleOrderLineById} from '../../features/saleOrderLineSlice';

const SaleOrderLineDetailsScreen = ({navigation, route}) => {
  const {saleOrderLineId} = route?.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {saleOrder} = useSelector((state: any) => state.sale_saleOrder);
  const {loadingSaleOrderLine, saleOrderLine} = useSelector(
    (state: any) => state.sale_saleOrderLine,
  );

  useContextRegister({
    models: [
      {
        model: 'com.axelor.apps.sale.db.SaleOrder',
        id: saleOrder?.id,
      },
      {
        model: 'com.axelor.apps.sale.db.SaleOrderLine',
        id: saleOrderLine?.id,
      },
      {
        model: 'com.axelor.apps.base.db.Product',
        id: saleOrderLine?.product?.id,
      },
    ],
  });

  const fetchSaleOrderLine = useCallback(() => {
    dispatch((fetchSaleOrderLineById as any)({saleOrderLineId}));
  }, [dispatch, saleOrderLineId]);

  useEffect(() => {
    fetchSaleOrderLine();
  }, [fetchSaleOrderLine]);

  const _product = useMemo(
    () => saleOrderLine?.product ?? {name: saleOrderLine?.productName},
    [saleOrderLine?.product, saleOrderLine?.productName],
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
      <ScrollView
        refresh={{loading: loadingSaleOrderLine, fetcher: fetchSaleOrderLine}}>
        <SaleOrderLinePriceDetails
          style={styles.priceDetails}
          saleOrder={saleOrder}
          saleOrderLine={saleOrderLine}
        />
        <ProductCard
          style={styles.productCard}
          onPress={
            _product?.id != null
              ? () =>
                  navigation.navigate('ProductSaleDetailsScreen', {
                    productId: _product?.id,
                  })
              : undefined
          }
          picture={_product?.picture}
          name={_product?.name}
          code={_product?.code}
          productFamily={_product?.productFamily?.name}
          productCategory={_product?.productCategory?.name}
          description={_product?.description}
          isConfigurator={_product?.configurator?.id != null}
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
  priceDetails: {
    marginVertical: 10,
  },
  productCard: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default SaleOrderLineDetailsScreen;
