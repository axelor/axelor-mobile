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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Card,
  HeaderContainer,
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
import {QuantityCard, StockMoveHeader} from '../../components';
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

  const {loading, createdTrackingNumber} = useSelector(
    state => state.trackingNumber,
  );

  const handleCreateTrackingNumber = useCallback(() => {
    dispatch(
      updateSupplierTrackingNumber({
        product: product,
        trackingNumberSeq: sequence,
        qty: trackingQty,
        stockMoveLineId: supplierArrivalLine.id,
        stockMoveLineVersion: supplierArrivalLine.version,
      }),
    );
  }, [dispatch, product, sequence, supplierArrivalLine, trackingQty]);

  useEffect(() => {
    if (!loading && createdTrackingNumber != null) {
      navigation.navigate('SupplierArrivalLineDetailScreen', {
        supplierArrivalLineId: supplierArrivalLine?.id,
        supplierArrival: supplierArrival,
        productId: product?.id,
        trackingNumber: createdTrackingNumber,
      });
    }
  }, [
    createdTrackingNumber,
    loading,
    navigation,
    product,
    supplierArrival,
    supplierArrivalLine,
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
          style={styles.input}
          title={I18n.t('Stock_TrackingSequence')}
          onChange={setSequence}
        />
        <QuantityCard
          labelQty={I18n.t('Stock_TrackingQty')}
          defaultValue={trackingQty}
          onValueChange={setTrackingQty}
          editable={true}
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
  input: {
    zIndex: 50,
  },
});

export default SupplierArrivalAddTrackingScreen;
