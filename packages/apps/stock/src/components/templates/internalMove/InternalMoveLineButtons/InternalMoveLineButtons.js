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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {createInternalMove} from '../../../../features/internalMoveSlice';
import {updateInternalMoveLine} from '../../../../features/internalMoveLineSlice';

const InternalMoveLineButtons = ({
  saveStatus,
  internalMove,
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

  const createInternalMoveAPI = useCallback(() => {
    dispatch(
      createInternalMove({
        productId: stockProduct.id,
        companyId: 1,
        originStockLocationId: originalStockLocation.id,
        destStockLocationId: destinationStockLocation.id,
        unitId: unit.id,
        trackingNumberId:
          stockProduct.trackingNumberConfiguration == null ||
          trackingNumber == null
            ? null
            : trackingNumber.id,
        movedQty: movedQty,
      }),
    );
  }, [
    destinationStockLocation,
    dispatch,
    movedQty,
    originalStockLocation,
    stockProduct,
    trackingNumber,
    unit,
  ]);

  const handleRealize = () => {
    createInternalMoveAPI();
    navigation.popToTop();
  };

  const handleValidate = () => {
    createInternalMoveAPI();
    navigation.navigate('InternalMoveSelectProductScreen', {
      fromStockLocation: originalStockLocation,
      toStockLocation: destinationStockLocation,
    });
  };

  const handleSave = () => {
    dispatch(
      updateInternalMoveLine({
        stockMoveLineId: internalMove.id,
        version: internalMove.$version,
        realQty: movedQty,
        unitId: unit.id,
      }),
    );

    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: internalMove,
    });
  };

  if (saveStatus) {
    return null;
  }

  if (internalMove == null) {
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
  }

  return (
    <View style={styles.button_container}>
      <Button title={I18n.t('Base_Save')} onPress={handleSave} />
    </View>
  );
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

export default InternalMoveLineButtons;
