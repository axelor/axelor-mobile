import React, {useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, Screen, Text} from '@/components/atoms';
import {EditableInput} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {useDispatch} from 'react-redux';
import {modifyDescription} from '@/modules/stock/features/inventorySlice';
import {InventoryHeader} from '../../components/organisms';
import useTranslator from '@/hooks/use-translator';

const InventoryPlannedDetailsScreen = ({route, navigation}) => {
  const [inventory, setInventory] = useState(route.params.inventory);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleDescriptionChange = input => {
    dispatch(
      modifyDescription({
        inventoryId: inventory.id,
        description: input.toString(),
        version: inventory.version,
      }),
    );
    setInventory({...inventory, description: input.toString()});
  };

  return (
    <Screen>
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
        <Button style={styles.startBtn} title={I18n.t('Base_Start')} />
      </ScrollView>
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
