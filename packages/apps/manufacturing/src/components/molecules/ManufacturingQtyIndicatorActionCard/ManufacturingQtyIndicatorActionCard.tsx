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

import React from 'react';
import {useNavigation, useTranslator} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {ManufacturingQtyIndicatorCard} from '../../atoms';

interface ManufacturingQtyIndicatorActionCardProps {
  style?: any;
  producedManufOrder?: any;
  consumedManufOrder?: any;
  consumedOperationOrder?: any;
  stockMove: any;
  realQty: number;
  unit: any;
  trackingNumber: any;
}

const ManufacturingQtyIndicatorActionCard = ({
  producedManufOrder,
  consumedManufOrder,
  consumedOperationOrder,
  stockMove,
  realQty,
  unit,
  trackingNumber,
}: ManufacturingQtyIndicatorActionCardProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const handleManufacturingNavigation = () => {
    if (consumedOperationOrder?.id) {
      navigation.navigate('OperationOrderDetailsScreen', {
        operationOrderId: consumedOperationOrder?.id,
      });
    } else {
      navigation.navigate('ManufacturingOrderDetailsScreen', {
        manufacturingOrderId: producedManufOrder?.id ?? consumedManufOrder?.id,
      });
    }
  };

  return (
    <ActionCard
      translator={I18n.t}
      actionList={[
        {
          iconName: 'gear-fill',
          helper: I18n.t(
            consumedOperationOrder?.id == null
              ? 'Manufacturing_NavigateToMO'
              : 'Manufacturing_NavigateToOO',
          ),
          onPress: handleManufacturingNavigation,
        },
        {
          iconName: 'boxes',
          helper: I18n.t('Manufacturing_NavigateToIM'),
          onPress: () =>
            navigation.navigate('InternalMoveDetailsGeneralScreen', {
              internalMoveId: stockMove?.id,
            }),
        },
      ]}>
      <ManufacturingQtyIndicatorCard
        refMO={
          producedManufOrder?.manufOrderSeq ?? consumedManufOrder?.manufOrderSeq
        }
        refIM={stockMove?.stockMoveSeq}
        date={stockMove?.realDate}
        realQty={realQty}
        unitName={unit?.name}
        trackingNumber={trackingNumber?.trackingNumberSeq}
        statusSelect={stockMove?.statusSelect}
      />
    </ActionCard>
  );
};

export default ManufacturingQtyIndicatorActionCard;
