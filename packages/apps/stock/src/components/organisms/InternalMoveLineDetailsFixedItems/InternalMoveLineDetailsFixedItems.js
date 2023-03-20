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

  return (
    <>
      {!saveStatus && route.params.internalMove == null && (
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
      )}
      {!saveStatus && route.params.internalMove != null && (
        <View style={styles.button_container}>
          <Button title={I18n.t('Base_Save')} onPress={handleSave} />
        </View>
      )}
    </>
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

export default InternalMoveLineDetailsFixedItems;
