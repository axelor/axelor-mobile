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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  createInternalMove,
  updateInternalMove,
} from '../../../features/internalMoveSlice';

const InternalMoveLineDetailsFixedItems = ({
  saveStatus,
  route,
  stockProduct,
  trackingNumber,
  navigation,
  originalStockLocation,
  unit,
  destinationStockLocation,
  movedQty,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleRealize = () => {
    if (
      stockProduct.trackingNumberConfiguration == null ||
      trackingNumber == null
    ) {
      dispatch(
        createInternalMove({
          productId: stockProduct.id,
          companyId: 1,
          originStockLocationId: originalStockLocation.id,
          destStockLocationId: destinationStockLocation.id,
          unitId: unit.id,
          movedQty: movedQty,
        }),
      );
    } else {
      dispatch(
        createInternalMove({
          productId: stockProduct.id,
          companyId: 1,
          originStockLocationId: originalStockLocation.id,
          destStockLocationId: destinationStockLocation.id,
          trackingNumberId: trackingNumber.id,
          unitId: unit.id,
          movedQty: movedQty,
        }),
      );
    }
    navigation.popToTop();
  };

  const handleValidate = () => {
    if (
      stockProduct.trackingNumberConfiguration == null ||
      trackingNumber == null
    ) {
      dispatch(
        createInternalMove({
          productId: stockProduct.id,
          companyId: 1,
          originStockLocationId: originalStockLocation.id,
          destStockLocationId: destinationStockLocation.id,
          unitId: unit.id,
          movedQty: movedQty,
        }),
      );
    } else {
      dispatch(
        createInternalMove({
          productId: stockProduct.id,
          companyId: 1,
          originStockLocationId: originalStockLocation.id,
          destStockLocationId: destinationStockLocation.id,
          trackingNumberId: trackingNumber.id,
          unitId: unit.id,
          movedQty: movedQty,
        }),
      );
    }
    navigation.navigate('InternalMoveSelectProductScreen', {
      fromStockLocation: originalStockLocation,
      toStockLocation: destinationStockLocation,
    });
  };

  const handleSave = () => {
    dispatch(
      updateInternalMove({
        internalMoveId: route.params.internalMove.id,
        version: route.params.internalMove.$version,
        movedQty: movedQty,
        unitId: unit.id,
      }),
    );
    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: route.params.internalMove,
    });
  };
  if (!saveStatus && route.params.internalMove == null) {
    return (
      <View style={styles.button_container}>
        <Button
          title={I18n.t('Base_Realize')}
          color={Colors.secondaryColor}
          onPress={handleRealize}
        />
        <Button
          title={I18n.t('Base_RealizeContinue')}
          onPress={handleValidate}
        />
      </View>
    );
  } else if (!saveStatus && route.params.internalMove != null) {
    return (
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={handleSave} />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  button_container: {
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default InternalMoveLineDetailsFixedItems;
