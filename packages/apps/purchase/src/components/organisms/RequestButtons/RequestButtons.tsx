/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo} from 'react';
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

  const getButtonsForStatus = useCallback(
    status => {
      switch (status) {
        case PurchaseRequest.statusSelect.Draft:
          return [
            {
              title: I18n.t('Purchase_Request'),
              onPress: () => {},
              width: '45%',
              iconName: 'check-lg',
            },
            {
              title: I18n.t('Base_Cancel'),
              onPress: () => {},
              width: '45%',
              color: Colors.cautionColor,
              iconName: 'reply-fill',
            },
          ];
        case PurchaseRequest.statusSelect.Requested:
          return [
            {
              title: I18n.t('Purchase_Accept'),
              onPress: () => {},
              width: '45%',
              iconName: 'check-lg',
            },
            {
              title: I18n.t('Purchase_Refuse'),
              onPress: () => {},
              width: '45%',
              color: Colors.errorColor,
              iconName: 'x-lg',
            },
            {
              title: I18n.t('Base_Cancel'),
              onPress: () => {},
              width: '94%',
              color: Colors.cautionColor,
              iconName: 'reply-fill',
            },
          ];
        case PurchaseRequest.statusSelect.Accepted:
        case PurchaseRequest.statusSelect.Purchased:
        case PurchaseRequest.statusSelect.Refused:
          return [
            {
              title: I18n.t('Base_Cancel'),
              onPress: () => {},
              width: '90%',
              color: Colors.cautionColor,
              iconName: 'reply-fill',
            },
          ];
        default:
          return [];
      }
    },
    [Colors, I18n, PurchaseRequest],
  );

  const buttons = useMemo(
    () => getButtonsForStatus(purchaseRequest?.statusSelect),
    [getButtonsForStatus, purchaseRequest?.statusSelect],
  );

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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RequestButtons;
