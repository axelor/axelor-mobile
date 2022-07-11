import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Screen, Text, Button} from '@/components/atoms';
import Inventory from '@/modules/stock/types/inventory';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {
  ProductCardInfo,
  QuantityCard,
  DescriptionCard,
  InventoryHeader,
} from '@/modules/stock/components/organisms';
import {fetchProductWithId} from '../../features/productSlice';
import useTranslator from '@/hooks/use-translator';

const InventoryLineDetailsScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const inventoryLine = route.params.inventoryLine;
  const {loadingProductFromId, productFromId: product} = useSelector(
    state => state.product,
  );
  const trackingNumber = inventoryLine.trackingNumber;
  const [realQty, setRealQty] = useState(
    inventoryLine.realQty == null ? 0 : inventoryLine.realQty,
  );
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductWithId(inventoryLine.product?.id));
  }, [dispatch, inventoryLine]);

  const handleDescriptionChange = input => {};

  const handleShowProduct = () => {
    navigation.navigate('ProductNavigator', {
      screen: 'ProductStockDetailsScreen',
      params: {
        product: product,
      },
    });
  };

  return (
    <Screen>
      {loadingProductFromId ? (
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
          <ProductCardInfo
            onPress={handleShowProduct}
            pictureId={product?.picture.id}
            code={product?.code}
            name={product?.name}
            trackingNumber={trackingNumber?.trackingNumberSeq}
            locker={inventoryLine.rack}
          />
          <QuantityCard
            labelQty={`${I18n.t('Stock_PhysicalQty')} :`}
            defaultValue={parseFloat(realQty).toFixed(2)}
            onValueChange={setRealQty}
            editable={inventory.statusSelect !== Inventory.status.Validated}>
            <Text style={styles.text}>
              {`${I18n.t('Stock_DatabaseQty')} : ${parseFloat(
                inventoryLine.currentQty,
              ).toFixed(2)} ${inventoryLine.unit.name}`}
            </Text>
          </QuantityCard>
          <DescriptionCard
            onChange={input => handleDescriptionChange(input)}
            description={inventoryLine.description}
            isEditable={
              inventory.statusSelect !== Inventory.status.Completed &&
              inventory.statusSelect !== Inventory.status.Validated
            }
          />
          {inventory.statusSelect < Inventory.status.InProgress && (
            <Button
              style={styles.btn}
              title={I18n.t('Base_Save')}
              onPress={() => {}}
            />
          )}
          {inventory.statusSelect === Inventory.status.Completed && (
            <Button
              style={styles.btn}
              title={I18n.t('Base_Check')}
              onPress={() => {}}
            />
          )}
        </ScrollView>
      )}
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
});

export default InventoryLineDetailsScreen;
