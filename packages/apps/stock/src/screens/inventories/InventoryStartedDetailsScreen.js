import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  HeaderContainer,
  Screen,
  ScrollView,
  Text,
  ViewAllContainer,
} from '@aos-mobile/ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@aos-mobile/core';
import {
  InventoryHeader,
  InventoryLineCard,
  LocationsMoveCard,
} from '../../components';
import {fetchInventoryLines} from '../../features/inventoryLineSlice';
import {
  fetchInventoryById,
  updateInventory,
} from '../../features/inventorySlice';
import Inventory from '../../types/inventory';

const InventoryStartedDetailsScreen = ({route, navigation}) => {
  const inventoryId = route.params.inventoryId;
  const {loading, inventory} = useSelector(state => state.inventory);
  const {loadingInventoryLines, inventoryLineList} = useSelector(
    state => state.inventoryLine,
  );
  const {mobileSettings} = useSelector(state => state.config);
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.Inventory"
          modelId={inventory?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, inventory]);

  return (
    <Screen
      removeSpaceOnTop={true}
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
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View>
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
          </View>
        }
      />
      <ScrollView>
        {inventory?.fromRack && (
          <LocationsMoveCard
            style={styles.moveCard}
            isLockerCard={true}
            fromStockLocation={inventory?.fromRack}
            toStockLocation={inventory?.toRack}
          />
        )}
        <ViewAllContainer
          isHeaderExist={inventory?.statusSelect !== Inventory.status.Completed}
          onNewIcon={handleNewLine}
          data={inventoryLineList}
          renderFirstTwoItems={item => (
            <InventoryLineCard
              style={styles.item}
              productName={item.product?.fullName}
              currentQty={item.currentQty}
              realQty={item.realQty}
              unit={item.unit?.name}
              locker={item.rack}
              trackingNumber={item.trackingNumber}
              onPress={() => handleShowLine(item)}
            />
          )}
          onViewPress={handleViewAll}
        />
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
