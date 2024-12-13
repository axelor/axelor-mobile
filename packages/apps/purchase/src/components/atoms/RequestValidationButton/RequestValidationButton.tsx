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
import {View, StyleSheet} from 'react-native';

import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator, useTypes} from '@axelor/aos-mobile-core';

const RequestValidationButton = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {PurchaseRequest} = useTypes();
  const {purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );

  if (purchaseRequest.statusSelect === PurchaseRequest?.statusSelect.Draft) {
    return (
      <View style={styles.buttonContainer}>
        <Button
          title={I18n.t('Base_Cancel')}
          onPress={() => {}}
          width="45%"
          color={Colors.errorColor}
          iconName="x-lg"
        />
        <Button
          title={I18n.t('Purchase_Request')}
          onPress={() => {}}
          width="45%"
          iconName="check-lg"
        />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RequestValidationButton;
