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

import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  EditableInput,
  HeaderContainer,
  Screen,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  DescriptionCard,
  InventoryHeader,
  ProductCardInfo,
  InventoryLineDetailsQuantityCard,
} from '../../components';
import {
  createNewInventoryLine,
  updateInventoryLine,
} from '../../features/inventoryLineSlice';
import {fetchProductWithId} from '../../features/productSlice';
import Inventory from '../../types/inventory';

const InventoryLineDetailsScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const product = route.params.product;
  const trackingNumber =
    inventoryLine != null
      ? inventoryLine.trackingNumber
      : route.params.trackingNumber;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const [rack, setRack] = useState(null);
  const [realQty, setRealQty] = useState(
    inventoryLine?.realQty == null ? 0 : inventoryLine.realQty,
  );
  const [description, setDescription] = useState(inventoryLine?.description);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductWithId(
        product != null ? product.id : inventoryLine?.product?.id,
      ),
    );
  }, [dispatch, inventoryLine, product]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: productFromId,
    });
  };

  const handleNewLine = useCallback(() => {
    dispatch(
      createNewInventoryLine({
        inventoryId: inventory.id,
        inventoryVersion: inventory.version,
        productId: productFromId?.id,
        trackingNumberId: trackingNumber?.id,
        rack: rack == null || rack === '' ? null : rack,
        realQty: realQty,
      }),
    );
    navigation.navigate('InventoryLineListScreen', {
      inventory: inventory,
    });
  }, [
    dispatch,
    inventory,
    navigation,
    productFromId,
    rack,
    realQty,
    trackingNumber,
  ]);

  const handleUpdateLine = useCallback(() => {
    dispatch(
      updateInventoryLine({
        inventoryLineId: inventoryLine.id,
        version: inventoryLine.version,
        realQty: realQty,
        description: description,
      }),
    );
    navigation.navigate('InventoryLineListScreen', {
      inventory: inventory,
    });
  }, [description, dispatch, inventory, inventoryLine, navigation, realQty]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        inventoryLine == null ? (
          <Button title={I18n.t('Base_Add')} onPress={handleNewLine} />
        ) : inventory?.statusSelect !== Inventory.status.Validated ? (
          <Button
            title={
              inventory.statusSelect <= Inventory.status.InProgress
                ? I18n.t('Base_Save')
                : I18n.t('Base_Check')
            }
            onPress={handleUpdateLine}
          />
        ) : null
      }
      loading={loadingProductFromId}>
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
      <ScrollView>
        <ProductCardInfo
          onPress={handleShowProduct}
          picture={productFromId?.picture}
          code={productFromId?.code}
          name={productFromId?.name}
          trackingNumber={trackingNumber?.trackingNumberSeq}
          locker={inventoryLine?.rack}
        />
        <InventoryLineDetailsQuantityCard
          inventoryLine={inventoryLine}
          realQty={realQty}
          setRealQty={setRealQty}
        />
        <DescriptionCard
          onChange={input => setDescription(input)}
          description={description}
          isEditable={
            inventory.statusSelect !== Inventory.status.Completed &&
            inventory.statusSelect !== Inventory.status.Validated
          }
        />
        {inventoryLine == null && (
          <EditableInput
            placeholder={I18n.t('Stock_Locker')}
            onValidate={input => setRack(input)}
            defaultValue={rack}
          />
        )}
      </ScrollView>
    </Screen>
  );
};

export default InventoryLineDetailsScreen;
