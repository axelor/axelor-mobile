import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  Chip,
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {InventoryHeader, InventoryLineCard} from '../../components';
import {fetchInventoryLines} from '../../features/inventoryLineSlice';
import Inventory from '../../types/inventory';

const InventoryLineListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const inventory = route.params.inventory;
  const {loadingInventoryLines, moreLoading, isListEnd, inventoryLineList} =
    useSelector(state => state.inventoryLine);
  const [filteredList, setFilteredList] = useState(inventoryLineList);
  const [doneStatus, setDoneStatus] = useState(false);
  const [diffStatus, setDiffStatus] = useState(false);
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
          inventoryId: inventory?.id,
          page: page,
        }),
      );
    },
    [inventory, dispatch],
  );

  const handleDoneStatus = () => {
    if (!doneStatus && (undoneStatus || diffStatus)) {
      setUndoneStatus(false);
      setDiffStatus(false);
    }
    setDoneStatus(!doneStatus);
  };

  const handleDiffStatus = () => {
    if (!diffStatus && (undoneStatus || doneStatus)) {
      setUndoneStatus(false);
      setDoneStatus(false);
    }
    setDiffStatus(!diffStatus);
  };

  const handleUndoneStatus = () => {
    if (!undoneStatus && (diffStatus || doneStatus)) {
      setDoneStatus(false);
      setDiffStatus(false);
    }
    setUndoneStatus(!undoneStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (doneStatus) {
          return list.filter(item => item.realQty === item.currentQty);
        } else if (diffStatus) {
          return list.filter(
            item => item.realQty != null && item.realQty !== item.currentQty,
          );
        } else if (undoneStatus) {
          return list.filter(item => item.realQty == null);
        } else {
          return list;
        }
      }
    },
    [diffStatus, doneStatus, undoneStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(inventoryLineList));
  }, [inventoryLineList, filterOnStatus]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
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
        }
        chipComponent={
          <ChipSelect>
            <Chip
              selected={doneStatus}
              title={I18n.t('Stock_Complete')}
              onPress={handleDoneStatus}
              selectedColor={{
                backgroundColor: Colors.primaryColor_light,
                borderColor: Colors.primaryColor,
              }}
              marginHorizontal={3}
              width={Dimensions.get('window').width * 0.3}
            />
            <Chip
              selected={diffStatus}
              title={I18n.t('Stock_Difference')}
              onPress={handleDiffStatus}
              selectedColor={{
                backgroundColor: Colors.cautionColor_light,
                borderColor: Colors.cautionColor,
              }}
              marginHorizontal={3}
              width={Dimensions.get('window').width * 0.3}
            />
            <Chip
              selected={undoneStatus}
              title={I18n.t('Stock_NotDone')}
              onPress={handleUndoneStatus}
              selectedColor={{
                backgroundColor: Colors.secondaryColor_light,
                borderColor: Colors.secondaryColor,
              }}
              marginHorizontal={3}
              width={Dimensions.get('window').width * 0.3}
            />
          </ChipSelect>
        }
      />
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

export default InventoryLineListScreen;
