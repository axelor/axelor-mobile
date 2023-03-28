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

import React, {useEffect, useState} from 'react';
import {
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
  InventoryLineQuantityCard,
  InventoryLineButtons,
} from '../../components';
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
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );

  const [rack, setRack] = useState(null);
  const [realQty, setRealQty] = useState(
    inventoryLine?.realQty == null ? 0 : inventoryLine.realQty,
  );
  const [description, setDescription] = useState(inventoryLine?.description);

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

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <InventoryLineButtons
          description={description}
          inventory={inventory}
          inventoryLine={inventoryLine}
          navigation={navigation}
          rack={rack}
          realQty={realQty}
          trackingNumber={trackingNumber}
        />
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
        <InventoryLineQuantityCard
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
