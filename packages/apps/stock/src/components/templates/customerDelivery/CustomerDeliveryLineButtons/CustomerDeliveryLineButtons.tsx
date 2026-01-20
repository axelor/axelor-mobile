/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useTranslator,
  useDispatch,
  useNavigation,
  useTypes,
  useStackChecker,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {updateCustomerDeliveryLine} from '../../../../features/customerDeliveryLineSlice';
import {fetchNextCustomerDeliveryLine} from '../../../../api/customer-delivery-line-api';

const CustomerDeliveryLineButtons = ({
  customerDeliveryLine,
  customerDelivery,
  realQty,
  fromStockLocation,
  visible = true,
  description,
}: {
  customerDeliveryLine: any;
  customerDelivery: any;
  realQty: number;
  fromStockLocation?: any;
  visible?: boolean;
  description?: string;
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {StockMove} = useTypes();
  const isScreenMounted = useStackChecker();

  const [nextLine, setNextLine] = useState<any>();

  useEffect(() => {
    fetchNextCustomerDeliveryLine({
      customerDeliveryId: customerDelivery.id,
      sequence: customerDeliveryLine?.sequence,
    })
      .then(res => res?.data?.data?.[0])
      .then(setNextLine)
      .catch(() => setNextLine(null));
  }, [customerDelivery.id, customerDeliveryLine?.sequence]);

  const navigateBackToDetails = useCallback(() => {
    if (isScreenMounted('CustomerDeliveryLineListScreen')) {
      navigation.popTo('CustomerDeliveryLineListScreen', {
        customerDelivery,
      });
    } else {
      navigation.popTo('CustomerDeliveryDetailScreen', {
        customerDeliveryId: customerDelivery.id,
      });
    }
  }, [customerDelivery, isScreenMounted, navigation]);

  const handleValidateApi = useCallback(() => {
    dispatch(
      (updateCustomerDeliveryLine as any)({
        stockMoveLineId: customerDeliveryLine.id,
        version: customerDeliveryLine.version,
        customerDeliveryId: customerDelivery.id,
        realQty: realQty,
        fromStockLocationId: fromStockLocation?.id,
        description,
      }),
    );
  }, [
    customerDelivery.id,
    customerDeliveryLine.id,
    customerDeliveryLine.version,
    description,
    dispatch,
    fromStockLocation?.id,
    realQty,
  ]);

  const handleValidate = useCallback(() => {
    handleValidateApi();
    navigateBackToDetails();
  }, [handleValidateApi, navigateBackToDetails]);

  const handleValidateContinue = useCallback(() => {
    handleValidateApi();
    navigation.replace('CustomerDeliveryLineDetailScreen', {
      customerDeliveryLineId: nextLine?.id,
      customerDelivery,
    });
  }, [customerDelivery, handleValidateApi, navigation, nextLine?.id]);

  if (!visible) {
    return null;
  }

  if (customerDelivery.statusSelect !== StockMove?.statusSelect.Realized) {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          title={I18n.t('Base_Validate')}
          onPress={handleValidate}
        />
        {nextLine?.id != null && (
          <Button
            style={styles.button}
            title={I18n.t('Stock_ValidateContinue')}
            onPress={handleValidateContinue}
          />
        )}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
  },
});

export default CustomerDeliveryLineButtons;
