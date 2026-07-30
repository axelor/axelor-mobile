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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  HeaderContainer,
  KeyboardAvoidingScrollView,
  QuantityCard,
  Screen,
  checkNullString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  InputBarCodeCard,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {updateSupplierTrackingNumber} from '../../features/trackingNumberSlice';
import {StockMove} from '../../types';
import {
  ProductCardInfo,
  StockMoveHeader,
  SupplierArrivalOriginInput,
} from '../../components';

const sequenceScanKey = 'tracking-sequence_supplier-arrival-add-tracking';

const SupplierArrivalAddTrackingScreen = ({navigation, route}: any) => {
  const {supplierArrival, supplierArrivalLine, product} = route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch: any = useDispatch();

  const {loading} = useSelector(state => state.trackingNumber);

  const [sequence, setSequence] = useState<string>();
  const [trackingQty, setTrackingQty] = useState<number>(0);
  const [origin, setOrigin] = useState<string>();

  const handleCreateTrackingNumber = useCallback(() => {
    dispatch(
      (updateSupplierTrackingNumber as any)({
        product,
        trackingNumberSeq: sequence,
        qty: trackingQty,
        origin,
        stockMoveLineId: supplierArrivalLine.id,
        stockMoveLineVersion: supplierArrivalLine.version,
      }),
    ).then((res: any) => {
      navigation.popTo('SupplierArrivalLineDetailScreen', {
        supplierArrivalLineId: supplierArrivalLine?.id,
        supplierArrival,
        productId: product?.id,
        trackingNumber: res?.payload,
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
      fixedItems={
        trackingQty > 0 &&
        !checkNullString(sequence) && (
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
            date={StockMove.getStockMoveDate(
              supplierArrival.statusSelect,
              supplierArrival,
            )}
          />
        }
      />
      <KeyboardAvoidingScrollView keyboardOffset={{ios: 70, android: 100}}>
        <ProductCardInfo product={product} />
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          <InputBarCodeCard
            title={I18n.t('Stock_TrackingSequence')}
            scanKeySearch={sequenceScanKey}
            onChange={setSequence}
          />
          <SupplierArrivalOriginInput setOrigin={setOrigin} />
          <QuantityCard
            labelQty={I18n.t('Stock_TrackingQty')}
            defaultValue={trackingQty}
            onValueChange={setTrackingQty}
            editable
            isBigButton
            isFormWrapper
            translator={I18n.t}
          />
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    width: '92%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingBottom: 10,
    marginTop: 4,
    marginBottom: 125,
  },
});

export default SupplierArrivalAddTrackingScreen;
