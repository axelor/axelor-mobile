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
import {Alert, HeaderContainer, Screen, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  StockMoveHeader,
  SupplierArrivalTrackingNumberSelect,
  SupplierArrivalProductName,
} from '../../components';
import StockMove from '../../types/stock-move';

const SupplierArrivalSelectTrackingScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const supplierArrival = route.params.supplierArrival;
  const supplierArrivalLine = route.params.supplierArrivalLine;
  const product = route.params.product;
  const [isVisible, setVisible] = useState(false);

  const handleTrackingNumberSelection = item => {
    if (item !== null) {
      if (
        supplierArrivalLine != null &&
        item.id !== supplierArrivalLine.trackingNumber?.id
      ) {
        setVisible(true);
      } else {
        navigation.navigate('SupplierArrivalLineDetailScreen', {
          supplierArrivalLineId: supplierArrivalLine?.id,
          supplierArrival: supplierArrival,
          productId: product?.id,
          trackingNumber: item,
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
            reference={supplierArrival.stockMoveSeq}
            lineRef={supplierArrivalLine?.name}
            status={supplierArrival.statusSelect}
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
      <SupplierArrivalProductName product={product} />
      <SupplierArrivalTrackingNumberSelect
        product={product}
        supplierArrival={supplierArrival}
        handleTrackingNumberSelection={handleTrackingNumberSelection}
        supplierArrivalLine={supplierArrivalLine}
      />
      <Alert
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        confirmButtonConfig={{
          width: 50,
          title: null,
          onPress: () => setVisible(false),
        }}>
        <Text>{I18n.t('Stock_ErrorTrackingNumber')}</Text>
      </Alert>
    </Screen>
  );
};

export default SupplierArrivalSelectTrackingScreen;
