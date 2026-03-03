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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, LabelText, Badge} from '@axelor/aos-mobile-ui';
import {useSelector, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

const RequestHeader = ({}) => {
  const {PurchaseRequest} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {purchaseRequest} = useSelector(
    state => state.purchase_purchaseRequest,
  );

  return (
    <View style={styles.container}>
      <View style={styles.chlidrenContainer}>
        <Text writingType="title">{purchaseRequest?.purchaseRequestSeq}</Text>
        <Badge
          title={getItemTitle(
            PurchaseRequest?.statusSelect,
            purchaseRequest.statusSelect,
          )}
          color={getItemColor(
            PurchaseRequest?.statusSelect,
            purchaseRequest.statusSelect,
          )}
        />
      </View>
      <LabelText
        iconName="building-fill"
        size={16}
        title={purchaseRequest?.company?.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 5,
  },
  chlidrenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default RequestHeader;
