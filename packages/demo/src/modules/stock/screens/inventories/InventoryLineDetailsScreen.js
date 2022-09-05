import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {Screen, Text, Button} from '@/components/atoms';
import Inventory from '@/modules/stock/types/inventory';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {
  ProductCardInfo,
  QuantityCard,
  DescriptionCard,
  InventoryHeader,
} from '@/modules/stock/components/organisms';
import useTranslator from '@/hooks/use-translator';
import {
  createNewInventoryLine,
  updateInventoryLine,
} from '../../features/inventoryLineSlice';
import {EditableInput} from '@/components/molecules';

const InventoryLineDetailsScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const product = route.params.product;
  const trackingNumber = route.params.trackingNumber;
  const [rack, setRack] = useState(null);
  const [realQty, setRealQty] = useState(
    inventoryLine?.realQty == null ? 0 : inventoryLine.realQty,
  );
  const [description, setDescription] = useState(inventoryLine?.description);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleShowProduct = () => {
    navigation.navigate('ProductNavigator', {
      screen: 'ProductStockDetailsScreen',
      params: {
        product: product,
      },
    });
  };

  const handleNewLine = useCallback(() => {
    dispatch(
      createNewInventoryLine({
        inventoryId: inventory.id,
        inventoryVersion: inventory.version,
        productId: product.id,
        trackingNumberId: trackingNumber?.id,
        rack: rack == null || rack === '' ? null : rack,
        realQty: realQty,
      }),
    );
    navigation.navigate('InventoryLineListScreen', {
      inventoryId: inventory.id,
    });
  }, [dispatch, inventory, navigation, product, rack, realQty, trackingNumber]);

  const handleUpdateLine = useCallback(() => {
    dispatch(
      updateInventoryLine({
        inventoryLineId: inventoryLine.id,
        version: inventoryLine.version,
        realQty: realQty,
        description: description,
      }),
    );
    navigation.navigate('InventoryLineListScreen', {
      inventoryId: inventory.id,
    });
  }, [description, dispatch, inventory, inventoryLine, navigation, realQty]);

  return (
    <Screen>
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
        <ProductCardInfo
          onPress={handleShowProduct}
          pictureId={product?.picture.id}
          code={product?.code}
          name={product?.name}
          trackingNumber={trackingNumber?.trackingNumberSeq}
          locker={inventoryLine?.rack}
        />
        <QuantityCard
          labelQty={`${I18n.t('Stock_PhysicalQty')} :`}
          defaultValue={parseFloat(realQty).toFixed(2)}
          onValueChange={setRealQty}
          editable={inventory.statusSelect !== Inventory.status.Validated}>
          {inventoryLine == null ? (
            <Text style={styles.text}>
              {`${I18n.t('Stock_DatabaseQty')} : ${I18n.t('Base_Unknown')}`}
            </Text>
          ) : (
            <Text style={styles.text}>
              {`${I18n.t('Stock_DatabaseQty')} : ${parseFloat(
                inventoryLine.currentQty,
              ).toFixed(2)} ${inventoryLine.unit.name}`}
            </Text>
          )}
        </QuantityCard>
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
            style={styles.lockerContainer}
            placeholder={I18n.t('Stock_Locker')}
            onValidate={input => setRack(input)}
            defaultValue={rack}
          />
        )}
        {inventoryLine == null ? (
          <Button
            style={styles.btn}
            title={I18n.t('Base_Add')}
            onPress={handleNewLine}
          />
        ) : (
          <Button
            style={styles.btn}
            title={
              inventory.statusSelect <= Inventory.status.InProgress
                ? I18n.t('Base_Save')
                : I18n.t('Base_Check')
            }
            onPress={handleUpdateLine}
          />
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
  },
  moveCard: {
    marginVertical: 10,
  },
  lockerContainer: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
});

export default InventoryLineDetailsScreen;
