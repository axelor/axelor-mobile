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
import {ActionCard} from '@axelor/aos-mobile-ui';
import {
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {InternalMoveLineCard} from '../../internalMove';
import {StockIndicator, StockMoveLine} from '../../../../types';

interface InternalMoveLineActionCardProps {
  style?: any;
  onPress: () => void;
  internalMoveLine: any;
}

const InternalMoveLineActionCard = ({
  style,
  onPress,
  internalMoveLine,
}: InternalMoveLineActionCardProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {internalMove} = useSelector(state => state.internalMove);

  const handleViewAvailability = () => {
    navigation.navigate('ProductStockIndicatorDetails', {
      type: StockIndicator.type.AvailableStock,
      productId: internalMoveLine.product?.id,
      companyId: internalMove.company?.id,
    });
  };

  return (
    <ActionCard
      style={style}
      translator={I18n.t}
      actionList={[
        {
          iconName: 'geo-alt-fill',
          onPress: handleViewAvailability,
          helper: I18n.t('Stock_SeeAvailability'),
        },
      ]}>
      <InternalMoveLineCard
        productName={internalMoveLine.product?.fullName}
        internalMoveStatus={internalMove.statusSelect}
        fromStockLocation={internalMoveLine.fromStockLocation?.name}
        toStockLocation={internalMoveLine.toStockLocation?.name}
        expectedQty={internalMoveLine.qty}
        movedQty={
          StockMoveLine.hideLineQty(internalMoveLine, internalMove)
            ? 0
            : internalMoveLine.realQty
        }
        locker={internalMoveLine.locker}
        trackingNumber={internalMoveLine.trackingNumber?.trackingNumberSeq}
        availability={
          internalMoveLine.availableStatusSelect != null
            ? internalMoveLine.availableStatusSelect
            : null
        }
        totalNetMass={internalMoveLine.totalNetMass}
        stockMoveLineId={internalMoveLine.id}
        onPress={onPress}
      />
    </ActionCard>
  );
};

export default InternalMoveLineActionCard;
