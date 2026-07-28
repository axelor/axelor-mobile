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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {Inventory} from '../../../../types';
import {InventoryHeader} from '../../inventory';

const InventoryDetailsHeader = ({}) => {
  const I18n = useTranslator();

  const {inventory} = useSelector(state => state.inventory);

  const movementIndicatorData = useMemo(
    () =>
      inventory?.fromRack == null
        ? undefined
        : {
            titleTop: inventory.fromRack,
            labelTop: 'Stock_FromLocker',
            iconTop: 'geo-alt-fill',
            titleDown: inventory.toRack,
            labelDown: 'Stock_ToLocker',
            iconDown: 'geo-alt-fill',
          },
    [inventory?.fromRack, inventory?.toRack],
  );

  return (
    <InventoryHeader
      reference={inventory?.inventorySeq}
      status={inventory?.statusSelect}
      date={Inventory.getDate(inventory)}
      stockLocation={inventory?.stockLocation?.name}
      showMovementIndicator={movementIndicatorData != null}
      movementIndicatorData={movementIndicatorData}>
      <View style={styles.productInfos}>
        {inventory?.productFamily != null && (
          <Text>{`${I18n.t('Stock_ProductFamily')} : ${
            inventory?.productFamily?.name
          }`}</Text>
        )}
        {inventory?.productCategory != null && (
          <Text>{`${I18n.t('Stock_ProductCategory')} : ${
            inventory?.productCategory?.name
          }`}</Text>
        )}
      </View>
    </InventoryHeader>
  );
};

const styles = StyleSheet.create({
  productInfos: {
    marginHorizontal: 24,
  },
});

export default InventoryDetailsHeader;
