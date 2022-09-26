import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Screen, Text, Button} from '@aos-mobile/ui';
import {ViewAllContainer} from '@/components/molecules';
import Inventory from '@/modules/stock/types/inventory';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {fetchInventoryLines} from '@/modules/stock/features/inventoryLineSlice';
import {
  InventoryLineCard,
  InventoryHeader,
} from '@/modules/stock/components/organisms';
import useTranslator from '@/hooks/use-translator';
import {
  fetchInventoryById,
  updateInventory,
} from '../../features/inventorySlice';

const InventoryStartedDetailsScreen = ({route, navigation}) => {
  const inventoryId = route.params.inventoryId;
  const {loading, inventory} = useSelector(state => state.inventory);
  const {loadingInventoryLines, inventoryLineList} = useSelector(
    state => state.inventoryLine,
  );
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventoryById({inventoryId: inventoryId}));
    dispatch(fetchInventoryLines({inventoryId: inventoryId, page: 0}));
  }, [dispatch, inventoryId]);

  const handleShowLine = item => {
    if (inventory.statusSelect === Inventory.status.Validated) {
      navigation.navigate('InventoryLineDetailsScreen', {
        inventoryLine: item,
        inventory: inventory,
      });
    } else {
      navigation.navigate('InventorySelectProductScreen', {
        inventoryLine: item,
        inventory: inventory,
      });
    }
  };

  const handleViewAll = () => {
    navigation.navigate('InventoryLineListScreen', {
      inventory: inventory,
    });
  };

  const handleCompleteInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory.id,
        version: inventory.version,
        status: Inventory.status.Completed,
        userId: null,
      }),
    );
    navigation.popToTop();
  }, [dispatch, inventory, navigation]);

  const handleValidateInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory.id,
        version: inventory.version,
        status: Inventory.status.Validated,
        userId: null,
      }),
    );
    navigation.popToTop();
  }, [dispatch, inventory, navigation]);

  const handleNewLine = useCallback(() => {
    navigation.navigate('InventorySelectProductScreen', {
      inventoryLine: null,
      inventory: inventory,
    });
  }, [inventory, navigation]);

  return (
    <Screen
      fixedItems={
        inventory?.statusSelect === Inventory.status.InProgress ? (
          <Button
            title={I18n.t('Base_Complete')}
            onPress={handleCompleteInventory}
          />
        ) : inventory?.statusSelect === Inventory.status.Completed ? (
          <Button
            title={I18n.t('Base_Validate')}
            onPress={handleValidateInventory}
          />
        ) : null
      }
      loading={loadingInventoryLines || loading || inventory == null}>
      <ScrollView>
        <InventoryHeader
          reference={inventory?.inventorySeq}
          status={inventory?.statusSelect}
          date={
            inventory?.statusSelect === Inventory.status.Planned
              ? inventory?.plannedStartDateT
              : inventory?.plannedEndDateT
          }
          stockLocation={inventory?.stockLocation?.name}
        />
        {inventory?.fromRack && (
          <LocationsMoveCard
            style={styles.moveCard}
            isLockerCard={true}
            fromStockLocation={inventory?.fromRack}
            toStockLocation={inventory?.toRack}
          />
        )}
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
        <ViewAllContainer
          isHeaderExist={inventory?.statusSelect !== Inventory.status.Completed}
          onNewIcon={handleNewLine}
          onPress={handleViewAll}>
          {inventoryLineList == null || inventoryLineList[0] == null ? null : (
            <InventoryLineCard
              style={styles.item}
              productName={inventoryLineList[0].product?.fullName}
              currentQty={inventoryLineList[0].currentQty}
              realQty={inventoryLineList[0].realQty}
              unit={inventoryLineList[0].unit?.name}
              locker={inventoryLineList[0].rack}
              trackingNumber={inventoryLineList[0].trackingNumber}
              onPress={() => handleShowLine(inventoryLineList[0])}
            />
          )}
          {inventoryLineList == null || inventoryLineList[1] == null ? null : (
            <InventoryLineCard
              style={styles.item}
              productName={inventoryLineList[1].product?.fullName}
              currentQty={inventoryLineList[1].currentQty}
              realQty={inventoryLineList[1].realQty}
              unit={inventoryLineList[1].unit?.name}
              locker={inventoryLineList[1].rack}
              trackingNumber={inventoryLineList[1].trackingNumber}
              onPress={() => handleShowLine(inventoryLineList[1])}
            />
          )}
        </ViewAllContainer>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  moveCard: {
    marginVertical: 10,
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
});

export default InventoryStartedDetailsScreen;
