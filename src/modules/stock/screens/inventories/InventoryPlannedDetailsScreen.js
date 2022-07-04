import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Button, Screen, Text, Card} from '@/components/atoms';
import {EditableInput} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {useDispatch} from 'react-redux';
import {modifyDescription} from '@/modules/stock/features/inventorySlice';
import {InventoryHeader} from '../../components/organisms';

const InventoryPlannedDetailsScreen = ({route, navigation}) => {
  const [inventory, setInventory] = useState(route.params.inventory);
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
            editable={false}
          />
        )}
        {inventory.productFamily != null ||
        inventory.productCategory != null ? (
          <Card style={styles.cardProductInfo}>
            {inventory.productFamily == null ? null : (
              <Text>{inventory.productFamily?.name}</Text>
            )}
            {inventory.productCategory == null ? null : (
              <Text>{inventory.productCategory?.name}</Text>
            )}
          </Card>
        ) : null}
        <Text style={styles.title}>Description</Text>
        <EditableInput
          defaultValue={inventory.description}
          placeholder="Description"
          style={styles.description}
          onValidate={input => handleDescriptionChange(input)}
          multiline={true}
          numberOfLines={5}
        />
        <Button style={styles.startBtn} title="START" />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginTop: '2%',
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '3%',
    marginHorizontal: 16,
  },
  refContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
  title: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});

export default InventoryPlannedDetailsScreen;
