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

import React, {useState} from 'react';
import {
  useTranslator,
  useDispatch,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {Button, PopUpOneButton, useThemeColor} from '@axelor/aos-mobile-ui';
import StockCorrection from '../../../../types/stock-corrrection';
import {
  createCorrection,
  updateCorrection,
} from '../../../../features/stockCorrectionSlice';

const StockCorrectionButtons = ({
  saveStatus,
  reason,
  stockCorrection,
  externeNavigation = false,
  stockProduct,
  trackingNumber,
  stockLocation,
  realQty,
  status,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [popUp, setPopUp] = useState(false);

  const handleSave = () => {
    if (reason.id === null) {
      // Required field
      setPopUp(true);
      return;
    }

    // Request AOS API
    if (stockCorrection == null) {
      // Stock correction doesn't exsist yet : creation
      dispatch(
        createCorrection({
          productId: stockProduct.id,
          stockLocationId: stockLocation.id,
          reasonId: reason.id,
          trackingNumberId:
            stockProduct?.trackingNumberConfiguration == null ||
            trackingNumber == null
              ? null
              : trackingNumber.id,
          status: StockCorrection.status.Draft,
          realQty: realQty,
        }),
      );
    } else {
      // Stock correction already exists : update qty or reason
      dispatch(
        updateCorrection({
          version: stockCorrection.version,
          stockCorrectionId: stockCorrection.id,
          realQty: realQty,
          reasonId: reason.id,
        }),
      );
    }
    handleNavigation();
  };

  const handleValidate = () => {
    if (reason.id === null) {
      // Required field
      setPopUp(true);
      return;
    }

    // Request AOS API
    if (stockCorrection == null) {
      // Stock correction doesn't exsist yet : creation
      dispatch(
        createCorrection({
          productId: stockProduct.id,
          stockLocationId: stockLocation.id,
          reasonId: reason.id,
          trackingNumberId:
            stockProduct?.trackingNumberConfiguration == null ||
            trackingNumber == null
              ? null
              : trackingNumber.id,
          status: StockCorrection.status.Validated,
          realQty: realQty,
        }),
      );
    } else {
      // Stock correction already exists : update qty or reason
      dispatch(
        updateCorrection({
          version: stockCorrection.version,
          stockCorrectionId: stockCorrection.id,
          realQty: saveStatus ? null : realQty,
          reasonId: saveStatus ? null : reason.id,
          status: StockCorrection.status.Validated,
        }),
      );
    }
    handleNavigation();
  };

  const handleNavigation = () => {
    if (externeNavigation === true) {
      navigation.pop();
    } else {
      navigation.popToTop();
    }
  };

  if (reason?.id == null) {
    return null;
  }

  return (
    <>
      <PopUpOneButton
        visible={popUp}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ReasonRequired')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setPopUp(!popUp)}
      />
      {saveStatus ? null : (
        <Button
          title={I18n.t('Base_Save')}
          color={Colors.secondaryColor}
          onPress={handleSave}
        />
      )}
      {status === StockCorrection.status.Validated ? null : (
        <Button title={I18n.t('Base_Validate')} onPress={handleValidate} />
      )}
    </>
  );
};

export default StockCorrectionButtons;
