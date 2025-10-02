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

import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Card,
  HeaderContainer,
  QuantityCard,
  Screen,
  ScrollView,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  InputBarCodeCard,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {StockMoveHeader, SupplierArrivalOriginInput} from '../../components';
import {updateSupplierTrackingNumber} from '../../features/trackingNumberSlice';
import StockMove from '../../types/stock-move';

const SupplierArrivalAddTrackingScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const supplierArrivalLine = route.params.supplierArrivalLine;
  const product = route.params.product;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [sequence, setSequence] = useState(null);
  const [trackingQty, setTrackingQty] = useState(0);
  const [origin, setOrigin] = useState(null);

  const {loading} = useSelector(state => state.trackingNumber);

  const handleCreateTrackingNumber = useCallback(() => {
    dispatch(
      updateSupplierTrackingNumber({
        product: product,
        trackingNumberSeq: sequence,
        qty: trackingQty,
        origin,
        stockMoveLineId: supplierArrivalLine.id,
        stockMoveLineVersion: supplierArrivalLine.version,
      }),
    ).then(res => {
      const _trackingNumber = res?.payload;
      navigation.popTo('SupplierArrivalLineDetailScreen', {
        supplierArrivalLineId: supplierArrivalLine?.id,
        supplierArrival: supplierArrival,
        productId: product?.id,
        trackingNumber: _trackingNumber,
      });
    });
  }, [
    dispatch,
    navigation,
    origin,
    product,
    sequence,
    supplierArrival,
    supplierArrivalLine,
    trackingQty,
  ]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        trackingQty > 0 &&
        sequence != null &&
        sequence !== '' && (
          <Button
            title={I18n.t('Base_Create')}
            onPress={handleCreateTrackingNumber}
          />
        )
      }
      loading={loading}>
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
      <ScrollView>
        <Card style={styles.cardProductInfo}>
          <Text>{product?.name}</Text>
        </Card>
        <InputBarCodeCard
          title={I18n.t('Stock_TrackingSequence')}
          onChange={setSequence}
        />
        <SupplierArrivalOriginInput setOrigin={setOrigin} />
        <QuantityCard
          style={styles.qtyCard}
          labelQty={I18n.t('Stock_TrackingQty')}
          defaultValue={trackingQty}
          onValueChange={setTrackingQty}
          editable={true}
          isBigButton={true}
          translator={I18n.t}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
  qtyCard: {
    marginTop: 10,
  },
});

export default SupplierArrivalAddTrackingScreen;
