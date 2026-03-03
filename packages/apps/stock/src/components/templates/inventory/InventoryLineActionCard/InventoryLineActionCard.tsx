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
import InventoryLineCard from '../InventoryLineCard/InventoryLineCard';
import {StockIndicator} from '../../../../types';

interface InventoryLineActionCardProps {
  style?: any;
  onPress: () => void;
  inventoryLine: any;
}

const InventoryLineActionCard = ({
  style,
  inventoryLine,
  onPress,
}: InventoryLineActionCardProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {inventory} = useSelector(state => state.inventory);

  const handleViewAvailability = () => {
    navigation.navigate('ProductStockIndicatorDetails', {
      type: StockIndicator.type.AvailableStock,
      productId: inventoryLine.product?.id,
      companyId: inventory?.company?.id,
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
        productName={inventoryLine.product?.fullName}
        currentQty={inventoryLine.currentQty}
        realQty={inventoryLine.realQty}
        unit={inventoryLine.unit?.name}
        locker={inventoryLine.rack}
        trackingNumber={inventoryLine.trackingNumber}
        stockLocationName={inventoryLine.stockLocation?.name}
        onPress={onPress}
      />
    </ActionCard>
  );
};

export default InventoryLineActionCard;
