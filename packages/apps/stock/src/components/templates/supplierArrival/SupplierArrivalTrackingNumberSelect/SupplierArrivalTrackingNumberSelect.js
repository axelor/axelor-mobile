/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useTranslator,
  useSelector,
  ScannerAutocompleteSearch,
  useDispatch,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {Text, useThemeColor, Icon} from '@axelor/aos-mobile-ui';
import {filterTrackingNumber} from '../../../../features/trackingNumberSlice';
import {displayItemTrackingNumber} from '../../../../utils/displayers';

const trackingScanKey = 'tracking_supplier-arrival-select';

const SupplierArrivalTrackingNumberSelect = ({
  product,
  supplierArrivalLine,
  supplierArrival,
  setVisible,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {trackingNumberList} = useSelector(state => state.trackingNumber);

  const handleAddTrackingNumber = () => {
    navigation.navigate('SupplierArrivalAddTrackingScreen', {
      supplierArrivalLine: supplierArrivalLine,
      supplierArrival: supplierArrival,
      product: product,
    });
  };

  const handleTrackingNumberSelection = item => {
    if (item !== null) {
      if (
        supplierArrivalLine != null &&
        item.id !== supplierArrivalLine.trackingNumber?.id
      ) {
        setVisible(true);
      } else {
        navigation.navigate('SupplierArrivalLineDetailScreen', {
          supplierArrivalLine: supplierArrivalLine,
          supplierArrival: supplierArrival,
          product: product,
          trackingNumber: item,
        });
      }
    }
  };

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

  return (
    <View>
      <View style={styles.trackingNumber}>
        <Text style={styles.text_secondary}>
          {I18n.t('Stock_AddTrackingNumber')}
        </Text>
        <Icon
          name="plus"
          color={Colors.primaryColor.background}
          size={24}
          style={styles.action}
          touchable={true}
          onPress={handleAddTrackingNumber}
        />
      </View>
      <ScannerAutocompleteSearch
        objectList={trackingNumberList}
        onChangeValue={item => handleTrackingNumberSelection(item)}
        fetchData={fetchTrackingAPI}
        displayValue={displayItemTrackingNumber}
        scanKeySearch={trackingScanKey}
        placeholder={I18n.t('Stock_TrackingNumber')}
        isFocus={true}
        changeScreenAfter={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  trackingNumber: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 5,
  },
  text_secondary: {
    fontSize: 14,
  },
  action: {
    marginLeft: 10,
  },
});

export default SupplierArrivalTrackingNumberSelect;
