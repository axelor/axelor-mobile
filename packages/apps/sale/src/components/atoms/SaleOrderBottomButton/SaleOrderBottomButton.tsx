/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect} from 'react';
import {
  useDispatch,
  useModules,
  useNavigation,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchCustomerDelivery} from '../../../features/customerDeliverySlice';
import {updateSaleOrderStatus} from '../../../features/saleOrderSlice';

interface SaleOrderBottomButtonProps {
  saleOrder: any;
}

const SaleOrderBottomButton = ({saleOrder}: SaleOrderBottomButtonProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {SaleOrder} = useTypes();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {checkModule} = useModules();

  const {customerDelivery} = useSelector(
    (state: any) => state.sale_customerDelivery,
  );

  const updateStatusApi = useCallback(
    (targetStatus: any) => {
      dispatch(
        (updateSaleOrderStatus as any)({
          saleOrderId: saleOrder.id,
          saleOrderVersion: saleOrder.version,
          status: targetStatus,
        }),
      );
    },
    [dispatch, saleOrder.id, saleOrder.version],
  );

  useEffect(() => {
    dispatch((fetchCustomerDelivery as any)({saleOrderId: saleOrder.id}));
  }, [dispatch, saleOrder]);

  if (saleOrder.statusSelect === SaleOrder?.statusSelect.Finalized) {
    return (
      <Button
        title={I18n.t('Base_Confirm')}
        color={Colors.primaryColor}
        onPress={() => updateStatusApi(SaleOrder?.statusSelect.Confirmed)}
      />
    );
  }

  if (
    saleOrder.statusSelect === SaleOrder?.statusSelect.Confirmed &&
    checkModule('app-stock') &&
    customerDelivery?.id != null
  ) {
    return (
      <Button
        title={I18n.t('Sale_CheckCustomerDelivery')}
        color={Colors.infoColor}
        onPress={() =>
          navigation.navigate('CustomerDeliveryDetailScreen', {
            customerDeliveryId: customerDelivery?.id,
          })
        }
      />
    );
  }

  return null;
};

export default SaleOrderBottomButton;
