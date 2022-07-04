import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Screen, Text, Button} from '@/components/atoms';
import {ViewAllContainer} from '@/components/molecules';
import Inventory from '@/modules/stock/types/inventory';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {fetchInventoryLines} from '@/modules/stock/features/inventoryLineSlice';
import {
  InventoryLineCard,
  InventoryHeader,
} from '@/modules/stock/components/organisms';

const InventoryStartedDetailsScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const {loadingInventoryLines, inventoryLineList} = useSelector(
    state => state.inventoryLine,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (inventory != null) {
      dispatch(fetchInventoryLines({inventoryId: inventory.id, page: 0}));
    }
  }, [dispatch, inventory]);

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
    navigation.navigate('InventoryLineListDetailsScreen', {
      inventory: inventory,
    });
  };

  return (
    <Screen>
      {loadingInventoryLines ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
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
              style={styles.moveCard}
              isLockerCard={true}
              fromStockLocation={inventory.fromRack}
              toStockLocation={inventory.toRack}
            />
          )}
          <View style={styles.marginHorizontal}>
            {inventory.productFamily != null && (
              <Text>{`Product family : ${inventory.productFamily?.name}`}</Text>
            )}
            {inventory.productCategory != null && (
              <Text>{`Product category : ${inventory.productCategory?.name}`}</Text>
            )}
          </View>
          <ViewAllContainer
            isHeaderExist={
              inventory.statusSelect !== Inventory.status.Completed
            }
            onPress={handleViewAll}>
            {inventoryLineList[0] == null ? null : (
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
            {inventoryLineList[1] == null ? null : (
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
          {inventory.statusSelect !== Inventory.status.Completed && (
            <Button style={styles.btn} title="VALIDATE" onPress={() => {}} />
          )}
        </ScrollView>
      )}
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
  btn: {
    marginTop: 20,
  },
});

export default InventoryStartedDetailsScreen;
