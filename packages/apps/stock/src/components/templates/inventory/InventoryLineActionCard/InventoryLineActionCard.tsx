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
import InventoryLineCard from '../InventoryLineCard/InventoryLineCard';
import {StockIndicator} from '../../../../types';

interface InventoryLineActionCardProps {
  style?: any;
  productName: string;
  currentQty: number;
  realQty: number;
  unit: string;
  trackingNumber?: {trackingNumberSeq: string};
  locker?: string;
  stockLocationName?: string;
  companyId: number;
  productId: number;
  onPress: () => void;
}

const InventoryLineActionCard = ({
  style,
  productName,
  currentQty,
  realQty,
  unit,
  trackingNumber,
  locker,
  stockLocationName,
  onPress,
  companyId,
  productId,
}: InventoryLineActionCardProps) => {
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
      <InventoryLineCard
        productName={productName}
        currentQty={currentQty}
        realQty={realQty}
        unit={unit}
        locker={locker}
        trackingNumber={trackingNumber}
        stockLocationName={stockLocationName}
        onPress={onPress}
      />
    </ActionCard>
  );
};

export default InventoryLineActionCard;
