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

import React, {useState} from 'react';
import {HeaderContainer, PopUpOneButton, Screen} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {InventoryHeader, ProductSearchBar} from '../../components';
import Inventory from '../../types/inventory';

const productScanKey = 'product_inventory-select';

const InventorySelectProductScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const I18n = useTranslator();

  const [isVisible, setVisible] = useState(false);

  const handleProductSelection = item => {
    if (item !== null) {
      if (inventoryLine != null) {
        if (item.id !== inventoryLine?.product.id) {
          setVisible(true);
        } else if (item.trackingNumberConfiguration != null) {
          navigation.navigate('InventorySelectTrackingScreen', {
            inventoryLine: inventoryLine,
            inventory: inventory,
            product: item,
          });
        } else {
          navigation.navigate('InventoryLineDetailsScreen', {
            inventoryLineId: inventoryLine?.id,
            inventory: inventory,
            productId: item?.id,
          });
        }
      } else {
        if (item.trackingNumberConfiguration != null) {
          navigation.navigate('InventorySelectTrackingScreen', {
            inventoryLine: null,
            inventory: inventory,
            product: item,
          });
        } else {
          navigation.navigate('InventoryLineDetailsScreen', {
            inventoryLine: null,
            inventory: inventory,
            productId: item?.id,
          });
        }
      }
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <InventoryHeader
            reference={inventory.inventorySeq}
            status={inventory.statusSelect}
            date={
              inventory.statusSelect === Inventory.status.Planned
                ? inventory.plannedStartDateT
                : inventory.plannedEndDateT
            }
            stockLocation={inventory.stockLocation?.name}
          />
        }
      />
      <ProductSearchBar
        scanKey={productScanKey}
        onChange={handleProductSelection}
        isFocus={true}
        changeScreenAfter={true}
      />
      <PopUpOneButton
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ErrorProduct')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

export default InventorySelectProductScreen;
