import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  EditableInput,
  HeaderContainer,
  Screen,
  ScrollView,
  Text,
} from '@aos-mobile/ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@aos-mobile/core';
import {InventoryHeader, LocationsMoveCard} from '../../components';
import {
  fetchInventoryById,
  modifyDescription,
  updateInventory,
} from '../../features/inventorySlice';
import Inventory from '../../types/inventory';

const InventoryPlannedDetailsScreen = ({route, navigation}) => {
  const {loading, inventory} = useSelector(state => state.inventory);
  const {mobileSettings} = useSelector(state => state.config);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventoryById({inventoryId: route.params.inventoryId}));
  }, [dispatch, route.params.inventoryId]);

  const handleDescriptionChange = input => {
    dispatch(
      modifyDescription({
        inventoryId: inventory?.id,
        description: input.toString(),
        version: inventory?.version,
      }),
    );
  };

  const handleStartInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory?.id,
        version: inventory?.version,
        status: Inventory.status.InProgress,
        userId: null,
      }),
    );
    navigation.navigate('InventoryStartedDetailsScreen', {
      inventoryId: inventory?.id,
    });
  }, [dispatch, inventory, navigation]);

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
        <Button title={I18n.t('Base_Start')} onPress={handleStartInventory} />
      }
      loading={loading || inventory == null}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View>
            <InventoryHeader
              reference={inventory?.inventorySeq}
              status={inventory?.statusSelect}
              date={inventory?.plannedStartDateT}
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
            fromStockLocation={inventory?.fromRack}
            toStockLocation={inventory?.toRack}
            isLockerCard={true}
          />
        )}
        <Text style={styles.title}>{I18n.t('Base_Description')}</Text>
        <EditableInput
          defaultValue={inventory?.description}
          placeholder={I18n.t('Base_Description')}
          onValidate={input => handleDescriptionChange(input)}
          multiline={true}
          numberOfLines={5}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  marginHorizontal: {
    marginHorizontal: 24,
  },
  title: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});

export default InventoryPlannedDetailsScreen;
