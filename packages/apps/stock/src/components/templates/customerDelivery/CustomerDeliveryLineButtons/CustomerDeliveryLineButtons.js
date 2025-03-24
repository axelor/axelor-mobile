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

import React, {useCallback} from 'react';
import {
  useTranslator,
  useDispatch,
  useNavigation,
  useTypes,
  useStackChecker,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {updateCustomerDeliveryLine} from '../../../../features/customerDeliveryLineSlice';

const CustomerDeliveryLineButtons = ({
  customerDeliveryLine,
  customerDelivery,
  realQty,
  fromStockLocation,
  visible = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {StockMove} = useTypes();
  const isScreenMounted = useStackChecker();

  const navigateBackToDetails = useCallback(() => {
    navigation.navigate('CustomerDeliveryDetailScreen', {
      customerDeliveryId: customerDelivery.id,
    });
  }, [customerDelivery, navigation]);

  const handleValidate = useCallback(() => {
    dispatch(
      updateCustomerDeliveryLine({
        stockMoveLineId: customerDeliveryLine.id,
        version: customerDeliveryLine.version,
        realQty: realQty,
        fromStockLocationId: fromStockLocation?.id,
      }),
    );

    if (isScreenMounted('CustomerDeliveryLineListScreen')) {
      navigation.pop();
    } else {
      navigateBackToDetails();
    }
  }, [
    customerDeliveryLine.id,
    customerDeliveryLine.version,
    dispatch,
    fromStockLocation?.id,
    isScreenMounted,
    navigateBackToDetails,
    navigation,
    realQty,
  ]);

  if (!visible) {
    return null;
  }

  if (customerDelivery.statusSelect !== StockMove?.statusSelect.Realized) {
    return <Button title={I18n.t('Base_Validate')} onPress={handleValidate} />;
  }

  return null;
};

export default CustomerDeliveryLineButtons;
