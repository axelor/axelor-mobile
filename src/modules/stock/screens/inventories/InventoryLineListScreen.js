import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Screen, Text} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import Inventory from '@/modules/stock/types/inventory';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {fetchInventoryLines} from '@/modules/stock/features/inventoryLineSlice';
import {
  InventoryLineCard,
  InventoryHeader,
} from '@/modules/stock/components/organisms';
import {ChipSelect, ScrollList} from '@/components/organisms';
import {ColorHook} from '@/themeStore';

const InventoryLineListDetailsScreen = ({route, navigation}) => {
  const Colors = ColorHook();
  const inventory = route.params.inventory;
  const {loadingInventoryLines, moreLoading, isListEnd, inventoryLineList} =
    useSelector(state => state.inventoryLine);
  const [filteredList, setFilteredList] = useState(inventoryLineList);
  const [doneStatus, setDoneStatus] = useState(false);
  const [undoneStatus, setUndoneStatus] = useState(false);
  const dispatch = useDispatch();

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

  const fetchInventoryLinesAPI = useCallback(
    page => {
      dispatch(
        fetchInventoryLines({
          inventoryId: inventory.id,
          page: page,
        }),
      );
    },
    [inventory.id, dispatch],
  );

  const handleDoneStatus = () => {
    if (!doneStatus && undoneStatus) {
      setUndoneStatus(!undoneStatus);
    }
    setDoneStatus(!doneStatus);
  };

  const handleUndoneStatus = () => {
    if (!undoneStatus && doneStatus) {
      setDoneStatus(!doneStatus);
    }
    setUndoneStatus(!undoneStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (doneStatus) {
          return list.filter(item => parseFloat(item.realQty) != null);
        } else if (undoneStatus) {
          return list.filter(item => parseFloat(item.realQty) == null);
        } else {
          return list;
        }
      }
    },
    [doneStatus, undoneStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(inventoryLineList));
  }, [inventoryLineList, filterOnStatus]);

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
          style={styles.moveCard}
        />
      )}
      <View style={styles.detailsCard}>
        {inventory.productFamily != null && (
          <Text>{`Product family : ${inventory.productFamily?.name}`}</Text>
        )}
        {inventory.productCategory != null && (
          <Text>{`Product category : ${inventory.productCategory?.name}`}</Text>
        )}
      </View>
      <ChipSelect>
        <Chip
          selected={doneStatus}
          title="Done"
          onPress={handleDoneStatus}
          selectedColor={{
            backgroundColor: Colors.primaryColor_light,
            borderColor: Colors.primaryColor,
          }}
        />
        <Chip
          selected={undoneStatus}
          title="Not Done"
          onPress={handleUndoneStatus}
          selectedColor={{
            backgroundColor: Colors.secondaryColor_light,
            borderColor: Colors.secondaryColor,
          }}
        />
      </ChipSelect>
      <ScrollList
        loadingList={loadingInventoryLines}
        data={filteredList}
        renderItem={({item}) => (
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
        fetchData={fetchInventoryLinesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
  },
  moveCard: {
    marginVertical: 10,
  },
  detailsCard: {
    marginHorizontal: 16,
    marginBottom: 5,
  },
});

export default InventoryLineListDetailsScreen;
