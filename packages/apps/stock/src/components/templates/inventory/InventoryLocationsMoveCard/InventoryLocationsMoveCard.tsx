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
import {StyleSheet} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {LocationsMoveCard} from '../../../molecules';

const InventoryLocationsMoveCard = ({}) => {
  const {inventory} = useSelector((state: any) => state.inventory);

  if (inventory?.fromRack) {
    return (
      <LocationsMoveCard
        style={styles.moveCard}
        isLockerCard={true}
        fromStockLocation={inventory?.fromRack}
        toStockLocation={inventory?.toRack}
      />
    );
  }

  return null;
};

const styles = StyleSheet.create({
  moveCard: {
    marginVertical: 10,
  },
});

export default InventoryLocationsMoveCard;
