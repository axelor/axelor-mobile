/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {Alert, HeaderContainer, Screen, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  ProductSearchBar,
  StockMoveHeader,
} from '../../components';
import StockMove from '../../types/stock-move';

const productScanKey = 'product_supplier-arrival-select';

const SupplierArrivalSelectProductScreen = ({route, navigation}) => {
  const {product, supplierArrival, supplierArrivalLine} = route.params;
  const I18n = useTranslator();

  const [isVisible, setVisible] = useState(false);

  const handleProductSelection = item => {
    if (item !== null) {
      if (
        supplierArrivalLine != null &&
        item.id !== supplierArrivalLine?.product.id
      ) {
        setVisible(true);
      } else if (item.trackingNumberConfiguration != null) {
        navigation.navigate('SupplierArrivalSelectTrackingScreen', {
          supplierArrivalLine: supplierArrivalLine,
          supplierArrival: supplierArrival,
          product: item,
        });
      } else {
        navigation.navigate('SupplierArrivalLineDetailScreen', {
          supplierArrivalLineId: supplierArrivalLine?.id,
          supplierArrival: supplierArrival,
          productId: item?.id,
        });
      }
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival?.stockMoveSeq}
            lineRef={supplierArrivalLine?.name}
            status={supplierArrival?.statusSelect}
            date={
              supplierArrival
                ? StockMove.getStockMoveDate(
                    supplierArrival.statusSelect,
                    supplierArrival,
                  )
                : null
            }
          />
        }
      />
      <ProductCardInfo
        onPress={() =>
          navigation.navigate('ProductStockDetailsScreen', {product})
        }
        picture={product?.picture}
        code={product?.code}
        name={product?.name}
        trackingNumber={supplierArrivalLine?.trackingNumber?.trackingNumberSeq}
        locker={supplierArrivalLine?.locker}
      />
      <ProductSearchBar
        scanKey={productScanKey}
        onChange={handleProductSelection}
        isFocus={true}
        changeScreenAfter={true}
      />
      <Alert
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        confirmButtonConfig={{
          width: 50,
          title: null,
          onPress: () => setVisible(false),
        }}>
        <Text>{I18n.t('Stock_ErrorProduct')}</Text>
      </Alert>
    </Screen>
  );
};

export default SupplierArrivalSelectProductScreen;
