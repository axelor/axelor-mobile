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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DateInput} from '@axelor/aos-mobile-core';
import {PartnerSearchBar, StockLocationSearchBar} from '../../../templates';

type LogisticalFormFilterProps = {
  carrier: any;
  onCarrierChange: (value: any) => void;
  stockLocation: any;
  onStockLocationChange: (value: any) => void;
  collectionDate: Date;
  onCollectionDateChange: (value: Date) => void;
  stockLocationScanKey: string;
};

const LogisticalFormFilter = ({
  carrier,
  onCarrierChange,
  stockLocation,
  onStockLocationChange,
  collectionDate,
  onCollectionDateChange,
  stockLocationScanKey,
}: LogisticalFormFilterProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <PartnerSearchBar
          style={styles.halfInput}
          placeholderKey="Stock_Carrier"
          defaultValue={carrier}
          onChange={onCarrierChange}
          partnerType="carrier"
        />
        <StockLocationSearchBar
          style={styles.halfInput}
          scanKey={stockLocationScanKey}
          placeholderKey="Stock_StockLocation"
          defaultValue={stockLocation}
          onChange={onStockLocationChange}
        />
      </View>
      <DateInput
        mode="date"
        nullable
        popup
        defaultDate={collectionDate}
        onDateChange={onCollectionDateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  halfInput: {
    flex: 1,
  },
});

export default LogisticalFormFilter;
