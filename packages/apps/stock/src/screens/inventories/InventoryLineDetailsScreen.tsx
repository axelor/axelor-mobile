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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  EditableInput,
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {fetchInventoryLine} from '../../features/inventoryLineSlice';
import {Inventory as InventoryType} from '../../types';
import {useProductByCompany} from '../../hooks';
import {
  DescriptionCard,
  InventoryHeader,
  ProductCardInfo,
  InventoryLineQuantityCard,
  InventoryLineButtons,
  InventoryLineTrackingNumberSelect,
  StockLocationSearchBar,
} from '../../components';

const stockLocationScanKey = 'stock-location_inventory-line-details';

const InventoryLineDetailsScreen = ({route}: any) => {
  const {inventory, inventoryLineId, productId} = route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {Inventory} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.InventoryLine',
  });

  const {inventoryLine: _inventoryLine, loadingInventoryLine} = useSelector(
    state => state.inventoryLine,
  );

  const inventoryLine = useMemo(
    () => (inventoryLineId != null ? _inventoryLine : null),
    [_inventoryLine, inventoryLineId],
  );

  const productFromId = useProductByCompany(
    productId ?? inventoryLine?.product?.id,
  );

  const [loading, setLoading] = useState(true);
  const [rack, setRack] = useState<string>();
  const [realQty, setRealQty] = useState<number>(0);
  const [description, setDescription] = useState<string>();
  const [stockLocation, setStockLocation] = useState<any>();

  const trackingNumber = useMemo(
    () => inventoryLine?.trackingNumber ?? route.params.trackingNumber,
    [inventoryLine, route.params.trackingNumber],
  );

  const isTrackingNumberSelectVisible = useMemo(
    () =>
      InventoryType.isTrackingNumberSelectVisible(
        inventory?.statusSelect,
        productFromId,
        trackingNumber,
      ),
    [inventory, productFromId, trackingNumber],
  );

  const isQtyReadonly = useMemo(
    () =>
      readonly || inventory?.statusSelect === Inventory?.statusSelect.Validated,
    [Inventory?.statusSelect.Validated, inventory?.statusSelect, readonly],
  );

  const isDescriptionReadonly = useMemo(
    () =>
      readonly || inventory?.statusSelect >= Inventory?.statusSelect.Completed,
    [Inventory?.statusSelect.Completed, inventory?.statusSelect, readonly],
  );

  useEffect(() => {
    setRealQty(inventoryLine?.realQty ?? 0);
    setDescription(inventoryLine?.description);
    setStockLocation(
      inventoryLine ? inventoryLine?.stockLocation : inventory?.stockLocation,
    );
    setLoading(false);
  }, [inventory, inventoryLine]);

  const getInventoryLine = useCallback(() => {
    if (inventoryLineId != null) {
      dispatch((fetchInventoryLine as any)({inventoryLineId}));
    }
  }, [dispatch, inventoryLineId]);

  useEffect(() => {
    getInventoryLine();
  }, [getInventoryLine]);

  if (inventoryLineId != null && inventoryLine?.id !== inventoryLineId) {
    return null;
  }

  return (
    <Screen
      fixedItems={
        <InventoryLineButtons
          description={description}
          inventory={inventory}
          inventoryLine={inventoryLine}
          rack={rack}
          realQty={realQty}
          stockLocation={stockLocation}
          trackingNumber={trackingNumber}
          visible={!isTrackingNumberSelectVisible}
        />
      }
      loading={loading}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <InventoryHeader
            reference={inventory.inventorySeq}
            status={inventory.statusSelect}
            date={InventoryType.getDate(inventory)}
            stockLocation={inventory.stockLocation?.name}
          />
        }
      />
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        refresh={
          inventoryLineId != null
            ? {loading: loadingInventoryLine, fetcher: getInventoryLine}
            : undefined
        }>
        <ProductCardInfo
          product={productFromId}
          trackingNumber={trackingNumber}
          locker={inventoryLine?.rack}
        />
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          <StockLocationSearchBar
            scanKey={stockLocationScanKey}
            placeholderKey="Stock_StockLocation"
            defaultStockLocation={inventory.stockLocation}
            defaultValue={stockLocation}
            onChange={setStockLocation}
          />
          <InventoryLineTrackingNumberSelect
            product={productFromId}
            inventoryLine={inventoryLine}
            visible={!readonly && isTrackingNumberSelectVisible}
          />
          <InventoryLineQuantityCard
            inventoryLine={inventoryLine}
            realQty={realQty}
            setRealQty={setRealQty}
            readonly={isQtyReadonly}
          />
          <DescriptionCard
            onChange={setDescription}
            description={description!}
            isEditable={!isDescriptionReadonly}
          />
          {inventoryLine == null && (
            <EditableInput
              placeholder={I18n.t('Stock_Locker')}
              onValidate={setRack}
              defaultValue={rack}
            />
          )}
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    width: '92%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingBottom: 10,
    marginTop: 4,
    marginBottom: 125,
  },
});

export default InventoryLineDetailsScreen;
