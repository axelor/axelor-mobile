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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  usePermitted,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  createCorrection,
  updateCorrection,
} from '../../../../features/stockCorrectionSlice';

const StockCorrectionButtons = ({
  saveStatus = false,
  reason,
  stockCorrection,
  product,
  stockLocation,
  trackingNumber,
  realQty,
  status,
  comments,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {StockCorrection} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockCorrection',
  });

  const {mobileSettings} = useSelector(state => state.appConfig);

  const isValidateButtonVisible = useMemo(
    () =>
      mobileSettings?.isStockCorrectionValidationEnabled &&
      status !== StockCorrection?.statusSelect.Validated,
    [
      mobileSettings?.isStockCorrectionValidationEnabled,
      status,
      StockCorrection?.statusSelect.Validated,
    ],
  );

  const handleAPI = useCallback(
    (_status = StockCorrection?.statusSelect.Draft) => {
      dispatch(
        stockCorrection
          ? updateCorrection({
              version: stockCorrection.version,
              stockCorrectionId: stockCorrection.id,
              realQty: saveStatus ? null : realQty,
              reasonId: saveStatus ? null : reason?.id,
              status: _status,
              comments: comments,
            })
          : createCorrection({
              productId: product.id,
              stockLocationId: stockLocation.id,
              reasonId: reason.id,
              trackingNumberId:
                product?.trackingNumberConfiguration == null ||
                trackingNumber == null
                  ? null
                  : trackingNumber.id,
              status: _status,
              realQty: realQty,
              comments: comments,
            }),
      );

      navigation.pop();
    },
    [
      StockCorrection?.statusSelect.Draft,
      comments,
      dispatch,
      navigation,
      product,
      realQty,
      reason,
      saveStatus,
      stockCorrection,
      stockLocation,
      trackingNumber,
    ],
  );

  const handleSave = useCallback(
    () => handleAPI(StockCorrection?.statusSelect.Draft),
    [StockCorrection?.statusSelect.Draft, handleAPI],
  );

  const handleValidate = useCallback(
    () => handleAPI(StockCorrection?.statusSelect.Validated),
    [StockCorrection?.statusSelect.Validated, handleAPI],
  );

  if (reason?.id == null || readonly) {
    return null;
  }

  return (
    <View style={styles.container}>
      {!saveStatus && (
        <Button
          title={I18n.t('Base_Save')}
          iconName="floppy"
          color={Colors.infoColor}
          width={isValidateButtonVisible ? '45%' : '90%'}
          onPress={handleSave}
        />
      )}
      {isValidateButtonVisible && (
        <Button
          title={I18n.t('Base_Validate')}
          iconName="check-lg"
          width={saveStatus ? '90%' : '45%'}
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

export default StockCorrectionButtons;
