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

import React from 'react';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {useNavigation, useTranslator} from '@axelor/aos-mobile-core';
import {InternalMoveLineCard} from '../../internalMove';
import {StockIndicator} from '../../../../types';

interface InternalMoveLineActionCardProps {
  style?: any;
  internalMoveStatus: number;
  productName: string;
  availability: number;
  stockMoveLineId: number;
  trackingNumber: string;
  fromStockLocation: string;
  toStockLocation: string;
  locker: string;
  expectedQty: number;
  movedQty: number;
  onPress: () => void;
  companyId: number;
  productId: number;
}

const InternalMoveLineActionCard = ({
  style,
  internalMoveStatus,
  productName,
  availability,
  stockMoveLineId,
  trackingNumber,
  fromStockLocation,
  toStockLocation,
  locker,
  expectedQty,
  movedQty,
  onPress,
  companyId,
  productId,
}: InternalMoveLineActionCardProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const handleViewAvailability = () => {
    navigation.navigate('ProductStockIndicatorDetails', {
      type: StockIndicator.type.AvailableStock,
      productId,
      companyId,
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
        productName={productName}
        internalMoveStatus={internalMoveStatus}
        fromStockLocation={fromStockLocation}
        toStockLocation={toStockLocation}
        expectedQty={expectedQty}
        movedQty={movedQty}
        locker={locker}
        trackingNumber={trackingNumber}
        availability={availability}
        stockMoveLineId={stockMoveLineId}
        onPress={onPress}
      />
    </ActionCard>
  );
};

export default InternalMoveLineActionCard;
