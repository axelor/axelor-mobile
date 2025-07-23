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
import {StyleSheet, View} from 'react-native';
import {Badge} from '@axelor/aos-mobile-ui';
import {useSaleOrderLineAvailability} from '../../../hooks';

interface SaleOrderLineAvailabilityBadgesProps {
  style?: any;
  saleOrderLine: any;
}

const SaleOrderLineAvailabilityBadges = ({
  style,
  saleOrderLine,
}: SaleOrderLineAvailabilityBadgesProps) => {
  const {
    availabilityTitle,
    availabilityColor,
    isAvailabilityHidden,
    missingQty,
  } = useSaleOrderLineAvailability(saleOrderLine);

  if (isAvailabilityHidden) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Badge
        title={availabilityTitle}
        color={availabilityColor}
        style={styles.badge}
      />
      {missingQty != null && (
        <Badge
          title={missingQty}
          color={availabilityColor}
          style={styles.badge}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badge: {
    width: undefined,
    paddingHorizontal: 5,
  },
});

export default SaleOrderLineAvailabilityBadges;
