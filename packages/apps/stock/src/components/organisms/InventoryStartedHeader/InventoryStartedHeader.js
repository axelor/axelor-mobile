import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import InventoryHeader from '../InventoryHeader/InventoryHeader';
import Inventory from '../../../types/inventory';

const InventoryStartedHeader = ({inventory}) => {
  const I18n = useTranslator();

  return (
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
  );
};

const styles = StyleSheet.create({
  marginHorizontal: {
    marginHorizontal: 16,
  },
});

export default InventoryStartedHeader;
