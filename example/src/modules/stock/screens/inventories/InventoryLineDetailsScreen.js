import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {Screen, Text, Button} from '@aos-mobile/ui';
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
import {fetchProductWithId} from '../../features/productSlice';

const InventoryLineDetailsScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const product = route.params.product;
  const trackingNumber = route.params.trackingNumber;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const [rack, setRack] = useState(null);
  const [realQty, setRealQty] = useState(
    inventoryLine?.realQty == null ? 0 : inventoryLine.realQty,
  );
  const [description, setDescription] = useState(inventoryLine?.description);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductWithId(
        product != null ? product.id : inventoryLine?.product?.id,
      ),
    );
  }, [dispatch, inventoryLine, product]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: productFromId,
    });
  };

  const handleNewLine = useCallback(() => {
    dispatch(
      createNewInventoryLine({
        inventoryId: inventory.id,
        inventoryVersion: inventory.version,
        productId: productFromId?.id,
        trackingNumberId: trackingNumber?.id,
        rack: rack == null || rack === '' ? null : rack,
        realQty: realQty,
      }),
    );
    navigation.navigate('InventoryLineListScreen', {
      inventory: inventory,
    });
  }, [
    dispatch,
    inventory,
    navigation,
    productFromId,
    rack,
    realQty,
    trackingNumber,
  ]);

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
      inventory: inventory,
    });
  }, [description, dispatch, inventory, inventoryLine, navigation, realQty]);

  return (
    <Screen
      fixedItems={
        inventoryLine == null ? (
          <Button title={I18n.t('Base_Add')} onPress={handleNewLine} />
        ) : inventory?.statusSelect !== Inventory.status.Validated ? (
          <Button
            title={
              inventory.statusSelect <= Inventory.status.InProgress
                ? I18n.t('Base_Save')
                : I18n.t('Base_Check')
            }
            onPress={handleUpdateLine}
          />
        ) : null
      }
      loading={loadingProductFromId}>
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
          pictureId={productFromId?.picture?.id}
          code={productFromId?.code}
          name={productFromId?.name}
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
            placeholder={I18n.t('Stock_Locker')}
            onValidate={input => setRack(input)}
            defaultValue={rack}
          />
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  moveCard: {
    marginVertical: 10,
  },
});

export default InventoryLineDetailsScreen;
