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
import {View, StyleSheet} from 'react-native';
import {
  ClearableCard,
  Icon,
  Screen,
  ScrollView,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ManufacturingOrderHeader} from '../../../components/organisms';
import {
  displayItemTrackingNumber,
  filterTrackingNumber,
} from '@axelor/aos-mobile-stock';

const trackingNumberScanKey =
  'tracking-number_manufacturing-order-produced-product-select';

const ProducedProductSelectTrackingScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const manufOrder = route.params.manufOrder;
  const product = route.params.product;
  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const dispatch = useDispatch();

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

  const handleTrackingNumberSelection = item => {
    if (item != null) {
      navigation.navigate('ProducedProductDetailsScreen', {
        manufOrder: manufOrder,
        product: product,
        trackingNumber: item,
      });
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
      />
      <ScrollView>
        <ClearableCard valueTxt={product.name} clearable={false} />
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
            onPress={() => {}}
          />
        </View>
        <ScannerAutocompleteSearch
          objectList={trackingNumberList}
          onChangeValue={item => handleTrackingNumberSelection(item)}
          fetchData={fetchTrackingAPI}
          displayValue={displayItemTrackingNumber}
          scanKeySearch={trackingNumberScanKey}
          placeholder={I18n.t('Stock_TrackingNumber')}
          isFocus={true}
          changeScreenAfter={true}
        />
      </ScrollView>
    </Screen>
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

export default ProducedProductSelectTrackingScreen;
