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

import React from 'react';
import {
  Icon,
  MovementIndicationCard,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

const CustomerDeliveryDetailMovementIndicationCard = ({
  customerDelivery,
  setVisiblePopup,
}) => {
  const Colors = useThemeColor();

  return (
    <MovementIndicationCard
      titleTop={customerDelivery.fromStockLocation?.name}
      iconTop={<Icon name="warehouse" color={Colors.primaryColor.background} />}
      titleDown={
        customerDelivery.toAddress?.fullName || customerDelivery.toAddressStr
      }
      iconDown={<Icon name="map-marker-alt" />}
      disabledDown={false}
      onPressTitleDown={() => setVisiblePopup(true)}
    />
  );
};

export default CustomerDeliveryDetailMovementIndicationCard;
