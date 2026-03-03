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
import {
  EditableInput,
  HeaderContainer,
  KeyboardAvoidingScrollView,
  Screen,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  DescriptionCard,
  InventoryHeader,
  ProductCardInfo,
  InventoryLineQuantityCard,
  InventoryLineButtons,
  InventoryLineTrackingNumberSelect,
  StockLocationSearchBar,
} from '../../components';
import {fetchInventoryLine} from '../../features/inventoryLineSlice';
import {Inventory as InventoryType} from '../../types';
import {useProductByCompany} from '../../hooks';

const stockLocationScanKey = 'stock-location_inventory-line-details';

const InventoryLineDetailsScreen = ({route, navigation}) => {
  const {inventory, inventoryLineId, productId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {Inventory} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.InventoryLine',
  });

  const {inventoryLine: _inventoryLine, loadingInventoryLine} = useSelector(
    state => state.inventoryLine,
  );

  const productFromId = useProductByCompany(
    productId ?? inventoryLine?.product?.id,
  );

  const inventoryLine = useMemo(
    () => (inventoryLineId != null ? _inventoryLine : null),
    [_inventoryLine, inventoryLineId],
  );

  const [loading, setLoading] = useState(true);
  const [rack, setRack] = useState(null);
  const [realQty, setRealQty] = useState(0);
  const [description, setDescription] = useState();
  const [stockLocation, setStockLocation] = useState();

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

  useEffect(() => {
    setRealQty(inventoryLine?.realQty ?? 0);
    setDescription(inventoryLine?.description);
    setStockLocation(
      inventoryLine ? inventoryLine?.stockLocation : inventory?.stockLocation,
    );
    setLoading(false);
  }, [inventory, inventoryLine]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: productFromId,
    });
  };

  const getInventoryLine = useCallback(() => {
    if (inventoryLineId != null) {
      dispatch(fetchInventoryLine({inventoryLineId}));
    }
  }, [dispatch, inventoryLineId]);

  useEffect(() => {
    getInventoryLine();
  }, [getInventoryLine]);

  return (
    <Screen
      removeSpaceOnTop={true}
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
            date={
              inventory.statusSelect === Inventory?.statusSelect.Planned
                ? inventory.plannedStartDateT
                : inventory.plannedEndDateT
            }
            stockLocation={inventory.stockLocation?.name}
          />
        }
      />
      <KeyboardAvoidingScrollView
        refresh={
          inventoryLineId != null
            ? {loading: loadingInventoryLine, fetcher: getInventoryLine}
            : undefined
        }>
        <ProductCardInfo
          onPress={handleShowProduct}
          picture={productFromId?.picture}
          code={productFromId?.code}
          name={productFromId?.name}
          trackingNumber={trackingNumber?.trackingNumberSeq}
          locker={inventoryLine?.rack}
        />
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
          readonly={readonly}
        />
        <DescriptionCard
          onChange={input => setDescription(input)}
          description={description}
          isEditable={
            !readonly &&
            inventory.statusSelect !== Inventory?.statusSelect.Completed &&
            inventory.statusSelect !== Inventory?.statusSelect.Validated
          }
        />
        {inventoryLine == null && (
          <EditableInput
            placeholder={I18n.t('Stock_Locker')}
            onValidate={input => setRack(input)}
            defaultValue={rack}
          />
        )}
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default InventoryLineDetailsScreen;
