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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useTranslator,
  useDispatch,
  useNavigation,
  useSelector,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import StockCorrection from '../../../../types/stock-corrrection';
import {createCorrection} from '../../../../features/stockCorrectionSlice';

const StockCorrectionCreationButton = ({
  reason,
  product,
  trackingNumber,
  stockLocation,
  realQty,
  comments,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);

  const isStockCorrectionValidationEnabled = useMemo(
    () => mobileSettings?.isStockCorrectionValidationEnabled,
    [mobileSettings?.isStockCorrectionValidationEnabled],
  );

  const handleAPI = useCallback(
    status => {
      dispatch(
        createCorrection({
          productId: product.id,
          stockLocationId: stockLocation.id,
          reasonId: reason.id,
          trackingNumberId:
            product?.trackingNumberConfiguration == null ||
            trackingNumber == null
              ? null
              : trackingNumber.id,
          status: status,
          realQty: realQty,
          comments: comments,
        }),
      );

      navigation.pop();
    },
    [
      dispatch,
      navigation,
      product,
      realQty,
      reason,
      stockLocation,
      trackingNumber,
      comments,
    ],
  );

  const handleSave = useCallback(
    () => handleAPI(StockCorrection.status.Draft),
    [handleAPI],
  );

  const handleValidate = useCallback(
    () => handleAPI(StockCorrection.status.Validated),
    [handleAPI],
  );

  if (reason?.id == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        title={I18n.t('Base_Save')}
        iconName="save"
        color={Colors.infoColor}
        width={isStockCorrectionValidationEnabled ? '45%' : '90%'}
        onPress={handleSave}
      />
      {isStockCorrectionValidationEnabled && (
        <Button
          title={I18n.t('Base_Validate')}
          iconName="check"
          width="45%"
          onPress={handleValidate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default StockCorrectionCreationButton;
