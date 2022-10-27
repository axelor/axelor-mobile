import React, {useCallback, useState} from 'react';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {PopUpOneButton, Screen, HeaderContainer} from '@aos-mobile/ui';
import Inventory from '@/modules/stock/types/inventory';
import {searchProducts} from '@/modules/stock/features/productSlice';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {InventoryHeader} from '../../components/organisms';

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
      <ScannerAutocompleteSearch
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
