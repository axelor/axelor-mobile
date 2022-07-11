import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Screen, Text, Card} from '@/components/atoms';
import Inventory from '@/modules/stock/types/inventory';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {AutocompleteSearch, PopUpOneButton} from '@/components/organisms';
import {displayItemTrackingNumber} from '@/modules/stock/utils/displayers';
import {filterTrackingNumber} from '../../features/trackingNumberSlice';
import {InventoryHeader} from '../../components/organisms';
import useTranslator from '@/hooks/use-translator';

const trackingScanKey = 'tracking_inventory-select';

const InventorySelectTrackingScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const product = route.params.product;
  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const [isVisible, setVisible] = useState(false);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

  const handleTrackingNumberSelection = useCallback(
    item => {
      if (item !== null) {
        if (item.id !== inventoryLine.trackingNumber?.id) {
          setVisible(true);
        } else {
          navigation.navigate('InventoryLineDetailsScreen', {
            inventoryLine: inventoryLine,
            inventory: inventory,
            product: product,
            trackingNumber: item,
          });
        }
      }
    },
    [inventory, inventoryLine, navigation, product],
  );

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
      <Card style={styles.cardProductInfo}>
        <Text>{inventoryLine.product?.fullName}</Text>
      </Card>
      <AutocompleteSearch
        objectList={trackingNumberList}
        onChangeValue={item => handleTrackingNumberSelection(item)}
        fetchData={fetchTrackingAPI}
        displayValue={displayItemTrackingNumber}
        scanKeySearch={trackingScanKey}
        placeholder={I18n.t('Stock_TrackingNumber')}
        isFocus={true}
        changeScreenAfter={true}
      />
      <PopUpOneButton
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ErrorTrackingNumber')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
});

export default InventorySelectTrackingScreen;
