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
import {StyleSheet, View} from 'react-native';
import {useTranslator, useSelector, useTypes} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {InventoryHeader} from '../../inventory';

const InventoryDetailsHeader = ({}) => {
  const I18n = useTranslator();
  const {Inventory} = useTypes();

  const {inventory} = useSelector((state: any) => state.inventory);

  return (
    <View>
      <InventoryHeader
        reference={inventory?.inventorySeq}
        status={inventory?.statusSelect}
        date={
          inventory?.statusSelect === Inventory?.statusSelect.Planned
            ? inventory?.plannedStartDateT
            : inventory?.plannedEndDateT
        }
        stockLocation={inventory?.stockLocation?.name}
      />
      <View style={styles.marginHorizontal}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  marginHorizontal: {
    marginHorizontal: 24,
  },
});

export default InventoryDetailsHeader;
