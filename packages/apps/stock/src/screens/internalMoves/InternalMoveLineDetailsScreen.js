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

import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  StockMoveHeader,
  InternalMoveLineButtons,
  InternalMoveLineNotes,
  InternalMoveLineQuantityCard,
  InternalMoveLinePicker,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {fetchProductIndicators} from '../../features/productIndicatorsSlice';
import StockMove from '../../types/stock-move';

const InternalMoveLineDetailsScreen = ({navigation, route}) => {
  const internalMove = route.params.internalMove;
  const internalMoveLine = route.params.internalMoveLine;
  const dispatch = useDispatch();

  const {activeCompany} = useSelector(state => state.user.user);
  const {productIndicators} = useSelector(state => state.productIndicators);
  const {loadingProductFromId, productFromId: product} = useSelector(
    state => state.product,
  );

  const [saveStatus, setSaveStatus] = useState(true);
  const [movedQty, setMovedQty] = useState(
    internalMoveLine.isRealQtyModifiedByUser === false
      ? 0
      : internalMoveLine.realQty,
  );
  const [unit, setUnit] = useState(internalMoveLine.unit);
  const [notes, setNotes] = useState(internalMove.note);

  const plannedQty = useMemo(() => {
    if (internalMove.statusSelect === StockMove.status.Realized) {
      return internalMoveLine.realQty;
    } else {
      return productIndicators?.availableStock;
    }
  }, [
    internalMove.statusSelect,
    internalMoveLine.realQty,
    productIndicators?.availableStock,
  ]);

  useEffect(() => {
    dispatch(fetchProductWithId(internalMoveLine.product.id));
  }, [dispatch, internalMove, internalMoveLine]);

  useEffect(() => {
    dispatch(
      fetchProductIndicators({
        version: internalMoveLine.product.$version,
        productId: internalMoveLine.product.id,
        companyId: activeCompany?.id,
        stockLocationId: internalMove.fromStockLocation.id,
      }),
    );
  }, [activeCompany?.id, dispatch, internalMove, internalMoveLine]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <InternalMoveLineButtons
          internalMove={internalMove}
          internalMoveLine={internalMoveLine}
          saveStatus={saveStatus}
          movedQty={movedQty}
          unit={unit}
        />
      }
      loading={loadingProductFromId}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={160}>
        <HeaderContainer
          expandableFilter={false}
          fixedItems={
            <StockMoveHeader
              reference={internalMove.stockMoveSeq}
              status={internalMove.statusSelect}
              date={
                internalMove.statusSelect === StockMove.status.Draft
                  ? internalMove.createdOn
                  : internalMove.statusSelect === StockMove.status.Planned
                  ? internalMove.estimatedDate
                  : internalMove.realDate
              }
              availability={internalMove.availableStatusSelect}
            />
          }
        />
        <ScrollView>
          <ProductCardInfo
            name={product?.name}
            code={product?.code}
            picture={product?.picture}
            trackingNumber={
              product?.trackingNumberConfiguration == null
                ? null
                : internalMoveLine.trackingNumber?.trackingNumberSeq
            }
            onPress={handleShowProduct}
          />
          <InternalMoveLineQuantityCard
            movedQty={movedQty}
            originalStockLocation={internalMove.fromStockLocation}
            plannedQty={plannedQty}
            setMovedQty={setMovedQty}
            setSaveStatus={setSaveStatus}
            status={internalMove.statusSelect}
            stockProduct={product}
            trackingNumber={internalMoveLine.trackingNumber}
          />
          <InternalMoveLinePicker
            setSaveStatus={setSaveStatus}
            setUnit={setUnit}
            status={internalMove.statusSelect}
            unit={unit}
          />
          <InternalMoveLineNotes
            notes={notes}
            setNotes={setNotes}
            setSaveStatus={setSaveStatus}
            status={internalMove.statusSelect}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
});

export default InternalMoveLineDetailsScreen;
