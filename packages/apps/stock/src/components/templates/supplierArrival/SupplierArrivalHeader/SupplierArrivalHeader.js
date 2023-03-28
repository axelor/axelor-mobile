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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LabelText} from '@axelor/aos-mobile-ui';
import StockMove from '../../../../types/stock-move';
import {StockMoveHeader} from '../../../organisms';

const SupplierArrivalHeader = ({supplierArrival}) => {
  return (
    <View>
      <StockMoveHeader
        reference={supplierArrival.stockMoveSeq}
        status={supplierArrival.statusSelect}
        date={
          supplierArrival.statusSelect === StockMove.status.Draft
            ? supplierArrival.createdOn
            : supplierArrival.statusSelect === StockMove.status.Planned
            ? supplierArrival.estimatedDate
            : supplierArrival.realDate
        }
      />
      <View style={styles.clientContainer}>
        <LabelText iconName="user" title={supplierArrival.partner?.fullName} />
        {supplierArrival.origin == null ? null : (
          <LabelText iconName="tag" title={supplierArrival.origin} />
        )}
        {supplierArrival.supplierShipmentRef == null ? null : (
          <LabelText
            iconName="user-tag"
            title={supplierArrival.supplierShipmentRef}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clientContainer: {
    marginHorizontal: 24,
    marginVertical: 6,
    flexDirection: 'column',
  },
});

export default SupplierArrivalHeader;
