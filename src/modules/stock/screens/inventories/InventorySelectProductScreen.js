import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import Inventory from '@/modules/stock/types/inventory';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {AutocompleteSearch, PopUpOneButton} from '@/components/organisms';
import {searchProducts} from '@/modules/stock/features/productSlice';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {InventoryHeader} from '../../components/organisms';
import useTranslator from '@/hooks/use-translator';

const productScanKey = 'product_inventory-select';

const InventorySelectProductScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const {productList} = useSelector(state => state.product);
  const [isVisible, setVisible] = useState(false);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

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
            inventoryLine: inventoryLine,
            inventory: inventory,
            product: item,
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
            product: item,
          });
        }
      }
    }
  };

  return (
    <Screen>
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
      {inventory.fromRack && (
        <LocationsMoveCard
          fromStockLocation={inventory.fromRack}
          toStockLocation={inventory.toRack}
          isLockerCard={true}
        />
      )}
      <AutocompleteSearch
        objectList={productList}
        onChangeValue={item => handleProductSelection(item)}
        fetchData={fetchProductsAPI}
        displayValue={displayItemName}
        scanKeySearch={productScanKey}
        placeholder={I18n.t('Stock_Product')}
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
