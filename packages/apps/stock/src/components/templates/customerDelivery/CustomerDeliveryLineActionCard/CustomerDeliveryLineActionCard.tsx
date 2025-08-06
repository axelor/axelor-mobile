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

import React, {useCallback, useMemo} from 'react';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {StockIndicator, StockMoveLine} from '../../../../types';
import {splitCustomerDeliveryLine} from '../../../../features/customerDeliveryLineSlice';
import CustomerDeliveryLineCard from '../CustomerDeliveryLineCard/CustomerDeliveryLineCard';

interface CustomerDeliveryLineActionCardProps {
  style?: any;
  styleCard?: any;
  customerDeliveryLine: any;
  handleShowLine: (customerDeliveryLine: any) => void;
}

const CustomerDeliveryLineActionCard = ({
  style,
  styleCard,
  customerDeliveryLine,
  handleShowLine,
}: CustomerDeliveryLineActionCardProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const navigation = useNavigation();

  const {customerDelivery} = useSelector(state => state.customerDelivery);

  const splitCustomerDeliveryLineAPI = useCallback(() => {
    dispatch(
      (splitCustomerDeliveryLine as any)({
        id: customerDeliveryLine.id,
        version: customerDeliveryLine.version,
        customerDeliveryId: customerDelivery?.id,
      }),
    );
  }, [
    dispatch,
    customerDeliveryLine.id,
    customerDeliveryLine.version,
    customerDelivery?.id,
  ]);

  const pickedQty = useMemo(
    () =>
      StockMoveLine.hideLineQty(customerDeliveryLine, customerDelivery)
        ? 0
        : Number(customerDeliveryLine.realQty),
    [customerDelivery, customerDeliveryLine],
  );

  const availability = useMemo(
    () =>
      customerDelivery.statusSelect !== StockMove?.statusSelect.Realized
        ? customerDeliveryLine.availableStatusSelect
        : null,
    [
      StockMove?.statusSelect.Realized,
      customerDelivery.statusSelect,
      customerDeliveryLine.availableStatusSelect,
    ],
  );

  const handleViewAvailability = () => {
    navigation.navigate('ProductStockIndicatorDetails', {
      type: StockIndicator.type.AvailableStock,
      productId: customerDeliveryLine.product?.id,
      companyId: customerDelivery.company?.id,
    });
  };

  return (
    <ActionCard
      style={style}
      translator={I18n.t}
      actionList={[
        {
          iconName: 'diagram-2-fill',
          helper: I18n.t('Stock_Split'),
          onPress: splitCustomerDeliveryLineAPI,
          hidden:
            customerDelivery.statusSelect > StockMove?.statusSelect.Planned ||
            pickedQty >= customerDeliveryLine.qty ||
            pickedQty === 0,
        },
        {
          iconName: 'geo-alt-fill',
          onPress: handleViewAvailability,
          helper: I18n.t('Stock_SeeAvailability'),
        },
      ]}>
      <CustomerDeliveryLineCard
        style={styleCard}
        productName={customerDeliveryLine.product?.fullName}
        stockLocationName={customerDeliveryLine.fromStockLocation?.name}
        askedQty={customerDeliveryLine.qty}
        pickedQty={pickedQty}
        locker={customerDeliveryLine.locker}
        availability={availability}
        stockMoveLineId={customerDeliveryLine.id}
        trackingNumber={customerDeliveryLine.trackingNumber}
        totalNetMass={customerDeliveryLine.totalNetMass}
        saleOrderLine={customerDeliveryLine.saleOrderLine}
        onPress={() => handleShowLine(customerDeliveryLine)}
      />
    </ActionCard>
  );
};

export default CustomerDeliveryLineActionCard;
