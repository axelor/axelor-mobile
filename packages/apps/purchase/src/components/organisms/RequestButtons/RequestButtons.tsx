/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React from 'react';
import {View, StyleSheet, DimensionValue} from 'react-native';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator, useTypes} from '@axelor/aos-mobile-core';

const RequestButtons = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {PurchaseRequest} = useTypes();
  const {purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );

  const getButtonsForStatus = status => {
    switch (status) {
      case PurchaseRequest.statusSelect.Draft:
        return [
          {
            title: I18n.t('Base_Cancel'),
            onPress: () => {},
            width: '45%',
            color: Colors.errorColor,
            iconName: 'x-lg',
          },
          {
            title: I18n.t('Purchase_Request'),
            onPress: () => {},
            width: '45%',
            iconName: 'check-lg',
          },
        ];

      case PurchaseRequest.statusSelect.Requested:
        return [
          {
            title: I18n.t('Base_Cancel'),
            onPress: () => {},
            width: '30%',
            color: Colors.errorColor,
            iconName: 'x-lg',
          },
          {
            title: I18n.t('Purchase_Refuse'),
            onPress: () => {},
            width: '30%',
            color: Colors.errorColor,
            iconName: 'x-lg',
          },
          {
            title: I18n.t('Purchase_Accepte'),
            onPress: () => {},
            width: '30%',
            iconName: 'check-lg',
          },
        ];

      case PurchaseRequest.statusSelect.Accepted:
        return [
          {
            title: I18n.t('Base_Cancel'),
            onPress: () => {},
            width: '45%',
            color: Colors.errorColor,
            iconName: 'x-lg',
          },
          {
            title: I18n.t('Purchase_Purchase'),
            onPress: () => {},
            width: '45%',
            iconName: 'cart-fill',
          },
        ];

      case PurchaseRequest.statusSelect.Purchased:
        return [
          {
            title: I18n.t('Base_Cancel'),
            onPress: () => {},
            width: '90%',
            color: Colors.errorColor,
            iconName: 'x-lg',
          },
        ];

      case PurchaseRequest.statusSelect.Refused:
        return [
          {
            title: I18n.t('Base_Cancel'),
            onPress: () => {},
            width: '90%',
            color: Colors.errorColor,
            iconName: 'x-lg',
          },
        ];

      case PurchaseRequest.statusSelect.Canceled:
        return [
          {
            title: I18n.t('Purchase_Draft'),
            onPress: () => {},
            width: '90%',
            iconName: 'pencil-fill',
          },
        ];

      default:
        return [];
    }
  };

  const buttons = getButtonsForStatus(purchaseRequest?.statusSelect);

  if (buttons.length === 0) {
    return null;
  }

  return (
    <View style={styles.buttonContainer}>
      {buttons.map((btn, idx) => (
        <Button key={idx} {...btn} width={btn.width as DimensionValue} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RequestButtons;
