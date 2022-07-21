import React, {useCallback, useEffect} from 'react';
import {StyleSheet, ScrollView, View, ActivityIndicator} from 'react-native';
import {Button, Screen, Text} from '@/components/atoms';
import {EditableInput} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchInventoryById,
  modifyDescription,
  updateInventory,
} from '@/modules/stock/features/inventorySlice';
import {InventoryHeader} from '../../components/organisms';
import useTranslator from '@/hooks/use-translator';
import Inventory from '../../types/inventory';

const InventoryPlannedDetailsScreen = ({route, navigation}) => {
  const {loading, inventory} = useSelector(state => state.inventory);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventoryById({inventoryId: route.params.inventoryId}));
  }, [dispatch, route.params.inventoryId]);

  const handleDescriptionChange = input => {
    dispatch(
      modifyDescription({
        inventoryId: inventory.id,
        description: input.toString(),
        version: inventory.version,
      }),
    );
  };

  const handleStartInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory.id,
        version: inventory.version,
        status: Inventory.status.InProgress,
        userId: null,
      }),
    );
    navigation.navigate('InventoryStartedDetailsScreen', {
      inventoryId: inventory.id,
    });
  }, [dispatch, inventory, navigation]);

  return (
    <Screen>
      {loading || inventory == null ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <InventoryHeader
            reference={inventory.inventorySeq}
            status={inventory.statusSelect}
            date={inventory.plannedStartDateT}
            stockLocation={inventory.stockLocation?.name}
          />
          {inventory.fromRack && (
            <LocationsMoveCard
              fromStockLocation={inventory.fromRack}
              toStockLocation={inventory.toRack}
              isLockerCard={true}
            />
          )}
          <View style={styles.marginHorizontal}>
            {inventory.productFamily != null && (
              <Text>{`${I18n.t('Stock_ProductFamily')} : ${
                inventory.productFamily?.name
              }`}</Text>
            )}
            {inventory.productCategory != null && (
              <Text>{`${I18n.t('Stock_ProductCategory')} : ${
                inventory.productCategory?.name
              }`}</Text>
            )}
          </View>
          <Text style={styles.title}>{I18n.t('Base_Description')}</Text>
          <EditableInput
            defaultValue={inventory.description}
            placeholder={I18n.t('Base_Description')}
            style={styles.description}
            onValidate={input => handleDescriptionChange(input)}
            multiline={true}
            numberOfLines={5}
          />
          <Button
            style={styles.startBtn}
            title={I18n.t('Base_Start')}
            onPress={handleStartInventory}
          />
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  marginHorizontal: {
    marginHorizontal: 16,
  },
  description: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
  startBtn: {
    width: '60%',
    marginTop: 20,
    borderRadius: 35,
    marginHorizontal: '20%',
  },
  title: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});

export default InventoryPlannedDetailsScreen;
